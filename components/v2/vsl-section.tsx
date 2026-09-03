"use client";

import type { Brand } from "@/lib/brand";
// Reuse Family First's existing Vidalytics embed (components/survey/vsl-section)
// instead of the template's NEXT_PUBLIC_HERO_VIDEO_URL / YOUTUBE_IDS video, so the
// v2 landing shows the client's real Vidalytics video. Same NEXT_PUBLIC_VIDALYTICS_*
// env the rest of the site uses.
import { VSLSection as VidalyticsEmbed } from "@/components/survey/vsl-section";

const VIDALYTICS_ACCOUNT_ID = process.env.NEXT_PUBLIC_VIDALYTICS_ACCOUNT_ID || "";
const VIDALYTICS_EMBED_ID = process.env.NEXT_PUBLIC_VIDALYTICS_EMBED_ID || "";

export function VslSection({ brand }: { brand: Brand }) {
  // Nothing to show if the Vidalytics video isn't configured.
  if (!VIDALYTICS_ACCOUNT_ID || !VIDALYTICS_EMBED_ID) return null;

  return (
    <section className="bg-white px-6 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0F1D2F] mb-2 text-center">
          See How It Works
        </h2>
        <p className="text-center text-[#5A6B7D] text-lg mb-8">
          Watch how {brand.companyName} makes selling your home fast and
          stress-free.
        </p>
        <div className="rounded-2xl overflow-hidden shadow-lg border border-[#E2E8F0]">
          <VidalyticsEmbed />
        </div>
      </div>
    </section>
  );
}
