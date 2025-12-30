import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Sparkles, Calendar, ArrowRight } from 'lucide-react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
interface ProgressBasedHeroProps {
  onContinueSetup: () => void;
}
export function ProgressBasedHero({
  onContinueSetup
}: ProgressBasedHeroProps) {
  const [completedMilestones, setCompletedMilestones] = useState<string[]>([]);
  const [hasProgress, setHasProgress] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem('nielsen-setup-progress');
    if (saved) {
      const milestones = JSON.parse(saved);
      setCompletedMilestones(milestones);
      setHasProgress(milestones.length > 0);
    }
  }, []);
  const totalRequired = 4;
  const progress = completedMilestones.length;
  const isComplete = progress >= totalRequired;
  const progressPercent = Math.round(progress / totalRequired * 100);
  // If no progress, return null (show default carousel)
  if (!hasProgress) {
    return null;
  }
  // Completed state
  if (isComplete) {
    return <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} className="mb-8">
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 overflow-hidden relative">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-200/30 rounded-full -translate-y-16 translate-x-16" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-green-200/30 rounded-full translate-y-12 -translate-x-12" />

          <div className="relative z-10 p-6 sm:p-8">
            {/* Success Badge */}
            <motion.div initial={{
            scale: 0
          }} animate={{
            scale: 1
          }} transition={{
            delay: 0.2,
            type: 'spring',
            stiffness: 200
          }} className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-full mb-4">
              <CheckCircle2 className="w-5 h-5" />
              <span className="text-sm font-bold">Setup Complete!</span>
            </motion.div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Amazing Work! 🎉
            </h1>

            {/* Personal message */}
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6">
              Your Nielsen rep respects your effort and can't wait to talk with
              you during your calibration call. You're all set for the next
              step!
            </p>

            {/* Next step card */}
            <div className="bg-white rounded-xl p-4 border border-green-200">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
                  <Calendar className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-sm mb-1">
                    What's Next?
                  </h3>
                  <p className="text-xs text-gray-600">
                    Your Nielsen specialist will call you soon to verify
                    everything is working perfectly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>;
  }
  // In-progress state
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} className="mb-8">
      <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200 overflow-hidden relative">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200/30 rounded-full -translate-y-16 translate-x-16" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-200/30 rounded-full translate-y-12 -translate-x-12" />

        <div className="relative z-10 p-6 sm:p-8">
          {/* Progress Badge */}
          <motion.div initial={{
          scale: 0
        }} animate={{
          scale: 1
        }} transition={{
          delay: 0.2,
          type: 'spring',
          stiffness: 200
        }} className="inline-flex items-center gap-2 bg-[#4A90E2] text-white px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-5 h-5" />
            <span className="text-sm font-bold">
              {progressPercent}% Complete
            </span>
          </motion.div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            You're Doing Great! Keep Going 💪
          </h1>

          {/* Encouraging message */}
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6">
            Pick up where you left off. Let's finish this before your
            calibration call—you're almost there!
          </p>

          {/* Progress bar */}
          <div className="bg-white/60 rounded-full h-3 overflow-hidden mb-4">
            <motion.div initial={{
            width: 0
          }} animate={{
            width: `${progressPercent}%`
          }} transition={{
            delay: 0.5,
            duration: 0.8,
            ease: 'easeOut'
          }} className="bg-gradient-to-r from-[#4A90E2] to-[#6FCF97] h-full rounded-full" />
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between text-sm mb-6">
            <span className="text-gray-600 font-medium">
              {progress} of {totalRequired} tasks complete
            </span>
            <span className="text-[#4A90E2] font-bold">
              {totalRequired - progress} remaining
            </span>
          </div>

          {/* CTA Button */}
          <Button onClick={onContinueSetup} fullWidth className="h-12 text-base font-semibold">
            Continue Setup
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </Card>
    </motion.div>;
}