import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/Hero";
import { CustomCursor } from "@/components/CustomCursor";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dottis — Let your feed, feed someone" },
      {
        name: "description",
        content:
          "Share a small slice of your unused internet and generate donations for causes that need it most — at no cost to you.",
      },
      { property: "og:title", content: "Dottis — Let your feed, feed someone" },
      {
        property: "og:description",
        content:
          "Turn unused bandwidth into donations for wildlife, disaster relief and food aid. Free to install.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main>
      <CustomCursor />
      <Hero />
    </main>
  );
}
