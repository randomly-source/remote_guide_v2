import React, { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { Sparkles, TrendingUp, Award, Users } from 'lucide-react';
interface Slide {
  id: number;
  icon: React.ReactNode;
  badge: string;
  title: string;
  description: string;
}
const slides: Slide[] = [{
  id: 1,
  icon: <Sparkles className="w-6 h-6" />,
  badge: 'Your Impact',
  title: 'Your Voice Shapes the Future of TV',
  description: "What you watch influences what gets made. You're part of a select group representing millions of viewers across America."
}, {
  id: 2,
  icon: <Users className="w-6 h-6" />,
  badge: 'Representing Millions',
  title: 'You Speak for Your Community',
  description: 'Your household represents thousands of similar families. Networks and advertisers rely on your viewing habits to make billion-dollar decisions.'
}, {
  id: 3,
  icon: <TrendingUp className="w-6 h-6" />,
  badge: 'Real Influence',
  title: 'What You Watch Matters',
  description: 'Your viewing data helps determine which shows get renewed, which ads you see, and what content creators make next.'
}, {
  id: 4,
  icon: <Award className="w-6 h-6" />,
  badge: 'Trusted Legacy',
  title: '100+ Years of Measuring Media',
  description: "Since 1923, Nielsen has been the gold standard in audience measurement. You're joining a trusted tradition of shaping entertainment."
}];
export function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(0);
  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex(prev => (prev + 1) % slides.length);
  }, []);
  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex(prev => (prev - 1 + slides.length) % slides.length);
  }, []);
  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };
  // Auto-advance every 5 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);
  // Handle swipe gestures
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50;
    if (info.offset.x > swipeThreshold) {
      prevSlide();
    } else if (info.offset.x < -swipeThreshold) {
      nextSlide();
    }
  };
  const currentSlide = slides[currentIndex];
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0
    })
  };
  return <div className="relative overflow-hidden bg-gradient-to-br from-[#4A90E2] to-[#357ABD] rounded-3xl text-white mb-6" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24" />

      {/* Carousel content */}
      <div className="relative z-10 px-6 sm:px-10 pt-8 pb-16 sm:pb-20 min-h-[320px] sm:min-h-[280px]">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div key={currentIndex} custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{
          x: {
            type: 'spring',
            stiffness: 300,
            damping: 30
          },
          opacity: {
            duration: 0.2
          }
        }} drag="x" dragConstraints={{
          left: 0,
          right: 0
        }} dragElastic={0.2} onDragEnd={handleDragEnd} className="cursor-grab active:cursor-grabbing">
            {/* Badge */}
            <motion.div initial={{
            opacity: 0,
            y: 10
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.1
          }} className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
              {currentSlide.icon}
              <span className="text-sm font-medium">{currentSlide.badge}</span>
            </motion.div>

            {/* Title */}
            <motion.h1 initial={{
            opacity: 0,
            y: 10
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.2
          }} className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 leading-tight">
              {currentSlide.title}
            </motion.h1>

            {/* Description */}
            <motion.p initial={{
            opacity: 0,
            y: 10
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.3
          }} className="text-base sm:text-lg text-blue-50 leading-relaxed max-w-2xl">
              {currentSlide.description}
            </motion.p>
          </motion.div>
        </AnimatePresence>

        {/* Dot indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {slides.map((_, index) => <button key={index} onClick={() => goToSlide(index)} className={`transition-all touch-manipulation ${index === currentIndex ? 'w-8 h-2 bg-white' : 'w-2 h-2 bg-white/40 hover:bg-white/60'} rounded-full`} aria-label={`Go to slide ${index + 1}`} />)}
        </div>

        {/* Progress indicator */}
        {!isPaused && <motion.div className="absolute bottom-6 left-0 right-0 h-0.5 bg-white/20" initial={{
        scaleX: 0
      }} animate={{
        scaleX: 1
      }} transition={{
        duration: 5,
        ease: 'linear'
      }} key={currentIndex} style={{
        transformOrigin: 'left'
      }} />}
      </div>
    </div>;
}