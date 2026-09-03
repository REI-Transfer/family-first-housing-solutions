import { Header } from "@/components/v2/header";
import { HeroSection } from "@/components/v2/hero-section";
import { PhilosophySection } from "@/components/v2/philosophy-section";
import { VslSection } from "@/components/v2/vsl-section";
import { TrustSection } from "@/components/v2/trust-section";
import { SalesLetterSection } from "@/components/v2/sales-letter-section";
import { FaqSection } from "@/components/v2/faq-section";
import { FooterSection } from "@/components/v2/footer-section";
import { buildBrand } from "@/lib/brand";
import config from "@/lib/config";
import type { ServiceArea } from "@/components/survey/address-autocomplete";

export default function HomePage() {
  const brand = buildBrand();

  // Config-derived survey/gate props. The address gate is the ALLOWED_STATES
  // state allow-list enforced inside components/survey/address-autocomplete —
  // NOT the v2 template's lat/lng service-area gate.
  const allowedStates = config.allowedStates.split(",").map((s) => s.trim()).filter(Boolean);
  const disqualifiedPropertyTypes = config.disqualifiedPropertyTypes.split(",").map((s) => s.trim()).filter(Boolean);
  const disqualifiedOwnershipLengths = config.disqualifiedOwnershipLengths.split(",").map((s) => s.trim()).filter(Boolean);
  let serviceAreas: ServiceArea[] = [];
  try { serviceAreas = JSON.parse(config.serviceAreas); } catch {}

  const survey = {
    phoneDisplay: config.phoneDisplay,
    phoneHref: config.phoneHref,
    serviceAreas,
    allowedStates,
    disqualifiedPropertyTypes,
    disqualifiedOwnershipLengths,
    motivationV2: config.motivationV2,
  };

  return (
    <main
      className="v2-light min-h-screen"
      style={{ ["--brand-accent" as any]: brand.accentColor, ["--accent" as any]: brand.accentColor }}
    >
      <Header brand={brand} {...survey} />
      <HeroSection brand={brand} {...survey} />
      <PhilosophySection brand={brand} />
      <VslSection brand={brand} />
      <TrustSection brand={brand} />
      <SalesLetterSection brand={brand} />
      <FaqSection brand={brand} />
      <FooterSection brand={brand} />
    </main>
  );
}
