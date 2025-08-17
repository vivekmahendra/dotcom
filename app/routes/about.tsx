import type { Route } from "./+types/about";
import { useLoaderData } from "react-router";
import { useState, useEffect } from "react";
import { PageHeader } from "../components/layouts";
import { Newsletter } from "../components/ui/Newsletter";
import { Modal } from "../components/ui/Modal";
import { handleNewsletterAction } from "../lib/newsletter-action";
import { TEXT_CONFIG } from "../config/text";

export function meta({}: Route.MetaArgs) {
  return [
    { title: `${TEXT_CONFIG.pages.about.title} - ${TEXT_CONFIG.site.author}` },
    { name: "description", content: TEXT_CONFIG.pages.about.description },
  ];
}

export async function action({ request }: Route.ActionArgs) {
  return handleNewsletterAction(request);
}

export async function loader() {
  return {
    supabaseUrl: process.env.SUPABASE_URL || null,
  };
}

interface PhotoMetadata {
  filename: string;
  description?: string;
  date?: string;
  location?: {
    name: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
}

const galleryPhotos: PhotoMetadata[] = [
  {
    filename: "photo-1.jpg",
    description: "Delicate Arch",
    date: "March 09, 2025",
    location: {
      name: "Delicate Arch Trail, Grand County, Utah, United States",
      coordinates: { lat: 38.744103, lng: -109.499992 },
    },
  },
  {
    filename: "photo-2.heic",
    description: "Petit Piton",
    date: "December 19, 2024",
    location: {
      name: "Petit Piton, St. Lucia",
      coordinates: { lat: 13.81781111111111, lng: -61.056869444444445 },
    },
  },
  {
    filename: "photo-3.jpg",
    description: "Maine coastline",
    date: "October 10, 2023",
    location: {
      name: "Maine",
      coordinates: { lat: 44.43125555555555, lng: -67.978325 },
    },
  },
  {
    filename: "photo-4.heic",
    description: "Fushimi Inari Yotsuji",
    date: "December 5, 2023",
    location: {
      name: "Kyoto, Japan",
      coordinates: { lat: 34.96678055555556, lng: 135.7847138888889 },
    },
  },
  {
    filename: "photo-5.jpg",
    description: "Bristlecone Pine",
    date: "May 22, 2022",
    location: {
      name: "Great Basin National Park",
      coordinates: { lat: 39.00254722222222, lng: -114.30434444444444 },
    },
  },
  {
    filename: "photo-6.jpg",
    description: "Fire Wave",
    date: "May 23, 2022",
    location: {
      name: "Valley of Fire State Park",
      coordinates: { lat: 36.483047222222226, lng: -114.52239166666666 },
    },
  },
  {
    filename: "photo-7.jpg",
    description: "Canyon De Chelly",
    date: "October 08, 2022",
    location: {
      name: "Spider Rock Overlook",
      coordinates: { lat: 36.105694444444445, lng: -109.3553861111111 },
    },
  },
  {
    filename: "photo-8.jpg",
    description: "Big Balanced Rock",
    date: "February 26, 2022",
    location: {
      name: "Chiricahua National Monument",
      coordinates: { lat: 31.99551388888889, lng: -109.32315833333332 },
    },
  },
  {
    filename: "photo-9.heic",
    description: "White Sands dunes",
    date: "October 07, 2021",
    location: {
      name: "White Sands National Park, NM",
      coordinates: { lat: 32.81641111111111, lng: -106.27957222222223 },
    },
  },
];

export default function About() {
  const { supabaseUrl } = useLoaderData<typeof loader>();
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(
    null
  );

  // Add keyboard navigation and prevent body scroll
  useEffect(() => {
    if (selectedPhotoIndex !== null) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "ArrowLeft" && selectedPhotoIndex > 0) {
          setSelectedPhotoIndex(selectedPhotoIndex - 1);
        } else if (
          e.key === "ArrowRight" &&
          selectedPhotoIndex < galleryPhotos.length - 1
        ) {
          setSelectedPhotoIndex(selectedPhotoIndex + 1);
        } else if (e.key === "Escape") {
          setSelectedPhotoIndex(null);
        }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => {
        // Re-enable body scroll when modal closes
        document.body.style.overflow = "unset";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      // Ensure scroll is re-enabled when modal is closed
      document.body.style.overflow = "unset";
    }
  }, [selectedPhotoIndex]);

  const getImageUrl = (filename: string) => {
    if (!supabaseUrl) {
      console.warn("Supabase URL not available, using placeholder");
      return `https://picsum.photos/300?random=${filename.replace(/\D/g, "") || "1"}`;
    }
    return `${supabaseUrl}/storage/v1/object/public/website-assets/about/${filename}`;
  };

  const selectedPhoto =
    selectedPhotoIndex !== null ? galleryPhotos[selectedPhotoIndex] : null;
  return (
    <div className="bg-white text-black overflow-x-hidden">
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <PageHeader title={TEXT_CONFIG.pages.about.title} />
          </div>

          <div className="prose prose-lg max-w-none mb-12">
            <div className="w-36 h-36 rounded-full overflow-hidden border-1 border-gray-300 float-right ml-6 mb-6 mt-0 shadow-md">
              <img
                src={getImageUrl("profile.png")}
                alt="Profile"
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.error(
                    "Profile image failed to load:",
                    getImageUrl("profile.png")
                  );
                  e.currentTarget.src =
                    "https://picsum.photos/200?random=profile";
                }}
              />
            </div>

            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              {TEXT_CONFIG.pages.about.intro}
            </p>

            <p className="text-gray-700 leading-relaxed mb-8">
              {TEXT_CONFIG.pages.about.content}
            </p>
          </div>

          <div className="mt-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Links Section */}
              <div>
                <h2 className="text-2xl font-light mb-6 text-gray-900">
                  {TEXT_CONFIG.pages.about.sections.links.title}
                </h2>
                <div className="space-y-3">
                  {TEXT_CONFIG.pages.about.sections.links.items.map(
                    (link, i) => (
                      <div key={i} className="py-2">
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-block"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-base font-medium text-gray-900 group-hover:text-black transition-colors">
                              {link.name}
                            </span>
                            <span className="text-gray-400 group-hover:text-gray-600 transition-all group-hover:translate-x-0.5">
                              ↗
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1 group-hover:text-gray-700 transition-colors">
                            {link.description}
                          </p>
                        </a>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Reading Section */}
              <div>
                <h2 className="text-2xl font-light mb-6 text-gray-900">
                  {TEXT_CONFIG.pages.about.sections.reading.title}
                </h2>
                <div className="space-y-3">
                  {TEXT_CONFIG.pages.about.sections.reading.items.map(
                    (book, i) => (
                      <div key={i} className="py-2">
                        <div className="group">
                          <div className="flex items-baseline gap-2">
                            <span className="text-base font-medium text-gray-900">
                              {book.title}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            by {book.author}
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20">
            <h2 className="text-2xl font-light mb-6 text-gray-900">
              {TEXT_CONFIG.pages.about.sections.photos.title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {galleryPhotos.map((photo, i) => (
                <div
                  key={i}
                  className="aspect-square bg-gray-50 rounded hover:bg-gray-100 transition-colors overflow-hidden shadow-sm cursor-pointer"
                  onClick={() => setSelectedPhotoIndex(i)}
                >
                  <img
                    src={getImageUrl(photo.filename)}
                    alt={photo.description || `Gallery item ${i + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                    onError={(e) => {
                      console.error(
                        "Gallery image failed to load:",
                        getImageUrl(photo.filename)
                      );
                      e.currentTarget.src = `https://picsum.photos/300?random=${i + 1}`;
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-20">
            <Newsletter inline />
          </div>
        </div>
      </div>

      {/* Photo Modal */}
      {selectedPhoto && selectedPhotoIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Dark backdrop */}
          <div
            className="absolute inset-0 bg-black/90 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setSelectedPhotoIndex(null)}
          />

          {/* Close button */}
          <button
            onClick={() => setSelectedPhotoIndex(null)}
            className="absolute top-6 right-6 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors z-10"
            aria-label="Close photo viewer"
          >
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Previous button */}
          {selectedPhotoIndex > 0 && (
            <button
              onClick={() => setSelectedPhotoIndex(selectedPhotoIndex - 1)}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all z-10 group"
              aria-label="Previous photo"
            >
              <svg
                className="w-6 h-6 text-gray-700 group-hover:text-black transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          )}

          {/* Next button */}
          {selectedPhotoIndex < galleryPhotos.length - 1 && (
            <button
              onClick={() => setSelectedPhotoIndex(selectedPhotoIndex + 1)}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all z-10 group"
              aria-label="Next photo"
            >
              <svg
                className="w-6 h-6 text-gray-700 group-hover:text-black transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          )}

          {/* Photo Container */}
          <div className="relative max-w-[90vw] max-h-[90vh] flex flex-col">
            {/* Photo */}
            <img
              src={getImageUrl(selectedPhoto.filename)}
              alt={selectedPhoto.description || "Full size photo"}
              className="max-w-full max-h-[75vh] object-contain rounded-t-lg bg-black"
              onError={(e) => {
                console.error(
                  "Modal image failed to load:",
                  getImageUrl(selectedPhoto.filename)
                );
                e.currentTarget.src = `https://picsum.photos/800?random=${selectedPhoto.filename.replace(/\D/g, "") || "1"}`;
              }}
            />

            {/* Info Overlay */}
            <div className="bg-white/95 backdrop-blur-md rounded-b-lg p-4 sm:p-6 mt-auto min-h-[140px]">
              {/* Photo counter */}
              <div className="text-xs text-gray-500 mb-2 text-center font-medium">
                {selectedPhotoIndex + 1} / {galleryPhotos.length}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-1 truncate">
                    {selectedPhoto.description || "Photo"}
                  </h3>

                  <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
                    {selectedPhoto.date && (
                      <div className="flex items-center gap-1">
                        <svg
                          className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <span className="truncate">{selectedPhoto.date}</span>
                      </div>
                    )}

                    {selectedPhoto.location && (
                      <div className="flex items-center gap-1 min-w-0">
                        <svg
                          className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span className="truncate max-w-[150px] sm:max-w-none">
                          {selectedPhoto.location.name}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {selectedPhoto.location?.coordinates && (
                  <a
                    href={`https://www.google.com/maps?q=${selectedPhoto.location.coordinates.lat},${selectedPhoto.location.coordinates.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-xs sm:text-sm font-medium whitespace-nowrap self-end sm:self-auto"
                  >
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                      />
                    </svg>
                    <span className="hidden sm:inline">View on Map</span>
                    <span className="sm:hidden">Map</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
