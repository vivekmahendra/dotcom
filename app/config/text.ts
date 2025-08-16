export const TEXT_CONFIG = {
  // Site metadata
  site: {
    title: "Vivek Mahendra - Portfolio",
    description: "Welcome to Vivek Mahendra's portfolio",
    author: "Vivek Mahendra",
  },

  // Navigation
  navigation: {
    brand: "Vivek Mahendra",
    links: [
      { name: "Home", href: "/" },
      { name: "About", href: "/about" },
      { name: "Projects", href: "/projects" },
      { name: "Ideas", href: "/ideas" },
      { name: "Blog", href: "/blog" },
    ],
  },

  // Home page
  home: {
    hero: {
      greeting: "Hello, I'm Vivek",
      roles: [
        { label: "Software Engineer", prefix: ">" },
        { label: "Value Investor", prefix: ">" },
      ],
      description:
        "Building **user-focused** products and delivering **research-driven** insights on public companies.",
      lastUpdateLabel: "LAST_UPDATE:",
    },
    sections: {
      ideas: {
        title: "Latest Investment Ideas",
        subtitle: "Investment analysis and market insights",
        viewAllText: "View all",
        emptyMessage: "No ideas yet. Check back soon!",
      },
      projects: {
        title: "Latest Projects",
        subtitle: "Selected work and experiments",
        viewAllText: "View all",
        emptyMessage: "No projects yet. Check back soon!",
      },
      blog: {
        title: "Latest Blog",
        subtitle: "Thoughts on tech, business, and more",
        viewAllText: "View all",
        emptyMessage: "No blog posts yet. Check back soon!",
      },
    },
  },

  // Error pages
  errors: {
    notFound: {
      title: "404",
      heading: "Page Not Found",
      description: "The page you're looking for doesn't exist.",
      homeLink: "Go back home",
    },
    generic: {
      title: "Oops!",
      description: "An unexpected error occurred.",
    },
  },

  // Common UI elements
  ui: {
    buttons: {
      viewAll: "View all",
      backTo: "Back to",
      readMore: "Read more",
      learnMore: "Learn more",
    },
    labels: {
      readingTime: "min read",
      atPublication: "at publication",
      tags: "Tags:",
      category: "Category:",
      published: "Published:",
      updated: "Updated:",
    },
    actions: {
      copyLink: "Copy link",
      share: "Share",
      bookmark: "Bookmark",
    },
  },

  // Newsletter
  newsletter: {
    banner: {
      title: "Subscribe to my newsletter",
      description:
        "Get the latest insights on investing and technology delivered to your inbox.",
      placeholder: "Enter your email",
      buttonText: "Subscribe",
      successMessage: "Thanks for subscribing!",
      errorMessage: "Something went wrong. Please try again.",
    },
    inline: {
      title: "Stay updated",
      description:
        "Join my newsletter for investing insights and tech updates.",
    },
  },

  // Footer
  footer: {
    location: "Made in Phoenix 🌵",
    disclosure: {
      title: "Investment Disclosure:",
      content:
        "All investment analyses and recommendations are for informational purposes only and should not be considered as personalized investment advice.",
      disclaimer:
        "Past performance does not guarantee future results. Always conduct your own research and consult with qualified financial advisors before making investment decisions. The author may hold positions in securities mentioned.",
    },
    social: {
      email: {
        href: "mailto:hello@vivekmahendra.com",
        label: "Email",
      },
      linkedin: {
        href: "https://linkedin.com/in/vivekmahendra",
        label: "LinkedIn",
      },
      twitter: {
        href: "https://x.com/vivekmahendra",
        label: "X (Twitter)",
      },
      github: {
        href: "https://github.com/vivekmahendra",
        label: "GitHub",
      },
    },
  },

  // Page-specific content
  pages: {
    blog: {
      title: "Blog",
      description: "Thoughts on technology, investing, and building products.",
      emptyState: {
        title: "Coming Soon",
        description: "I'm working on some great content. Check back soon!",
      },
    },
    ideas: {
      title: "Investment Ideas",
      description:
        "Research-driven analysis of public companies and investment opportunities.",
      emptyState: {
        title: "No Ideas Yet",
        description: "Investment ideas will appear here. Check back soon!",
      },
    },
    projects: {
      title: "Projects",
      description: "Software projects and experiments I've been working on.",
      emptyState: {
        title: "No Projects Yet",
        description: "Projects will appear here. Check back soon!",
      },
    },
    about: {
      title: "About",
      description: "Learn more about my background and interests.",
      intro: "I'm Vivek. I like building things, and researching businesses.",
      content:
        "This is my space to build in public, sharing projects I’m working on and writing about technology, business, and whatever else captures my curiosity.",
      sections: {
        links: {
          title: "Links",
          items: [
            {
              name: "Paul Graham Essays",
              url: "http://paulgraham.com/articles.html",
              description:
                "Thoughtful essays on startups, programming, and life",
            },
            {
              name: "Stratechery",
              url: "https://stratechery.com",
              description:
                "Daily analysis of the strategy and business side of technology",
            },
            {
              name: "Acquired Podcast",
              url: "https://acquired.fm",
              description:
                "Deep dives into the stories and strategies behind great companies",
            },
          ],
        },
        reading: {
          title: "Reading",
          items: [
            {
              title: "One Up On Wall Street",
              author: "Peter Lynch",
            },
            {
              title: "The Intelligent Investor",
              author: "Benjamin Graham",
            },
            {
              title: "Poor Charlie's Almanack",
              author: "Charlie Munger",
            },
          ],
        },
        photos: {
          title: "Photos",
        },
      },
    },
  },

  // Content metadata labels
  content: {
    stockInfo: {
      tickerLabel: "Ticker:",
      priceLabel: "Price:",
      currencySymbol: "$",
    },
    meta: {
      publishedOn: "Published on",
      updatedOn: "Updated on",
      estimatedReading: "Estimated reading time:",
      category: "Category:",
      tags: "Tags:",
    },
  },
} as const;

// Type helpers for better TypeScript support
export type TextConfigKey = keyof typeof TEXT_CONFIG;
export type NavigationLink = (typeof TEXT_CONFIG.navigation.links)[0];
export type SocialLink =
  (typeof TEXT_CONFIG.footer.social)[keyof typeof TEXT_CONFIG.footer.social];
