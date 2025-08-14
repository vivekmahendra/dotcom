import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/_index.tsx"),
  route("about", "routes/about.tsx"),
  route("projects", "routes/projects.tsx"),
  route("ideas", "routes/ideas.tsx"),
  route("ideas/:slug", "routes/ideas.$slug.tsx"),
] satisfies RouteConfig;
