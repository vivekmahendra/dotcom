import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/_index.tsx"),
  route("about", "routes/about.tsx"),
  route("portfolio", "routes/portfolio.tsx"),
  route("research", "routes/research.tsx"),
  route("research/:slug", "routes/research.$slug.tsx"),
] satisfies RouteConfig;
