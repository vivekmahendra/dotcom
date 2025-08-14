export interface PostMetadata {
  title: string;
  date: string;
  excerpt: string;
  slug: string;
}

export interface ProjectMetadata {
  name: string;
  description: string;
  link: string;
  slug: string;
  date?: string;
}

// Use Vite's import.meta.glob to dynamically import content files
const ideasModules = import.meta.glob('/content/ideas/*.mdx', { 
  eager: true
}) as Record<string, any>;

const projectsModules = import.meta.glob('/content/projects/*.mdx', {
  eager: true
}) as Record<string, any>;

function extractSlugFromPath(path: string): string {
  return path.split('/').pop()?.replace('.mdx', '') || '';
}

export function getIdeas(): PostMetadata[] {
  try {
    // Fallback to manually defined posts if import.meta.glob doesn't work
    if (Object.keys(ideasModules).length === 0) {
      return [
        {
          title: "Understanding Market Dynamics in 2024",
          date: "2024-01-15",
          excerpt: "An analysis of current market trends and their implications for long-term investing.",
          slug: "market-dynamics-2024",
        },
        {
          title: "Test Post",
          date: "2024-01-01",
          excerpt: "A simple test post",
          slug: "test",
        },
      ];
    }

    const posts = Object.entries(ideasModules).map(([path, module]) => {
      const slug = extractSlugFromPath(path);
      const frontmatter = module?.frontmatter || {};
      
      return {
        title: frontmatter.title || "Untitled",
        date: frontmatter.date || new Date().toISOString(),
        excerpt: frontmatter.excerpt || "",
        slug,
      };
    });
    
    // Sort by date (newest first)
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error("Error loading ideas:", error);
    return [];
  }
}

export function getProjects(): ProjectMetadata[] {
  try {
    const projects = Object.entries(projectsModules).map(([path, module]) => {
      const slug = extractSlugFromPath(path);
      const frontmatter = module?.frontmatter || {};
      
      return {
        name: frontmatter.name || frontmatter.title || "Untitled Project",
        description: frontmatter.description || frontmatter.excerpt || "",
        link: frontmatter.link || `#${slug}`,
        slug,
        date: frontmatter.date,
      };
    });
    
    // Sort by date if available (newest first), otherwise maintain file order
    return projects.sort((a, b) => {
      if (a.date && b.date) {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return 0;
    });
  } catch (error) {
    console.error("Error loading projects:", error);
    return [];
  }
}