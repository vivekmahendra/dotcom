import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import "./styles/animations.css";
import { Layout as AppLayout } from "./components/layouts";
import {
  ASCIIText,
  DecryptedText,
  LetterGlitch,
} from "./components/react-bits";
import { TEXT_CONFIG } from "./config/text";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message: string = TEXT_CONFIG.errors.generic.title;
  let details: string = TEXT_CONFIG.errors.generic.description;
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? TEXT_CONFIG.errors.notFound.title : TEXT_CONFIG.errors.generic.title;
    details =
      error.status === 404
        ? TEXT_CONFIG.errors.notFound.description
        : error.statusText || TEXT_CONFIG.errors.generic.description;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  // Special handling for 404 errors with layout
  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <AppLayout>
        <div className="bg-white text-black overflow-x-hidden">
          {/* Full-width Section with LetterGlitch Background */}
          <div className="relative overflow-hidden min-h-screen">
            {/* LetterGlitch Background - contained within this section */}
            <div className="absolute inset-0 z-0">
              <LetterGlitch
                glitchColors={["#f8f8f8", "#f0f0f0", "#e8e8e8"]}
                glitchSpeed={800}
                smooth={true}
                outerVignette={false}
                centerVignette={false}
              />
            </div>

            {/* Content */}
            <div className="container mx-auto px-6 py-20 relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                {/* ASCII 404 */}
                <div className="mb-8">
                  <div className="relative h-64 md:h-80 w-full mb-6">
                    <ASCIIText
                      text={TEXT_CONFIG.errors.notFound.title}
                      asciiFontSize={18}
                      textFontSize={400}
                      textColor="#1f2937"
                      planeBaseHeight={12}
                      enableWaves={true}
                    />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-light text-gray-700 mb-6">
                    <DecryptedText
                      text={TEXT_CONFIG.errors.notFound.heading}
                      animateOn="view"
                      speed={75}
                    />
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AppLayout>
    );
  }

  // Default error handling for non-404 errors
  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
