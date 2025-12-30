import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
interface AppreciationMessageProps {
  milestoneCount: number;
}
const MESSAGES = [{
  text: 'We know this is taking up time, but we truly appreciate your effort',
  subtext: "You're doing great",
  icon: <Heart className="w-5 h-5" />
}, {
  text: 'Thank you for being so thorough with each step',
  subtext: 'Your attention to detail matters',
  icon: <Sparkles className="w-5 h-5" />
}, {
  text: 'Your patience means everything to us',
  subtext: 'Almost there!',
  icon: <Heart className="w-5 h-5" />
}, {
  text: "Going the extra mile - we see the care you're putting into this",
  subtext: 'Thank you',
  icon: <Sparkles className="w-5 h-5" />
}];
export function AppreciationMessage({
  milestoneCount
}: AppreciationMessageProps) {
  const message = MESSAGES[Math.min(milestoneCount - 1, MESSAGES.length - 1)];
  return <motion.div initial={{
    opacity: 0,
    y: 20,
    scale: 0.95
  }} animate={{
    opacity: 1,
    y: 0,
    scale: 1
  }} exit={{
    opacity: 0,
    y: -20,
    scale: 0.95
  }} transition={{
    duration: 0.5,
    ease: 'easeOut'
  }} className="max-w-2xl mx-auto mb-8">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-6 sm:p-8 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100/30 rounded-full -translate-y-16 translate-x-16" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-100/30 rounded-full translate-y-12 -translate-x-12" />

        <div className="relative z-10 flex items-start gap-4">
          <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-blue-500">
            {message.icon}
          </div>

          <div className="flex-1 pt-1">
            <p className="text-base sm:text-lg font-medium text-gray-800 leading-relaxed mb-1">
              {message.text}
            </p>
            <p className="text-sm text-blue-600 font-medium">
              {message.subtext}
            </p>
          </div>
        </div>
      </div>
    </motion.div>;
}