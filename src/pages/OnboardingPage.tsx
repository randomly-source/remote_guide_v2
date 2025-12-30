import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { OnboardingSlide } from '../components/OnboardingSlide';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ShieldCheck, Users, Gift, Tv, Lock, CheckCircle2, ArrowRight, ChevronRight } from 'lucide-react';
interface OnboardingPageProps {
  onComplete: () => void;
}
export function OnboardingPage({
  onComplete
}: OnboardingPageProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    zip: ''
  });
  const totalSlides = 5;
  const handleNext = () => {
    if (currentSlide < totalSlides - 1) {
      setDirection(1);
      setCurrentSlide(prev => prev + 1);
    } else {
      onComplete();
    }
  };
  const handleSkip = () => {
    // Go straight to sign up (last slide)
    setDirection(1);
    setCurrentSlide(totalSlides - 1);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };
  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };
  return <div className="min-h-screen bg-white overflow-hidden flex flex-col">
      {/* Progress Indicators */}
      <div className="px-6 pt-6 pb-2 flex gap-2 z-10">
        {Array.from({
        length: totalSlides
      }).map((_, index) => <div key={index} className={`h-1.5 rounded-full flex-1 transition-all duration-300 ${index <= currentSlide ? 'bg-[#4A90E2]' : 'bg-gray-200'}`} />)}
      </div>

      {/* Skip Button */}
      {currentSlide < totalSlides - 1 && <div className="absolute top-6 right-6 z-20">
          <button onClick={handleSkip} className="text-gray-400 font-medium text-sm px-3 py-1 hover:text-gray-600 transition-colors">
            Skip
          </button>
        </div>}

      {/* Slides Container */}
      <div className="flex-1 relative">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div key={currentSlide} custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{
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
        }} dragElastic={1} onDragEnd={(e, {
          offset,
          velocity
        }) => {
          const swipe = swipePower(offset.x, velocity.x);
          if (swipe < -swipeConfidenceThreshold) {
            handleNext();
          } else if (swipe > swipeConfidenceThreshold && currentSlide > 0) {
            setDirection(-1);
            setCurrentSlide(prev => prev - 1);
          }
        }} className="absolute inset-0 w-full h-full">
            {/* Slide 1: Welcome */}
            {currentSlide === 0 && <OnboardingSlide title="Your Voice Shapes What America Watches" description="Join thousands of households making an impact on the future of entertainment." icon={<div className="w-16 h-16 bg-[#4A90E2] rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200">
                    <span className="text-white font-bold text-3xl">N</span>
                  </div>} ctaText="Get Started" onCtaClick={handleNext} />}

            {/* Slide 2: Trust & Privacy */}
            {currentSlide === 1 && <OnboardingSlide title="Your Privacy is Our Priority" description="We use bank-level encryption to keep your data 100% secure and confidential." icon={<ShieldCheck className="w-16 h-16 text-[#4A90E2]" />} ctaText="Continue" onCtaClick={handleNext}>
                <div className="space-y-4 text-left bg-gray-50 p-6 rounded-2xl border border-gray-100">
                  <div className="flex items-center gap-3">
                    <Lock className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700 font-medium">
                      Bank-level encryption
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700 font-medium">
                      Never sell your personal data
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700 font-medium">
                      100% secure & confidential
                    </span>
                  </div>
                </div>
              </OnboardingSlide>}

            {/* Slide 3: Impact */}
            {currentSlide === 2 && <OnboardingSlide title="Join 40,000+ Households" description="Be part of a community that has shaped media for over 95 years." icon={<Users className="w-16 h-16 text-[#4A90E2]" />} ctaText="Next" onCtaClick={handleNext}>
                <div className="grid grid-cols-1 gap-3">
                  <Card className="bg-blue-50 border-blue-100">
                    <h3 className="font-bold text-gray-900">95+ Years</h3>
                    <p className="text-sm text-gray-600">
                      Of trusted research history
                    </p>
                  </Card>
                  <Card className="bg-purple-50 border-purple-100">
                    <h3 className="font-bold text-gray-900">Real Influence</h3>
                    <p className="text-sm text-gray-600">
                      Decide what shows get renewed
                    </p>
                  </Card>
                </div>
              </OnboardingSlide>}

            {/* Slide 4: Rewards */}
            {currentSlide === 3 && <OnboardingSlide title="Get Rewarded for Your Time" description="Earn monthly rewards and exclusive perks just for participating." icon={<Gift className="w-16 h-16 text-[#4A90E2]" />} ctaText="Sign Me Up" onCtaClick={handleNext}>
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#4A90E2] to-[#357ABD] p-6 text-white shadow-xl mb-4">
                  <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-10 rounded-full blur-xl"></div>
                  <div className="relative z-10 text-center">
                    <p className="text-blue-100 font-medium mb-1">Earn up to</p>
                    <h2 className="text-5xl font-bold mb-2">$60</h2>
                    <p className="text-blue-100">per month in rewards</p>
                  </div>
                </div>
                <div className="flex justify-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Easy setup
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Exclusive perks
                  </span>
                </div>
              </OnboardingSlide>}

            {/* Slide 5: Sign Up Form */}
            {currentSlide === 4 && <OnboardingSlide title="Let's Get Started" description="Create your account to begin your Nielsen journey." icon={<Tv className="w-16 h-16 text-[#4A90E2]" />} isLastSlide>
                <Card className="space-y-4 text-left">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="Jane Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="jane@example.com" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone
                      </label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="(555) 123-4567" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Zip Code
                      </label>
                      <input type="text" name="zip" value={formData.zip} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="12345" />
                    </div>
                  </div>
                  <Button onClick={onComplete} fullWidth className="mt-4">
                    Create Account
                  </Button>
                  <p className="text-xs text-gray-500 text-center mt-4">
                    By continuing, you agree to our Terms of Service and Privacy
                    Policy.
                  </p>
                </Card>
              </OnboardingSlide>}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>;
}