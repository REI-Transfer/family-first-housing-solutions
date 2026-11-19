// Brand for the property-record form (lib/brand.ts is the landing page's own brand, a different shape).
// Company name and phone come from the page (lib/config via the sections that render SurveyCard),
// or NEXT_PUBLIC_PHONE_DISPLAY / NEXT_PUBLIC_PHONE_HREF when the page has no real number.
export interface Brand {
  companyName: string
  phoneDisplay: string
  phoneHref: string
  phoneAcceptsText: boolean
  showroom: boolean
  marketName: string
  recordForm: boolean
  recordMode: "one-step" | "two-step"
}
export function marketPhrase(brand: Brand): string {
  return brand.marketName ? brand.marketName : "your area"
}
const recordSwitch = (process.env.NEXT_PUBLIC_RECORD_FORM ?? "").trim().toLowerCase()
export const RECORD_BRAND: Brand = {
  companyName: "",
  phoneDisplay: process.env.NEXT_PUBLIC_PHONE_DISPLAY ?? "",
  phoneHref: process.env.NEXT_PUBLIC_PHONE_HREF ?? "",
  phoneAcceptsText: !["0", "false", "off"].includes((process.env.NEXT_PUBLIC_PHONE_ACCEPTS_TEXT ?? "").trim().toLowerCase()),
  showroom: false,
  marketName: "",
  // NEXT_PUBLIC_RECORD_FORM=one-step|two-step turns the new form on in that version.
  recordForm: ["one-step", "two-step"].includes(recordSwitch),
  recordMode: recordSwitch === "two-step" ? "two-step" : "one-step",
}
