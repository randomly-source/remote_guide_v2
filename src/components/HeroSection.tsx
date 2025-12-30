import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
export function HeroSection() {
  return <motion.section initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.6
  }} className="relative overflow-hidden bg-gradient-to-br from-[#4A90E2] to-[#357ABD] rounded-3xl p-8 sm:p-10 text-white mb-6">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24" />

      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">
            You're Part of Something Bigger
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold mb-3 leading-tight">
          Your Voice Shapes the Future of TV
        </h1>

        <p className="text-lg sm:text-xl text-blue-50 leading-relaxed max-w-2xl">
          You're part of a select group representing millions of viewers. What
          you watch influences what gets made.
        </p>
      </div>
    </motion.section>;
}