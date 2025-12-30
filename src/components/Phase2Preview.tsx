import React from 'react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { Phone, CheckCircle, Wifi, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
export function Phase2Preview() {
  return <div className="max-w-2xl mx-auto text-center pb-12">
      <motion.div initial={{
      scale: 0.9,
      opacity: 0
    }} animate={{
      scale: 1,
      opacity: 1
    }} transition={{
      duration: 0.5
    }}>
        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5 sm:mb-6">
          <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-green-600" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-[#2D3748] mb-3 sm:mb-4 px-4">
          Phase 1 Complete!
        </h1>
        <p className="text-base sm:text-lg text-gray-600 mb-8 sm:mb-12 px-4">
          You've done the hard part. Now a Nielsen expert will help you cross
          the finish line.
        </p>

        <Card className="text-left mb-6 sm:mb-8 bg-blue-50 border-blue-100">
          <h3 className="font-bold text-[#2D3748] mb-3 sm:mb-4 flex items-center text-sm sm:text-base">
            <Phone className="w-5 h-5 mr-2 text-[#4A90E2] shrink-0" />
            What happens on the call?
          </h3>
          <ul className="space-y-3 sm:space-y-4">
            <li className="flex items-start gap-3">
              <div className="bg-white p-1.5 rounded-md shadow-sm text-[#4A90E2] shrink-0">
                <Wifi className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="font-medium text-gray-900 text-sm sm:text-base">
                  WiFi Configuration
                </span>
                <p className="text-xs sm:text-sm text-gray-500">
                  Connecting your meters securely
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="bg-white p-1.5 rounded-md shadow-sm text-[#4A90E2] shrink-0">
                <Settings className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="font-medium text-gray-900 text-sm sm:text-base">
                  Calibration
                </span>
                <p className="text-xs sm:text-sm text-gray-500">
                  Fine-tuning the sensors for your TV
                </p>
              </div>
            </li>
          </ul>
        </Card>

        <div className="space-y-3">
          <Button fullWidth className="text-base sm:text-lg py-4 min-h-[52px]">
            Schedule my call
          </Button>
          <Button variant="ghost" fullWidth className="min-h-[48px]">
            I'm ready now (Wait time: ~5 min)
          </Button>
        </div>
      </motion.div>
    </div>;
}