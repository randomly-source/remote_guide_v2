import React from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { motion } from 'framer-motion';
import { Clock, CheckCircle, Calendar, ArrowRight, Zap } from 'lucide-react';
interface WhatToExpectProps {
  onStartSetup: () => void;
}
export function WhatToExpect({
  onStartSetup
}: WhatToExpectProps) {
  return <div className="mb-8">
      {/* Header */}
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          What to Expect
        </h2>
        <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
          Here's your journey from setup to becoming an active Nielsen household
        </p>
      </motion.div>

      {/* Timeline */}
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      delay: 0.1
    }} className="space-y-4 mb-8">
        {/* Today */}
        <Card className="border-l-4 border-l-blue-500">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-gray-900">
                  Today: Setup (~30 minutes)
                </h3>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                Install your equipment following simple step-by-step
                instructions. We'll guide you through placing each device.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                  Living Room TV
                </span>
                <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                  Hub Connection
                </span>
                <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                  Streaming Meter
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Week 1 */}
        <Card className="border-l-4 border-l-green-500">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 mb-1">
                Week 1: You're Live!
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                Your equipment starts collecting viewing data automatically.
                Just watch TV as you normally would and use the People Meter
                remote to log who's watching.
              </p>
              <div className="bg-green-50 rounded-lg p-3 mt-2">
                <p className="text-xs text-green-800 font-medium">
                  💡 Tip: Press your button on the remote when you start
                  watching. That's it!
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Ongoing */}
        <Card className="border-l-4 border-l-purple-500">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5 text-purple-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 mb-1">
                Ongoing: Earn Rewards
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                Keep your equipment running and use your remote. We'll send
                monthly incentives and occasional surveys to learn more about
                your viewing preferences.
              </p>
              <div className="flex items-center gap-2 text-sm text-purple-700 font-medium">
                <Zap className="w-4 h-4" />
                <span>Monthly rewards + bonus opportunities</span>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Your Responsibilities */}
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      delay: 0.2
    }} className="mb-8">
        <Card className="bg-amber-50 border-amber-200">
          <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
            <span className="text-xl">✓</span>
            Your Simple Responsibilities
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>Keep equipment plugged in and powered on</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                Press your button on the People Meter remote when watching TV
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>Respond to occasional surveys (2-3 per month)</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>Contact us if you have any technical issues</span>
            </li>
          </ul>
        </Card>
      </motion.div>

      {/* CTA */}
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      delay: 0.3
    }} className="text-center">
        <Button onClick={onStartSetup} fullWidth className="h-14 text-lg font-semibold shadow-lg max-w-md mx-auto">
          Ready? Let's Set Up Your Equipment
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
        <p className="text-xs text-gray-500 mt-3">
          Takes about 30 minutes • You can pause and resume anytime
        </p>
      </motion.div>
    </div>;
}