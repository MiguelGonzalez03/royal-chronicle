
# Plan: Aplicación Comunidad Crusader Kings III

Una app web inmersiva con estética medieval (oscuro + dorado, pergaminos, escudos), autenticación Supabase y un foro/comunidad completo.

## 1. Backend (Lovable Cloud / Supabase)

Activaré Lovable Cloud y crearé en una migración:

**Tablas**
- `profiles` (id, username, avatar_url, created_at) — autocreado vía trigger en signup
- `user_roles` (id, user_id, role) + enum `app_role` (`admin`,`moderator`,`user`) + función `has_role()` SECURITY DEFINER
- `news` (id, title, content, image_url, published_at)
- `dlcs` (id, name, description, release_date, image_url, status) — enum: `released`/`upcoming`
- `recommended_characters` (id, name, realm, difficulty, image_url, description, tips)
- `forum_categories` (id, slug, name) — seed con las 9 categorías
- `posts` (id, user_id, category_id, title, content, created_at)
- `comments` (id, post_id, user_id, content, created_at)
- `likes` (id, post_id, user_id, UNIQUE(post_id,user_id))
- `guides` (id, user_id, title, content, difficulty, created_at) — enum dificultad
- `guide_comments`, `guide_ratings` (1–5)

**Seguridad**
- RLS activado en todas las tablas
- Lectura pública: `news`, `dlcs`, `recommended_characters`, `forum_categories`, `posts`, `comments`, `likes`, `guides`, `profiles`
- Escritura: solo autenticados; update/delete solo dueño (`user_id = auth.uid()`)
- Admin (vía `has_role`) puede gestionar `news`, `dlcs`, `recommended_characters`
- GRANTs explícitos a `anon`/`authenticated`/`service_role`

**Seed**
- Categorías del foro, ~5 noticias demo, ~6 DLCs (released + upcoming), ~4 personajes recomendados

## 2. Autenticación

- Email + contraseña, sesión persistente, `onAuthStateChange` en root
- Rutas: `/auth` (login + registro en tabs), `/reset-password`
- Layout protegido `_authenticated/route.tsx` (ya manejado por integración)
- Redirige a `/` tras login

## 3. Rutas (TanStack Router)

Públicas:
- `/auth`, `/reset-password`

Protegidas bajo `_authenticated/`:
- `/` Home inmersivo (hero con mapa, accesos rápidos, últimas noticias)
- `/news`, `/news/$id`
- `/dlcs` (tabs: Disponibles / Próximos)
- `/community` (lista categorías + posts recientes)
- `/community/$category`, `/community/post/$id` (con comentarios y likes)
- `/community/new` (crear post)
- `/guides`, `/guides/$id`, `/guides/new`
- `/characters` (personajes recomendados)
- `/profile` (avatar, username, stats: nº posts, nº guías, logros básicos)

Navbar superior con todos los enlaces + botón Cerrar Sesión.

## 4. Diseño Medieval (Design System)

En `src/styles.css` definiré tokens semánticos oklch:
- Fondos oscuros pergamino quemado, dorado real, rojo borgoña, marfil envejecido
- Gradientes dorados, sombras cálidas
- Tipografía: `Cinzel` (display, títulos) + `EB Garamond` (cuerpo), cargadas vía `<link>` en `__root.tsx`
- Texturas/decoraciones: pergamino SVG, bordes ornamentales, divisores con escudo
- Variantes de Button (`royal`, `parchment`, `ghost-gold`) y Card (`parchment`, `scroll`)
- Imágenes generadas (hero medieval, escudos, pergaminos) en `src/assets/`
- Modo oscuro por defecto, responsive

## 5. Stack técnico

- TanStack Start + TanStack Router + TanStack Query
- Lectura: server functions con `requireSupabaseAuth` cuando hace falta usuario; lecturas públicas con cliente browser o server fn pública
- Mutaciones: `useMutation` + invalidación de queries
- Validación de formularios con `zod` + `react-hook-form`
- shadcn/ui ya disponible, customizado con variantes

## 6. Entrega

- Migración SQL con tablas + RLS + GRANTs + seed
- Componentes UI medievales reutilizables
- Todas las rutas funcionales con CRUD donde aplica
- README de uso no necesario (todo en la UI)

## Notas / decisiones por defecto que tomaré salvo que indiques otra cosa

- Solo email/contraseña (sin Google) — puedes pedirme añadirlo después
- Primer usuario registrado NO es admin automáticamente; podré promover vía SQL/seed si quieres un admin inicial
- "Logros" del perfil serán derivados (basados en contadores), no una tabla aparte, para mantener el alcance manejable
- Las imágenes de noticias/DLCs/personajes usarán URLs en el seed (puedes subir las tuyas después)

¿Apruebas el plan o quieres ajustar algo (ej. añadir login con Google, admin inicial, tabla de logros real)?
