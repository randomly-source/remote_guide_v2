import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, ChevronRight } from 'lucide-react';
import { Card } from './ui/Card';
export function RewardCard() {
  const [isRevealed, setIsRevealed] = useState(false);
  return <Card onClick={() => setIsRevealed(!isRevealed)} className="bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200 cursor-pointer active:scale-[0.98] transition-transform">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
          <Gift className="w-7 h-7 text-white" />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-900 mb-1">Early-Bird Reward</h3>
          <p className="text-sm text-gray-600">
            {isRevealed ? 'Your $25 gift card is ready!' : 'Tap to unlock your thank you gift'}
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!isRevealed ? <motion.div key="chevron" initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }}>
              <ChevronRight className="w-6 h-6 text-amber-600" />
            </motion.div> : <motion.div key="amount" initial={{
          scale: 0.5,
          opacity: 0
        }} animate={{
          scale: 1,
          opacity: 1
        }} exit={{
          scale: 0.5,
          opacity: 0
        }} className="text-2xl font-bold text-amber-600">
              $25
            </motion.div>}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isRevealed && <motion.div initial={{
        height: 0,
        opacity: 0
      }} animate={{
        height: 'auto',
        opacity: 1
      }} exit={{
        height: 0,
        opacity: 0
      }} className="mt-4 pt-4 border-t border-amber-200">
            <p className="text-sm text-gray-700 leading-relaxed">
              Because you're taking the lead on setup, we've unlocked a $25 gift
              card for you. It'll be ready as soon as we complete the
              installation call!
            </p>
          </motion.div>}
      </AnimatePresence>
    </Card>;
}