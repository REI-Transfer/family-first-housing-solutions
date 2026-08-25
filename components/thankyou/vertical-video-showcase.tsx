"use client"

import { useRef, useState } from "react"
import { Play } from "lucide-react"

type VerticalVideo = { src: string; title: string }

// Click-to-play vertical (9:16 / TikTok) video. Mirrors ClickToPlayVideo, but
// portrait: object-fit is "contain" so the whole frame shows (never cropped or
// stretched), height-capped so it doesn't dominate the page. No autoplay;
// controls appear once the viewer taps play; preload="metadata" for a poster
// (first frame) without fetching the whole file up front.
function VerticalVideoTile({ src, title }: VerticalVideo) {
  const ref = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  const handlePlay = () => {
    setPlaying(true)
    requestAnimationFrame(() => {
      // The src carries a #t=… media fragment so the poster shows a sharp,
      // non-blurry frame; reset to the start so playback still begins at 0.
      if (ref.current) ref.current.currentTime = 0
      ref.current?.play().catch(() => setPlaying(false))
    })
  }

  return (
    <div className="relative mx-auto w-full max-w-[280px] rounded-2xl overflow-hidden shadow-md border border-gray-200 bg-black">
      <video
        ref={ref}
        src={src}
        controls={playing}
        playsInline
        preload="metadata"
        className="block w-full h-auto max-h-[70vh]"
        style={{ aspectRatio: "9 / 16", objectFit: "contain" }}
        aria-label={title}
      />
      {!playing && (
        <button
          onClick={handlePlay}
          aria-label={`Play ${title}`}
          className="absolute inset-0 flex items-center justify-center bg-black/15 hover:bg-black/10 transition-colors group"
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-2xl transition-transform group-hover:scale-105">
            <Play className="h-8 w-8 text-gray-900 ml-1" fill="currentColor" />
          </span>
        </button>
      )}
    </div>
  )
}

export function VerticalVideoShowcase({
  videos,
  heading,
  subheading,
}: {
  videos: VerticalVideo[]
  heading?: string
  subheading?: string
}) {
  if (!videos.length) return null
  return (
    <section>
      <div className="mx-auto max-w-3xl">
        {(heading || subheading) && (
          <div className="text-center mb-8">
            {heading && (
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-balance">{heading}</h2>
            )}
            {subheading && <p className="mt-2 text-base md:text-lg text-gray-600">{subheading}</p>}
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
          {videos.map((v) => (
            <VerticalVideoTile key={v.src} src={v.src} title={v.title} />
          ))}
        </div>
      </div>
    </section>
  )
}
