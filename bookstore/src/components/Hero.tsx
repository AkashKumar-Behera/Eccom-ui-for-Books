'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, ArrowRight, Play, Pause, Volume2, VolumeX, ChevronLeft, ChevronRight, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import gsap from 'gsap';

export interface VideoSlide {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  videoUrl: string;
  poster: string;
}

const CAROUSEL_VIDEOS: VideoSlide[] = [
  {
    id: 'v1',
    title: 'The Art of Mindful Journaling',
    subtitle: 'Watch 120gsm bleed-proof paper absorb fountain ink without ghosting.',
    tag: 'Featured ASMR',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-writing-in-a-notebook-with-a-pen-41315-large.mp4',
    poster: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'v2',
    title: 'Precision Japanese Gel Craft',
    subtitle: '0.5mm ultra-fine nibs engineered for smooth, continuous handwritten notes.',
    tag: 'Craftsmanship',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-close-up-of-hands-writing-on-a-notebook-41317-large.mp4',
    poster: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'v3',
    title: 'Aesthetic Sky Blue Desk Essentials',
    subtitle: 'Elevate your daily focus with soft pastel planners & heart brass bookmarks.',
    tag: 'Studio Setup',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hand-turning-the-pages-of-a-book-41318-large.mp4',
    poster: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1200&q=80',
  },
];

export const Hero: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      if (isPlaying) {
        setCurrentIndex((prev) => (prev + 1) % CAROUSEL_VIDEOS.length);
      }
    }, 6000);
    return () => clearInterval(timer);
  }, [isPlaying]);

  useEffect(() => {
    videoRefs.current.forEach((video, idx) => {
      if (video) {
        if (idx === currentIndex) {
          video.currentTime = 0;
          if (isPlaying) video.play().catch(() => {});
        } else {
          video.pause();
        }
      }
    });
  }, [currentIndex, isPlaying]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % CAROUSEL_VIDEOS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + CAROUSEL_VIDEOS.length) % CAROUSEL_VIDEOS.length);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    videoRefs.current.forEach((v) => {
      if (v) v.muted = !isMuted;
    });
  };

  return (
    <section ref={heroRef} className="relative overflow-hidden bg-white pt-4 pb-12 sm:pt-8 sm:pb-16 lg:pt-12 lg:pb-24 px-3 sm:px-6">
      <div className="max-w-7xl mx-auto relative z-10 text-center">
        
        {/* Header Text Section */}
        <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4 mb-6 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-[#0284c7] text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-xs max-w-full truncate">
            <Sparkles className="w-3.5 h-3.5 text-[#38bdf8] flex-shrink-0" />
            <span className="truncate">Pastel Sky Collection • 2026 Edition</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-serif font-bold text-[#0c4a6e] tracking-tight leading-[1.15] px-1">
            Craft Your Ideas With <br className="hidden sm:inline" />
            <span className="text-[#0284c7] italic underline decoration-[#38bdf8] decoration-2 sm:decoration-4 underline-offset-4 sm:underline-offset-8">
              Artisan Elegance
            </span>
          </h1>

          <p className="text-xs sm:text-base lg:text-lg text-[#0284c7]/90 font-sans max-w-xl mx-auto leading-relaxed px-2">
            Discover bespoke spiral notebooks, fine gel pens, and aesthetic daily planners designed for visionary creators.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-4 pt-2 px-4">
            <a
              href="#catalog"
              className="w-full sm:w-auto group flex items-center justify-center gap-2 bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl shadow-md transition-all duration-300 transform hover:-translate-y-0.5 text-xs sm:text-sm"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="#craftsmanship"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl border border-slate-200 hover:border-[#0284c7] bg-white text-[#0c4a6e] font-bold shadow-xs transition-all text-xs sm:text-sm"
            >
              Our Story
            </a>
          </div>
        </div>

        {/* Center Auto-Scrolling Video Showcase Carousel (Fully Mobile Responsive) */}
        <div className="relative max-w-4xl mx-auto rounded-2xl sm:rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-lg sm:shadow-xl group">
          
          {/* Main Video Screen */}
          <div className="relative aspect-[4/3] sm:aspect-[16/9] bg-slate-100 overflow-hidden">
            {CAROUSEL_VIDEOS.map((slide, idx) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                <video
                  ref={(el) => {
                    videoRefs.current[idx] = el;
                  }}
                  src={slide.videoUrl}
                  poster={slide.poster}
                  muted={isMuted}
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#0c4a6e]/90 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-3 left-3 right-16 sm:bottom-6 sm:left-6 sm:right-24 text-left text-white z-20 space-y-0.5 sm:space-y-1">
                  <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 bg-[#0284c7] text-white text-[9px] sm:text-[11px] font-bold rounded-full uppercase tracking-wider inline-block mb-0.5 sm:mb-1">
                    {slide.tag}
                  </span>
                  <h3 className="font-serif text-sm sm:text-xl lg:text-2xl font-bold line-clamp-1">{slide.title}</h3>
                  <p className="text-[11px] sm:text-xs text-sky-100 font-sans line-clamp-1 font-normal hidden sm:block">
                    {slide.subtitle}
                  </p>
                </div>
              </div>
            ))}

            {/* Video Controls (Right Bottom) */}
            <div className="absolute bottom-3 right-3 sm:bottom-6 sm:right-6 z-30 flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={toggleMute}
                aria-label="Toggle Mute"
                className="p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl bg-white/90 hover:bg-white text-[#0c4a6e] backdrop-blur-md shadow-md transition-all"
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
              </button>

              <button
                onClick={togglePlay}
                aria-label="Play or Pause"
                className="p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl bg-white/90 hover:bg-white text-[#0c4a6e] backdrop-blur-md shadow-md transition-all"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />}
              </button>
            </div>

            {/* Arrow Navigators */}
            <button
              onClick={handlePrev}
              aria-label="Previous Slide"
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 rounded-full bg-white/80 hover:bg-white text-[#0c4a6e] shadow-md backdrop-blur-md transition-all opacity-90 sm:opacity-80 sm:group-hover:opacity-100"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <button
              onClick={handleNext}
              aria-label="Next Slide"
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 rounded-full bg-white/80 hover:bg-white text-[#0c4a6e] shadow-md backdrop-blur-md transition-all opacity-90 sm:opacity-80 sm:group-hover:opacity-100"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

          </div>

          <div className="p-3 sm:p-4 bg-white border-t border-slate-200 flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 sm:gap-3 overflow-x-auto scrollbar-none">
              {CAROUSEL_VIDEOS.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl border text-[10px] sm:text-xs font-bold transition-all ${
                    idx === currentIndex
                      ? 'bg-[#0284c7] text-white border-[#0284c7] shadow-xs'
                      : 'bg-slate-50 text-[#0c4a6e] border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-current" />
                  <span className="whitespace-nowrap">{slide.tag}</span>
                </button>
              ))}
            </div>

            <span className="text-[10px] sm:text-xs font-bold text-[#0284c7] font-serif whitespace-nowrap">
              0{currentIndex + 1} / 0{CAROUSEL_VIDEOS.length}
            </span>
          </div>

        </div>

        {/* Feature Guarantees Strip */}
        <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 p-3.5 sm:p-4 bg-white rounded-xl sm:rounded-2xl border border-slate-200 shadow-xs">
            <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-[#0284c7] flex-shrink-0" />
            <div className="text-left">
              <h4 className="text-xs font-bold text-[#0c4a6e]">Free Express Delivery</h4>
              <p className="text-[10px] sm:text-[11px] text-[#0284c7]">On orders over ₹999</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 p-3.5 sm:p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
            <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#0284c7] flex-shrink-0" />
            <div className="text-left">
              <h4 className="text-xs font-bold text-[#0c4a6e]">100% Bleed-Proof Paper</h4>
              <p className="text-[10px] sm:text-[11px] text-[#0284c7]">Archival 120gsm paper</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 p-3.5 sm:p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
            <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 text-[#0284c7] flex-shrink-0" />
            <div className="text-left">
              <h4 className="text-xs font-bold text-[#0c4a6e]">Easy 30-Day Returns</h4>
              <p className="text-[10px] sm:text-[11px] text-[#0284c7]">Hassle-free guarantee</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
