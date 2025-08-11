import type { Route } from "./+types/research.$slug";
import { useLoaderData } from "react-router";
import { BlogLayout } from "../components/BlogLayout";
import { MDXProvider } from "@mdx-js/react";
import { Callout } from "../components/mdx/Callout";
import { DataTable } from "../components/mdx/DataTable";
import { StockChart } from "../components/mdx/StockChart";
import { Newsletter } from "../components/Newsletter";

// MDX component mapping
const components = {
  Callout,
  DataTable,
  StockChart,
  Newsletter,
};

// For simplicity, let's create a static content approach
const sampleContent = {
  title: "Understanding Market Dynamics in 2024",
  date: "2024-01-15",
  excerpt: "An analysis of current market trends and their implications for long-term investing.",
  readingTime: "8 min read"
};

export async function loader({ params }: Route.LoaderArgs) {
  const { slug } = params;
  
  if (slug === "market-dynamics-2024") {
    return {
      slug,
      frontmatter: sampleContent
    };
  }
  
  throw new Response("Post not found", { status: 404 });
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

export default function BlogPost() {
  const { frontmatter } = useLoaderData<typeof loader>();
  
  return (
    <BlogLayout
      title={frontmatter.title}
      date={frontmatter.date}
      excerpt={frontmatter.excerpt}
      readingTime={frontmatter.readingTime}
    >
      <MDXProvider components={components}>
        <div className="prose prose-lg max-w-none">
          <p>The financial markets have experienced significant volatility throughout 2024, driven by a complex interplay of macroeconomic factors, geopolitical tensions, and shifting investor sentiment. This analysis explores the key drivers behind recent market movements and their implications for long-term investment strategies.</p>
          
          <h2>Key Market Drivers</h2>
          
          <Callout type="info" title="Market Overview">
            Current market conditions are characterized by heightened uncertainty around interest rate policies, inflation expectations, and global economic growth prospects.
          </Callout>
          
          <h3>Interest Rate Environment</h3>
          <p>The Federal Reserve's monetary policy continues to be a primary driver of market sentiment. Recent signals suggest a more nuanced approach to rate adjustments, with emphasis on data-dependent decision making.</p>
          
          <h3>Sector Performance Analysis</h3>
          
          <DataTable 
            data={[
              { sector: "Technology", ytdReturn: "12.5%", pe: "28.3", outlook: "Positive" },
              { sector: "Healthcare", ytdReturn: "8.2%", pe: "16.7", outlook: "Neutral" },
              { sector: "Energy", ytdReturn: "-3.1%", pe: "14.2", outlook: "Cautious" },
              { sector: "Financials", ytdReturn: "15.7%", pe: "12.9", outlook: "Positive" }
            ]}
            caption="Sector performance metrics as of current analysis date"
          />
          
          <h2>Investment Implications</h2>
          
          <Callout type="warning" title="Risk Assessment">
            While opportunities exist in select sectors, investors should maintain diversified portfolios and consider defensive positioning given current market uncertainties.
          </Callout>
          
          <h3>Portfolio Positioning</h3>
          <p>Based on current market dynamics, we recommend:</p>
          <ol>
            <li><strong>Defensive allocation</strong>: Maintain 30-40% in defensive assets</li>
            <li><strong>Quality focus</strong>: Emphasize companies with strong balance sheets</li>
            <li><strong>Diversification</strong>: Spread risk across sectors and geographies</li>
          </ol>
          
          <h3>Sample Stock Analysis</h3>
          
          <StockChart 
            symbol="SPY"
            title="S&P 500 ETF Performance (Sample Data)"
            data={[
              { date: "2024-01", price: 450.00 },
              { date: "2024-02", price: 465.50 },
              { date: "2024-03", price: 472.25 },
              { date: "2024-04", price: 458.75 },
              { date: "2024-05", price: 485.30 },
              { date: "2024-06", price: 492.15 }
            ]}
          />
          
          <h2>Conclusion</h2>
          <p>The market environment in 2024 requires careful navigation, balancing growth opportunities with risk management. Investors should focus on quality investments while maintaining appropriate diversification.</p>
          
          <Callout type="success" title="Key Takeaway">
            Despite short-term volatility, markets historically reward patient, disciplined investors who maintain long-term perspectives.
          </Callout>
          
          <hr className="my-8" />
          
          <Newsletter inline={true} />
          
          <p className="text-sm text-gray-500 mt-8"><em>This analysis is for informational purposes only and should not be considered as investment advice. Past performance does not guarantee future results.</em></p>
        </div>
      </MDXProvider>
    </BlogLayout>
  );
}