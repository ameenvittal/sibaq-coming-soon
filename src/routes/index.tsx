import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import landscape from "@/assets/sibaq-landscape-bleed.png";
import portrait from "@/assets/sibaq-portrait-bleed.png";
import rider from "@/assets/sibaq-rider-headless.png";
import wheel from "@/assets/sibaq-wheel.svg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DARUL HUDA SIBĀQ 2026" },
      { name: "description", content: "DARUL HUDA SIBĀQ 2026" },
      { name: "keywords", content: "DARUL HUDA SIBĀQ 2026, Sibaq 2026, Darul Huda, Sibaq" },
      { property: "og:title", content: "DARUL HUDA SIBĀQ 2026" },
      { property: "og:description", content: "DARUL HUDA SIBĀQ 2026" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "DARUL HUDA SIBĀQ 2026" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "DARUL HUDA SIBĀQ 2026" },
      { name: "twitter:description", content: "DARUL HUDA SIBĀQ 2026" },
    ],
    links: [
      { rel: "preload", as: "image", href: landscape },
      { rel: "preload", as: "image", href: portrait },
      { rel: "preload", as: "image", href: rider },
      { rel: "preload", as: "image", href: wheel },
    ],
  }),
  component: Index,
});

function preloadImage(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = src;
    if ("decode" in img) {
      img
        .decode()
        .then(() => resolve())
        .catch(() => {
          if (img.complete) resolve();
          else {
            img.onload = () => resolve();
            img.onerror = () => resolve();
          }
        });
    } else {
      if (img.complete) resolve();
      else {
        img.onload = () => resolve();
        img.onerror = () => resolve();
      }
    }
  });
}

function Index() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let active = true;
    const timeout = new Promise<void>((res) => setTimeout(res, 8000));
    const allImages = Promise.all([
      preloadImage(landscape),
      preloadImage(portrait),
      preloadImage(rider),
      preloadImage(wheel),
    ]);

    Promise.race([allImages, timeout]).then(() => {
      if (active) {
        setIsLoaded(true);
      }
    });

    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <div
        className={`site-loader ${isLoaded ? "is-hidden" : ""}`}
        aria-hidden={isLoaded}
        aria-label="Loading DARUL HUDA SIBĀQ 2026"
      >
        <div className="loader-spinner" role="status" aria-label="Loading..." />
      </div>

      <main
        className="coming-soon"
        aria-label="DARUL HUDA SIBĀQ 2026"
      >
        <div className={`poster ${isLoaded ? "is-ready" : ""}`}>
          <picture>
            <source media="(max-aspect-ratio: 1/1)" srcSet={portrait} />
            <img
              className="poster-background"
              src={landscape}
              alt="DARUL HUDA SIBĀQ 2026"
            />
          </picture>
          <div className="rider-track" aria-hidden="true">
            <img className="wheel wheel-rear" src={wheel} alt="" />
            <img className="wheel wheel-front" src={wheel} alt="" />
            <img className="rider" src={rider} alt="" />
          </div>
          <div className="poster-copy">
            <h1 className="poster-title" aria-label="DARUL HUDA SIBĀQ 2026">
              <span className="poster-title-kicker">DARUL HUDA</span>
              <span className="poster-title-main">SIBĀQ 2026</span>
            </h1>
            <p className="poster-status">
              <span>Something is Loading</span>
              <span className="dots-container" aria-hidden="true">
                <span className="dot">.</span>
                <span className="dot">.</span>
                <span className="dot">.</span>
                <span className="dot">.</span>
              </span>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
