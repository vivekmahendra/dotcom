# Website Content Management Plan

## Current State Analysis

### Hard-coded Content Issues
- **Research Section**: HomeResearchSection.tsx:3-22 has manually defined `researchPosts` array
- **Portfolio Section**: HomePortfolioSection.tsx:3-19 has manually defined `projects` array  
- **Research Page**: routes/research.tsx:14-33 duplicates the research posts array

### Content Directory Structure
```
content/
└── research/
    ├── market-dynamics-2024.mdx (matches existing hard-coded post)
    └── test.mdx
```

## Proposed Dynamic Content Solution

### 1. Content Loading System
Create a content loading utility that:
- Scans the `content/` directory at build time
- Extracts frontmatter (title, date, excerpt, slug) from MDX files
- Generates post metadata for components to consume

### 2. Directory Structure Enhancement
```
content/
├── research/
│   ├── market-dynamics-2024.mdx
│   └── additional-posts.mdx
└── portfolio/
    ├── project-one.mdx
    └── project-two.mdx
```

### 3. Implementation Strategy

#### Phase 1: Content Utility Functions
- Create `app/utils/content.ts` for content loading
- Add frontmatter parsing for MDX files
- Generate post/project metadata arrays

#### Phase 2: Dynamic Component Updates
- Update `HomeResearchSection.tsx` to use content utility
- Update `HomePortfolioSection.tsx` to use content utility  
- Update `routes/research.tsx` to use content utility

#### Phase 3: Portfolio Content Integration
- Create portfolio MDX files in `content/portfolio/`
- Replace hard-coded projects array with dynamic loading

### 4. Benefits
- **Maintainability**: Add new posts by creating MDX files
- **Consistency**: Single source of truth for content
- **Scalability**: Easy to add new content types
- **SEO**: Better metadata management from frontmatter

### 5. Technical Requirements
- Frontmatter parsing (likely needs `gray-matter` package)
- Build-time content scanning
- Type-safe content interfaces

### 6. Next Steps
1. Install content parsing dependencies
2. Create content utility functions
3. Update components to use dynamic content
4. Test with existing content
5. Create portfolio content structure