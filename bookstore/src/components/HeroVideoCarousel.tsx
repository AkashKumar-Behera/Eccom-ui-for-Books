'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX, Sparkles } from 'lucide-react';

export interface VideoSlide {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  videoUrl: string;
  posterImage: string;
}

const VIDEO_SLIDES: VideoSlide[] = [
  {
    id: 'slide-1',
    title: 'The Art of Journaling',
    subtitle: 'Watch how our bleed-proof 120gsm paper handles fountain pens & watercolors smoothly.',
    badge: 'Stationery ASMR',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-writing-in-a-notebook-with-a-pen-41315-large.mp4',
    posterImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'slide-2',
    title: 'Precision Pen Crafting',
    subtitle: 'Hand-assembled 0.5mm Japanese gel nibs for effortless, zero-smudge writing.',
    badge: 'Behind The Craft',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-close-up-of-hands-writing-on-a-notebook-41317-large.mp4',
    posterImage: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'slide-3',
    title: 'Aesthetic Desk Setup',
    subtitle: 'Transform your daily workflow with soft sky blue planners and gold ribbon clips.',
    badge: 'Desk Inspiration',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hand-turning-the-pages-of-a-book-41318-large.mp4',
    posterImage: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=800&q=80',
  },
];

export const HeroVideoCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    // Play current video and pause others
    videoRefs.current.forEach((video, idx) => {
      if (video) {
        if (idx === currentIndex) {
          video.currentTime = 0;
          if (isPlaying) {
            video.play().catch(() => {});
          }
        } else {
          video.pause();
        }
      }
    });
  }, [currentIndex, isPlaying]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % VIDEO_SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + VIDEO_SLIDES.length) % VIDEO_SLIDES.length);
  };

  const togglePlay = () => {
    const currentVideo = videoRefs.current[currentIndex];
    if (currentVideo) {
      if (isPlaying) {
        currentVideo.pause();
        setIsPlaying(false);
      } else {
        currentVideo.play().catch(() => {});
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    videoRefs.current.forEach((video) => {
      if (video) video.muted = !isMuted;
    });
  };

  return (
    <div className="relative w-full max-w-md bg-white p-4 rounded-3xl border border-[#bae6fd] shadow-xl overflow-hidden group">
      
      {/* Top Badge */}
      <div className="absolute top-7 left-7 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0284c7] text-white text-[11px] font-bold shadow-md">
        <Sparkles className="w-3.5 h-3.5" />
        <span>{VIDEO_SLIDES[currentIndex].badge}</span>
      </div>

      {/* Video Container Aspect 4:3 */}
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#e0f2fe] border border-[#bae6fd]">
        {VIDEO_SLIDES.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <video
              ref={(el) => {
                videoRefs.current[idx] = el;
              }}
              src={slide.videoUrl}
              poster={slide.posterImage}
              muted={isMuted}
              loop
              playsInline
              className="w-full h-full object-cover"
            />
            {/* Gradient Overlay for Controls readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c4a6e]/70 via-transparent to-transparent pointer-events-none" />
          </div>
        ))}

        {/* Video Overlay Controls (Play/Pause & Mute) */}
        <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2">
          <button
            onClick={toggleMute}
            aria-label="Toggle Mute"
            className="p-2 rounded-xl bg-white/80 hover:bg-white text-[#0c4a6e] backdrop-blur-md shadow-sm transition-all"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <button
            onClick={togglePlay}
            aria-label="Play or Pause"
            className="p-2 rounded-xl bg-white/80 hover:bg-white text-[#0c4a6e] backdrop-blur-md shadow-sm transition-all"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
          </button>
        </div>

        {/* Prev / Next Slide Arrows */}
        <button
          onClick={handlePrev}
          aria-label="Previous Video"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-[#0c4a6e] shadow-md backdrop-blur-md transition-all opacity-80 group-hover:opacity-100"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button
          onClick={handleNext}
          aria-label="Next Video"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-[#0c4a6e] shadow-md backdrop-blur-md transition-all opacity-80 group-hover:opacity-100"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Video Caption Details */}
      <div className="pt-4 px-2 space-y-1 text-left">
        <h4 className="font-serif text-lg font-bold text-[#0c4a6e]">
          {VIDEO_SLIDES[currentIndex].title}
        </h4>
        <p className="text-xs text-[#0284c7] font-sans font-normal leading-relaxed line-clamp-2">
          {VIDEO_SLIDES[currentIndex].subtitle}
        </p>

        {/* Carousel Indicators / Dots */}
        <div className="flex items-center justify-between pt-3">
          <div className="flex items-center gap-1.5">
            {VIDEO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex
                    ? 'w-6 bg-[#0284c7]'
                    : 'w-2 bg-[#bae6fd] hover:bg-[#38bdf8]'
                }`}
              />
            ))}
          </div>

          <span className="text-[11px] font-bold text-[#0284c7]">
            0{currentIndex + 1} / 0{VIDEO_SLIDES.length}
          </span>
        </div>
      </div>

    </div>
  );
};
