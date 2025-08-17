# vivekmahendra.com

A modern portfolio website built with React Router v7, featuring MDX-powered content management, interactive visualizations, and a clean, minimalist design.

🌐 **Live Site**: [vivekmahendra.com](https://vivekmahendra.com)

## Tech Stack

- **Framework**: [React Router v7](https://reactrouter.com) - Full-stack React framework with SSR
- **Styling**: [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- **Content**: [MDX](https://mdxjs.com) - Markdown with embedded React components
- **Visualizations**: [Visx](https://airbnb.io/visx) & [D3.js](https://d3js.org) - Data visualization
- **Animations**: React Bits components for subtle interactions
- **Deployment**: [Google Cloud Run](https://cloud.google.com/run) - Serverless container platform
- **Build Tool**: [Vite](https://vitejs.dev) - Fast build tool and dev server

## Features

### Content Management

- 📝 MDX-based blog posts and project descriptions
- 🎨 Custom React components within markdown content
- 📁 File-based routing with automatic content discovery
- 🔍 Type-safe frontmatter extraction

### Performance

- ⚡ Server-side rendering for fast initial loads
- 📦 Code splitting and dynamic imports
- 🖼️ Optimized images with lazy loading
- 🚀 Sub-second cold starts on Cloud Run
- 📊 Excellent Core Web Vitals scores

### Design

- 🎯 Clean, minimalist interface
- 📱 Mobile-first responsive design
- 🌈 Subtle animations and micro-interactions
- 🔤 Professional typography using system fonts

## Project Structure

```
website/
├── app/
│   ├── routes/          # Page routes
│   ├── components/      # React components
│   │   ├── layouts/     # Layout components
│   │   ├── home/        # Home page sections
│   │   ├── ui/          # Reusable UI components
│   │   ├── mdx/         # MDX-specific components
│   │   └── react-bits/  # Animation components
│   ├── styles/          # Global styles
│   └── utils/           # Utility functions
├── content/
│   ├── blog/           # Blog posts (MDX)
│   ├── projects/       # Project descriptions (MDX)
│   └── ideas/          # Ideas and thoughts (MDX)
├── public/             # Static assets
└── scripts/            # Build and deployment scripts
```

## Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn
- Docker (optional, for containerized deployment)
- Google Cloud SDK (optional, for Cloud Run deployment)

### Installation

```bash
# Clone the repository
git clone https://github.com/vivekmahendra/dotcom.git
cd dotcom

# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run dev

# The site will be available at http://localhost:5173
```

### Building for Production

```bash
# Create production build
npm run build

# Preview production build locally
npm run preview
```

## Adding Content

### Blog Posts

Create a new MDX file in `content/blog/`:

```mdx
---
title: "Your Post Title"
date: "2024-03-20"
excerpt: "Brief description of your post"
---

# Your Post Title

Your content here with **markdown** and React components.

<CustomComponent />
```

### Projects

Add project descriptions in `content/projects/`:

```mdx
---
name: "Project Name"
description: "Brief project description"
link: "https://github.com/yourusername/project"
date: "2024-03-15"
technologies: ["react", "typescript", "tailwindcss"]
---

# Project Details

Detailed project description with code examples.
```

## Deployment

### Google Cloud Run (Recommended)

1. **Set up Google Cloud**:

```bash
# Install gcloud CLI
brew install google-cloud-sdk  # macOS

# Authenticate
gcloud auth login
gcloud config set project YOUR_PROJECT_ID

# Enable required APIs
gcloud services enable cloudbuild.googleapis.com run.googleapis.com
```

2. **Deploy with Cloud Build**:

```bash
# Automated deployment
gcloud builds submit --config cloudbuild.yaml
```

3. **Or deploy manually**:

```bash
# Build and push Docker image
docker build -t gcr.io/YOUR_PROJECT_ID/website .
docker push gcr.io/YOUR_PROJECT_ID/website

# Deploy to Cloud Run
gcloud run deploy website \
  --image gcr.io/YOUR_PROJECT_ID/website \
  --region us-central1 \
  --allow-unauthenticated
```

### Docker

```bash
# Build Docker image
docker build -t portfolio-website .

# Run locally
docker run -p 3000:3000 portfolio-website
```

### Custom Domain

Map your domain to Cloud Run:

```bash
gcloud run domain-mappings create \
  --service website \
  --domain yourdomain.com \
  --region us-central1
```

Then update your DNS records as instructed.

## Environment Variables

Optional environment variables for enhanced functionality:

```bash
# Supabase (for newsletter subscriptions)
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_key

# Node environment
NODE_ENV=production
```

## Development Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run typecheck    # Run TypeScript type checking
npm run format       # Format code with Prettier
```

## Customization

### Styling

Modify `tailwind.config.ts` to customize the design system:

```javascript
export default {
  theme: {
    extend: {
      colors: {
        // Add custom colors
      },
      fontFamily: {
        // Customize fonts
      },
    },
  },
};
```

### Components

Custom MDX components are defined in `app/components/mdx/`:

- `ShinyLink.tsx` - Animated links with hover effects
- `CodeSnippet.tsx` - Syntax highlighted code blocks
- Add your own components and import them in MDX files

### Animations

React Bits components provide animations:

- `LetterGlitch` - Animated background effect
- `DecryptedText` - Text reveal animation
- Configure in `app/components/react-bits/`

## Performance Monitoring

Monitor your deployed application:

```bash
# View Cloud Run logs
gcloud run services logs read website --region us-central1

# Check metrics in Google Cloud Console
# Visit: https://console.cloud.google.com/run
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this code for your own portfolio.

## Acknowledgments

- Built with [React Router v7](https://reactrouter.com)
- Deployed on [Google Cloud Run](https://cloud.google.com/run)
- Animations from [React Bits](https://react-bits.com)

---
