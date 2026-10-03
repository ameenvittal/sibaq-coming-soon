import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import landscape from "@/assets/sibaq-landscape-bleed.png";
import portrait from "@/assets/sibaq-portrait-bleed.png";
import rider from "@/assets/sibaq-rider-headless.png";
import wheel from "@/assets/sibaq-wheel.svg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sibaq 2026 | Darul Huda National Arts Fest - Chemmad, Kerala" },
      { name: "description", content: "Sibaq 2026 — Darul Huda National Arts fest. Chemmad, Kerala." },
      { name: "keywords", content: "Sibaq 2026, Sibaq, Darul Huda National Arts fest, Chemmad, Kerala, DHIU, Arts Festival" },
      { property: "og:title", content: "Sibaq 2026 | Darul Huda National Arts Fest" },
      { property: "og:description", content: "Sibaq 2026 — Darul Huda National Arts fest. Chemmad, Kerala." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Sibaq 2026" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Sibaq 2026 | Darul Huda National Arts Fest" },
      { name: "twitter:description", content: "Sibaq 2026 — Darul Huda National Arts fest. Chemmad, Kerala." },
    ],
    links: [
      { rel: "preload", href: landscape, as: "image" },
      { rel: "preload", href: portrait, as: "image" },
      { rel: "preload", href: rider, as: "image" },
      { rel: "preload", href: wheel, as: "image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const images = [landscape, portrait, rider, wheel];
    let cancelled = false;

    const preloadImage = (src: string) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        img.src = src;
        if (img.complete) {
          resolve();
        } else {
          img.onload = () => resolve();
          img.onerror = () => resolve();
        }
      });

    Promise.all(images.map(preloadImage)).then(() => {
      if (!cancelled) {
        setIsLoaded(true);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="coming-soon" aria-label="Sibaq 2026 - Darul Huda National Arts fest, Chemmad, Kerala">
      {!isLoaded && (
        <div className="preloader" role="status" aria-label="Loading site">
          <div className="spinner" />
        </div>
      )}
      <div className={`poster ${isLoaded ? "poster-ready" : "poster-loading"}`}>
        <picture>
          <source media="(max-aspect-ratio: 1/1)" srcSet={portrait} />
          <img
            className="poster-background"
            src={landscape}
            alt="Sibaq 2026 - Darul Huda National Arts fest, Chemmad, Kerala"
          />
        </picture>
        <div className="rider-track" aria-hidden="true">
          <img className="wheel wheel-rear" src={wheel} alt="" />
          <img className="wheel wheel-front" src={wheel} alt="" />
          <img className="rider" src={rider} alt="" />
        </div>
        <div className="poster-copy">
          <h1 className="poster-title">Sibaq 2026</h1>
          <p className="poster-subtitle">Darul Huda National Arts fest.</p>
          <p className="poster-status">Loading<span className="loading-dots" aria-hidden="true" /></p>
        </div>
      </div>
    </main>
  );
}
