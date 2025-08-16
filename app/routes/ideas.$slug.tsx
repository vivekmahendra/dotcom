import type { Route } from "./+types/ideas.$slug";
import { useLoaderData } from "react-router";
import { BlogLayout } from "../components/layouts";
import { MDXProvider } from "@mdx-js/react";
import mdxComponents from "../components/mdx";
import { lazy, Suspense } from "react";
import { handleNewsletterAction } from "../lib/newsletter-action";

export async function loader({ params }: Route.LoaderArgs) {
  const { slug } = params;
  
  // Fallback metadata for testing
  const fallbackMeta = {
    title: "Test Post",
    date: "2024-01-15",
    excerpt: "A test post"
  };
  
  try {
    // Just get the frontmatter, not the component
    const mdxModule = await import(`../../content/ideas/${slug}.mdx`);
    
    return {
      slug,
      frontmatter: mdxModule.frontmatter || fallbackMeta,
    };
  } catch (error) {
    console.error('Failed to load MDX file:', error);
    throw new Response("Post not found", { status: 404 });
  }
}

export function meta({ loaderData }: Route.MetaArgs) {
  if (!loaderData) {
    return [{ title: "Post Not Found" }];
  }
  
  return [
    { title: `${loaderData.frontmatter.title} - Vivek Mahendra` },
    { name: "description", content: loaderData.frontmatter.excerpt },
  ];
}

export async function action({ request }: Route.ActionArgs) {
  return handleNewsletterAction(request);
}

export default function BlogPost() {
  const { frontmatter, slug } = useLoaderData<typeof loader>();
  
  // Dynamically import the MDX component on the client
  const Content = lazy(() => import(`../../content/ideas/${slug}.mdx`));
  
  return (
    <BlogLayout
      title={frontmatter.title}
      date={frontmatter.date}
      excerpt={frontmatter.excerpt}
      readingTime={frontmatter.readingTime || "5 min read"}
      ticker={frontmatter.ticker}
      stockPrice={frontmatter.stockPrice}
      currency={frontmatter.currency}
      backTo={{ href: "/ideas", label: "Ideas" }}
    >
      <MDXProvider components={mdxComponents}>
        <div className="max-w-none">
          <Suspense fallback={<div>Loading content...</div>}>
            <Content />
          </Suspense>
        </div>
      </MDXProvider>
    </BlogLayout>
  );
}