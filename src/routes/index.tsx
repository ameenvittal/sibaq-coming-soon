import { createFileRoute } from "@tanstack/react-router";
import landscape from "@/assets/sibaq-landscape-bleed.png";
import portrait from "@/assets/sibaq-portrait-bleed.png";
import rider from "@/assets/sibaq-rider-headless.png";
import wheel from "@/assets/sibaq-wheel.svg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sibaq 2026 — Coming Soon" },
      { name: "description", content: "Sibaq 2026 is on its way." },
      { property: "og:title", content: "Sibaq 2026 — Coming Soon" },
      { property: "og:description", content: "Sibaq 2026 is on its way." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="coming-soon" aria-label="Sibaq 2026 loading">
      <div className="poster">
        <picture>
          <source media="(max-aspect-ratio: 1/1)" srcSet={portrait} />
          <img className="poster-background" src={landscape} alt="An illustrated blue twilight landscape with coral clouds and shining stars" />
        </picture>
        <div className="rider-track" aria-hidden="true">
          <img className="wheel wheel-rear" src={wheel} alt="" />
          <img className="wheel wheel-front" src={wheel} alt="" />
          <img className="rider" src={rider} alt="" />
        </div>
        <div className="poster-copy">
          <h1 className="poster-title">Sibaq 2026</h1>
          <p className="poster-status">Loading<span className="loading-dots" aria-hidden="true" /></p>
        </div>
      </div>
    </main>
  );
}
