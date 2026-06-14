import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/community")({
  component: () => <Outlet />,
});
export default function _useless() { useRouterState; return null; }