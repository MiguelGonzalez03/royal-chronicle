
-- Enums
CREATE TYPE public.app_role AS ENUM ('admin','moderator','user');
CREATE TYPE public.dlc_status AS ENUM ('released','upcoming');
CREATE TYPE public.guide_difficulty AS ENUM ('beginner','intermediate','advanced');

-- updated_at helper
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END $$;

-- PROFILES
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.profiles TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "profiles_select_all" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_insert_own" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- USER ROLES
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL DEFAULT 'user',
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "user_roles_select_own" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

-- Auto-create profile + default role on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE base_name TEXT; final_name TEXT; counter INT := 0;
BEGIN
  base_name := COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1));
  final_name := base_name;
  WHILE EXISTS (SELECT 1 FROM public.profiles WHERE username = final_name) LOOP
    counter := counter + 1;
    final_name := base_name || counter::text;
  END LOOP;
  INSERT INTO public.profiles (id, username) VALUES (NEW.id, final_name);
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'user');
  RETURN NEW;
END $$;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- NEWS
CREATE TABLE public.news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  published_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.news TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.news TO authenticated;
GRANT ALL ON public.news TO service_role;
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
CREATE POLICY "news_select_all" ON public.news FOR SELECT USING (true);
CREATE POLICY "news_admin_write" ON public.news FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- DLCS
CREATE TABLE public.dlcs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  features TEXT,
  release_date DATE,
  estimated_release TEXT,
  image_url TEXT,
  status public.dlc_status NOT NULL DEFAULT 'released',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.dlcs TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.dlcs TO authenticated;
GRANT ALL ON public.dlcs TO service_role;
ALTER TABLE public.dlcs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "dlcs_select_all" ON public.dlcs FOR SELECT USING (true);
CREATE POLICY "dlcs_admin_write" ON public.dlcs FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- RECOMMENDED CHARACTERS
CREATE TABLE public.recommended_characters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  realm TEXT NOT NULL,
  difficulty public.guide_difficulty NOT NULL DEFAULT 'beginner',
  image_url TEXT,
  description TEXT NOT NULL,
  advantages TEXT,
  tips TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.recommended_characters TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.recommended_characters TO authenticated;
GRANT ALL ON public.recommended_characters TO service_role;
ALTER TABLE public.recommended_characters ENABLE ROW LEVEL SECURITY;
CREATE POLICY "rc_select_all" ON public.recommended_characters FOR SELECT USING (true);
CREATE POLICY "rc_admin_write" ON public.recommended_characters FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- FORUM CATEGORIES
CREATE TABLE public.forum_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  sort_order INT NOT NULL DEFAULT 0
);
GRANT SELECT ON public.forum_categories TO anon, authenticated;
GRANT ALL ON public.forum_categories TO service_role;
ALTER TABLE public.forum_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "fc_select_all" ON public.forum_categories FOR SELECT USING (true);

-- POSTS
CREATE TABLE public.posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES public.forum_categories(id) ON DELETE RESTRICT,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.posts TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.posts TO authenticated;
GRANT ALL ON public.posts TO service_role;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "posts_select_all" ON public.posts FOR SELECT USING (true);
CREATE POLICY "posts_insert_own" ON public.posts FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "posts_update_own" ON public.posts FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "posts_delete_own" ON public.posts FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE TRIGGER posts_updated_at BEFORE UPDATE ON public.posts FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- COMMENTS
CREATE TABLE public.comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.comments TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.comments TO authenticated;
GRANT ALL ON public.comments TO service_role;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "comments_select_all" ON public.comments FOR SELECT USING (true);
CREATE POLICY "comments_insert_own" ON public.comments FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "comments_update_own" ON public.comments FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "comments_delete_own" ON public.comments FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- LIKES
CREATE TABLE public.likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (post_id, user_id)
);
GRANT SELECT ON public.likes TO anon, authenticated;
GRANT INSERT, DELETE ON public.likes TO authenticated;
GRANT ALL ON public.likes TO service_role;
ALTER TABLE public.likes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "likes_select_all" ON public.likes FOR SELECT USING (true);
CREATE POLICY "likes_insert_own" ON public.likes FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "likes_delete_own" ON public.likes FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- GUIDES
CREATE TABLE public.guides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  difficulty public.guide_difficulty NOT NULL DEFAULT 'beginner',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.guides TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.guides TO authenticated;
GRANT ALL ON public.guides TO service_role;
ALTER TABLE public.guides ENABLE ROW LEVEL SECURITY;
CREATE POLICY "guides_select_all" ON public.guides FOR SELECT USING (true);
CREATE POLICY "guides_insert_own" ON public.guides FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "guides_update_own" ON public.guides FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "guides_delete_own" ON public.guides FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE TRIGGER guides_updated_at BEFORE UPDATE ON public.guides FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.guide_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  guide_id UUID NOT NULL REFERENCES public.guides(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.guide_comments TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.guide_comments TO authenticated;
GRANT ALL ON public.guide_comments TO service_role;
ALTER TABLE public.guide_comments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "gc_select_all" ON public.guide_comments FOR SELECT USING (true);
CREATE POLICY "gc_insert_own" ON public.guide_comments FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "gc_update_own" ON public.guide_comments FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "gc_delete_own" ON public.guide_comments FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE TABLE public.guide_ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  guide_id UUID NOT NULL REFERENCES public.guides(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  rating INT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (guide_id, user_id)
);
GRANT SELECT ON public.guide_ratings TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.guide_ratings TO authenticated;
GRANT ALL ON public.guide_ratings TO service_role;
ALTER TABLE public.guide_ratings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "gr_select_all" ON public.guide_ratings FOR SELECT USING (true);
CREATE POLICY "gr_insert_own" ON public.guide_ratings FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id AND rating BETWEEN 1 AND 5);
CREATE POLICY "gr_update_own" ON public.guide_ratings FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id AND rating BETWEEN 1 AND 5);
CREATE POLICY "gr_delete_own" ON public.guide_ratings FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- SEED forum categories
INSERT INTO public.forum_categories (slug, name, description, sort_order) VALUES
  ('estrategias','Estrategias','Tácticas militares, diplomacia e intriga.',1),
  ('principiantes','Guías para Principiantes','Primeros pasos en el mundo de CK3.',2),
  ('dinastias','Casas Dinásticas','Crónicas y árboles genealógicos.',3),
  ('mods','Mods','Mods recomendados, instalación y soporte.',4),
  ('roleplay','Roleplay','Historias y aventuras narradas.',5),
  ('dlcs','DLCs','Discusión sobre expansiones y contenidos.',6),
  ('noticias','Noticias','Comenta las últimas novedades.',7),
  ('qa','Preguntas y Respuestas','Resuelve tus dudas con la comunidad.',8),
  ('recomendaciones','Recomendaciones','Sugerencias de personajes, reinos y partidas.',9);

-- SEED news
INSERT INTO public.news (title, summary, content, image_url, published_at) VALUES
  ('Nuevo DLC Anunciado: Caminos de Antaño','Paradox revela una nueva expansión centrada en las rutas de peregrinación.','La expansión Caminos de Antaño introduce peregrinaciones dinámicas, nuevas decisiones religiosas y eventos personalizados según la fe de tu dinastía.','https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200', now() - interval '2 days'),
  ('Parche 1.12 ya disponible','Mejoras de IA, balance económico y nuevos eventos.','El parche 1.12 trae un rebalanceo de los ingresos vasalláticos, eventos de corte adicionales y correcciones críticas para guerras santas.','https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?w=1200', now() - interval '7 days'),
  ('Crónicas de la Comunidad','Las mejores historias dinásticas del mes.','Hemos seleccionado tres crónicas escritas por la comunidad: el Imperio Andalusí, una reina vikinga en Constantinopla y la caída de los Karling.','https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200', now() - interval '14 days'),
  ('Torneo de Estrategia Online','Compite con otros monarcas en el primer torneo oficial.','Inscríbete antes del próximo mes lunar y demuestra tu valía en combate, intriga y diplomacia.','https://images.unsplash.com/photo-1543872084-c7bd3822856f?w=1200', now() - interval '21 days'),
  ('Roadmap 2026 revelado','Paradox comparte la hoja de ruta para el próximo año.','Tres expansiones, dos packs cosméticos y mejoras estructurales del motor. Un año brillante para el reino.','https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=1200', now() - interval '30 days');

-- SEED DLCs
INSERT INTO public.dlcs (name, description, features, release_date, image_url, status) VALUES
  ('Royal Court','Tu corte real cobra vida con audiencias, artefactos y grandeza.','Sala del trono 3D, artefactos legendarios, idiomas, peticiones reales.','2022-02-08','https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=1200','released'),
  ('Friends & Foes','Eventos de relaciones interpersonales más profundos.','Nuevos amigos, rivales, amantes y eventos dinásticos.','2022-09-08','https://images.unsplash.com/photo-1520975867597-0af37a22e31b?w=1200','released'),
  ('Tours & Tournaments','Recorre tu reino y compite en grandes torneos.','Justas, banquetes, viajes reales, bodas grandiosas.','2023-05-11','https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200','released'),
  ('Wards & Wardens','Cría a la próxima generación y forja alianzas.','Eventos de tutoría, contratos de protección, niños prodigio.','2024-03-14','https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200','released');

INSERT INTO public.dlcs (name, description, features, estimated_release, image_url, status) VALUES
  ('Caminos de Antaño','Peregrinaciones épicas y nuevas rutas comerciales.','Peregrinaciones dinámicas, reliquias raras, encuentros aleatorios.','Q3 2026','https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?w=1200','upcoming'),
  ('Crónicas del Norte','Una expansión profunda centrada en la era vikinga.','Sagas, expediciones marítimas, runas y nuevas decisiones.','Q1 2027','https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=1200','upcoming');

-- SEED characters
INSERT INTO public.recommended_characters (name, realm, difficulty, image_url, description, advantages, tips) VALUES
  ('Petty King Murchad','Reino de Munster (Irlanda, 1066)','beginner','https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?w=1200','Un punto de partida clásico para nuevos jugadores: pocos vecinos, terreno favorable y oportunidades claras de expansión.','Aislamiento geográfico, cultura unificada, casus belli sencillos contra vecinos débiles.','Forma Irlanda lo antes posible, casa a tu heredero con sangre real escocesa, evita guerras con Noruega.'),
  ('William the Conqueror','Ducado de Normandía (1066)','intermediate','https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=1200','Reclama el trono de Inglaterra y forja un imperio anglo-normando.','Reclamación de oro, ejército profesional, vasallos leales.','Invade Inglaterra rápido, casa a tus hijos con casas reales europeas, gestiona bien la sucesión.'),
  ('Alfonso VI de León','Reino de León (1066)','intermediate','https://images.unsplash.com/photo-1520975867597-0af37a22e31b?w=1200','Reconquista la península y forja Hispania.','Posición central, vasallos militares, oportunidad de Reconquista.','Une los reinos cristianos antes de atacar Al-Ándalus, cuidado con los almorávides.'),
  ('Emperador Romano-Bizantino','Imperio Bizantino (867)','advanced','https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200','El mayor imperio cristiano del mundo conocido. Complejo, brutal y glorioso.','Riqueza inmensa, tropas de élite, prestigio máximo.','Vigila las facciones, sobrevive a la guerra civil, recupera Italia y los Balcanes.');
