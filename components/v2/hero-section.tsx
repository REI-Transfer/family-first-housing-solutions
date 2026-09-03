"use client";

import { useState } from "react";
import { ArrowRight, ArrowDown, Shield, Clock, DollarSign } from "lucide-react";
import { SurveyCard } from "@/components/survey/survey-card";
import { AddressAutocomplete, type AddressDetails, type ServiceArea } from "@/components/survey/address-autocomplete";
import { type Brand } from "@/lib/brand";

// Survey/gate props threaded from the server page (config-derived). The address
// gate is family-first's own ALLOWED_STATES state allow-list (via
// components/survey/address-autocomplete), NOT the v2 template's lat/lng
// service-area gate — out-of-list states fire onOutOfArea and are blocked.
interface HeroProps {
  brand: Brand;
  phoneDisplay: string;
  phoneHref: string;
  serviceAreas: ServiceArea[];
  allowedStates: string[];
  disqualifiedPropertyTypes: string[];
  disqualifiedOwnershipLengths: string[];
  motivationV2: boolean;
}

export function HeroSection({
  brand,
  phoneDisplay,
  phoneHref,
  serviceAreas,
  allowedStates,
  disqualifiedPropertyTypes,
  disqualifiedOwnershipLengths,
  motivationV2,
}: HeroProps) {
  const [showSurvey, setShowSurvey] = useState(false);
  const [initialAddress, setInitialAddress] = useState("");
  const [addressVerified, setAddressVerified] = useState(false);
  const [outsideAreaError, setOutsideAreaError] = useState(false);

  const hasPhoto = !!brand.foundersPhotoUrl;

  // Fires ONLY for in-area (allowed-state) addresses — the autocomplete routes
  // out-of-list states through onOutOfArea instead, so reaching here means the
  // state gate passed.
  const handleAddressSelect = (address: string, _details: AddressDetails) => {
    setInitialAddress(address);
    setAddressVerified(true);
    setOutsideAreaError(false);
    setShowSurvey(true);
  };

  const handleOutOfArea = (address: string) => {
    setInitialAddress(address);
    setAddressVerified(false);
    setOutsideAreaError(true);
  };

  return (
    <section id="hero" className="relative bg-white overflow-hidden">
      <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-stretch min-h-[100dvh] px-4 pt-28 pb-8 md:px-12 md:pb-20 lg:px-16 lg:pt-16 lg:pb-0 gap-6 lg:gap-0">

        {/* Left — owner cut-out photo (desktop only) */}
        {hasPhoto && (
          <div className="hidden lg:flex lg:w-[45%] items-end justify-center relative">
            <div className="flex flex-col items-center">
              <img
                src={brand.foundersPhotoUrl}
                alt={brand.ownerName ? `${brand.ownerName}, ${brand.companyName}` : brand.companyName}
                className="h-[80vh] w-auto object-contain object-bottom"
              />
              {brand.foundersCaption && (
                <p className="text-center text-sm text-[#5A6B7D] pb-4 max-w-xs">{brand.foundersCaption}</p>
              )}
            </div>
          </div>
        )}

        {/* Right — form content */}
        <div className={`w-full flex flex-col items-center justify-center lg:py-20 ${hasPhoto ? "lg:w-[55%]" : "lg:w-full"}`}>
          {/* Trust badges */}
          <div className="hidden md:flex flex-wrap items-center justify-center gap-6 mb-4 mt-4 lg:mt-0 animate-reveal-up">
            <div className="flex items-center gap-2 text-[#5A6B7D] text-base">
              <Shield className="h-4 w-4 text-[#1B2A4A]" />
              <span>Trusted </span>
            </div>
            <div className="flex items-center gap-2 text-[#5A6B7D] text-base">
              <Clock className="h-4 w-4 text-[#1B2A4A]" />
              <span>24-Hour Cash Offers</span>
            </div>
            <div className="flex items-center gap-2 text-[#5A6B7D] text-base">
              <DollarSign className="h-4 w-4 text-[#1B2A4A]" />
              <span>No Fees. No Commissions.</span>
            </div>
          </div>

          {/* Main headline */}
          <h1 className="text-center text-2xl font-bold leading-tight tracking-tight text-[#0F1D2F] md:text-5xl lg:text-5xl max-w-2xl animate-reveal-up animation-delay-100">
            {brand.headline}
            {brand.headlineAccent && (
              <>
                <br />
                <span className="text-[color:var(--brand-accent)]">{brand.headlineAccent}</span>
              </>
            )}
          </h1>

          {/* Subheadline */}
          <p className="mt-2 md:mt-4 text-center text-base md:text-xl text-[#5A6B7D] max-w-xl leading-relaxed animate-reveal-up animation-delay-200">
            {brand.subheadline}
          </p>

          {/* Address Input or Survey */}
          <div className="mt-4 md:mt-6 w-full max-w-2xl animate-reveal-up animation-delay-300">
            {!showSurvey ? (
              <div className="flex flex-col gap-3">
                <div className="flex flex-col items-center gap-1">
                  <span className="text-[#1B2A4A] text-base font-medium">Enter your address to start</span>
                  <ArrowDown className="h-5 w-5 text-[#1B2A4A] animate-bounce" />
                </div>
                <div className="relative">
                  <AddressAutocomplete
                    value={initialAddress}
                    onChange={(address) => { setInitialAddress(address); setAddressVerified(false); setOutsideAreaError(false); }}
                    onSelect={handleAddressSelect}
                    onOutOfArea={handleOutOfArea}
                    serviceAreas={serviceAreas}
                    allowedStates={allowedStates}
                    placeholder="Enter your property address..."
                    className="[&_input]:h-14 [&_input]:text-lg [&_input]:rounded-2xl [&_input]:shadow-lg [&_input]:border-[#1B2A4A]/30 [&_input]:bg-white"
                  />
                </div>
                <button
                  onClick={() => { if (addressVerified) setShowSurvey(true); }}
                  className="w-full h-14 bg-[#1B2A4A] hover:bg-[#131E36] text-white font-semibold text-xl rounded-2xl transition-all shadow-lg shadow-[#1B2A4A]/20 flex items-center justify-center gap-2"
                >
                  Get My Free Cash Offer
                  <ArrowRight className="h-6 w-6" />
                </button>
                {outsideAreaError && (
                  <p className="text-center text-sm font-medium" style={{ color: "#dc2626" }}>
                    Sorry, that address is outside our current buying area. Please enter a property in one of the states we serve.
                  </p>
                )}
                <p className="hidden md:block text-center text-[#94A3B8] text-sm">
                  Takes less than 2 minutes. No obligation.
                </p>
                {/* Generic trust badges */}
                <div className="flex flex-col items-start md:flex-row md:items-center md:justify-center gap-1.5 md:gap-5 mt-2 md:mt-3">
                  <div className="flex items-center gap-2 md:gap-3 bg-white rounded-xl px-2 py-1.5 md:px-6 md:py-4 shadow-sm border border-gray-200">
                    <span className="text-3xl md:text-5xl font-bold text-[#00529B]">A+</span>
                    <div className="flex flex-col leading-tight">
                      <span className="text-sm md:text-lg font-bold text-[#00529B]">BBB</span>
                      <span className="text-xs md:text-sm text-gray-600">ACCREDITED</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 md:gap-3 bg-white rounded-xl px-2 py-1.5 md:px-6 md:py-4 shadow-sm border border-gray-200">
                    <span className="text-lg md:text-2xl font-bold text-[#4285F4]">Google</span>
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="h-5 w-5 md:h-7 md:w-7 text-[#F4B400] fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="animate-scale-in">
                <SurveyCard
                  initialAddress={initialAddress}
                  initialStep={2}
                  phoneDisplay={phoneDisplay}
                  phoneHref={phoneHref}
                  serviceAreas={serviceAreas}
                  allowedStates={allowedStates}
                  disqualifiedPropertyTypes={disqualifiedPropertyTypes}
                  disqualifiedOwnershipLengths={disqualifiedOwnershipLengths}
                  motivationV2={motivationV2}
                />
              </div>
            )}
          </div>

          {/* Mobile — owner cut-out */}
          {hasPhoto && (
            <div className="lg:hidden mt-8 w-full flex flex-col items-center">
              <div className="relative inline-block overflow-hidden">
                <img
                  src={brand.foundersPhotoUrl}
                  alt={brand.ownerName ? `${brand.ownerName}, ${brand.companyName}` : brand.companyName}
                  className="block max-h-[300px] w-auto max-w-full object-contain"
                />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-white to-transparent" />
              </div>
              {brand.foundersCaption && (
                <p className="text-center text-sm text-[#5A6B7D] mt-2 max-w-xs">{brand.foundersCaption}</p>
              )}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
