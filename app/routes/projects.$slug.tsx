import type { Route } from "./+types/projects.$slug";
import { useLoaderData } from "react-router";
import { ProjectLayout } from "../components/ProjectLayout";
import { MDXProvider } from "@mdx-js/react";
import mdxComponents from "../components/mdx";
import { lazy, Suspense } from "react";

export async function loader({ params }: Route.LoaderArgs) {
  const { slug } = params;
  
  // Fallback metadata for testing
  const fallbackMeta = {
    name: "Project",
    description: "A project description",
    date: "2024-01-01",
    link: ""
  };
  
  try {
    // Just get the frontmatter, not the component
    const mdxModule = await import(`../../content/projects/${slug}.mdx`);
    
    return {
      slug,
      frontmatter: mdxModule.frontmatter || fallbackMeta,
    };
  } catch (error) {
    console.error('Failed to load MDX file:', error);
    throw new Response("Project not found", { status: 404 });
  }
}

export function meta({ loaderData }: Route.MetaArgs) {
  if (!loaderData) {
    return [{ title: "Project Not Found" }];
  }
  
  return [
    { title: `${loaderData.frontmatter.name} - Vivek Mahendra` },
    { name: "description", content: loaderData.frontmatter.description },
  ];
}

export default function ProjectPage() {
  const { frontmatter, slug } = useLoaderData<typeof loader>();
  
  // Dynamically import the MDX component on the client
  const Content = lazy(() => import(`../../content/projects/${slug}.mdx`));
  
  return (
    <ProjectLayout
      name={frontmatter.name}
      description={frontmatter.description}
      date={frontmatter.date}
      link={frontmatter.link}
      technologies={frontmatter.technologies}
    >
      <MDXProvider components={mdxComponents}>
        <div className="max-w-none">
          <Suspense fallback={<div>Loading content...</div>}>
            <Content />
          </Suspense>
        </div>
      </MDXProvider>
    </ProjectLayout>
  );
}