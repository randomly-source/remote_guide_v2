import React from 'react';
import { motion } from 'framer-motion';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Clock, Phone, CheckCircle, ArrowRight } from 'lucide-react';
import { usePhoneFrame } from './PhoneFrame';

interface WelcomeHeroProps {
  onStartSetup: () => void;
  userName?: string;
  prsName?: string;
  callDate?: string;
}

export function WelcomeHero({
  onStartSetup,
  userName = 'Roger',
  prsName = 'Sarah',
  callDate = 'Thursday, Jan 25'
}: WelcomeHeroProps) {
  const { isInFrame } = usePhoneFrame();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <Card className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-blue-200 overflow-hidden relative">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200/30 rounded-full -translate-y-16 translate-x-16" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-200/30 rounded-full translate-y-12 -translate-x-12" />

        <div className={`relative z-10 ${isInFrame ? 'p-3' : 'p-4 sm:p-6'}`}>
          {/* Welcome Message */}
          <div className={isInFrame ? 'mb-4' : 'mb-5'}>
            <h1 className={`${isInFrame ? 'text-xl' : 'text-xl sm:text-2xl'} font-bold text-gray-900 ${isInFrame ? 'mb-2' : 'mb-2 sm:mb-3'}`}>
              Hi {userName}, Welcome to the Nielsen Family
            </h1>
            <p className={`${isInFrame ? 'text-sm' : 'text-sm sm:text-base'} text-gray-700 leading-relaxed`}>
              Before your call with {prsName}, your Nielsen Representative, let's get some things sorted if you have 30 minutes.
            </p>
          </div>

          {/* What to Expect - 3 Step Timeline */}
          <div className={isInFrame ? 'mb-4' : 'mb-5'}>
            <h2 className={`${isInFrame ? 'text-base' : 'text-base sm:text-lg'} font-bold text-gray-900 ${isInFrame ? 'mb-3' : 'mb-3 sm:mb-4'}`}>
              Here's What to Expect
            </h2>
            
            <Card className="bg-white/80 backdrop-blur-sm border-blue-100">
              {/* Vertical layout for both mobile and phone frame - just adjust spacing */}
              <div className="relative">
                {/* Connecting Line - Vertical */}
                <div className={`absolute ${isInFrame ? 'left-[15px]' : 'left-[19px]'} top-2 bottom-2 w-0.5 bg-gradient-to-b from-blue-400 via-green-400 to-purple-400`}></div>

                <div className={`relative ${isInFrame ? 'space-y-3 py-2' : 'space-y-4 py-2'}`}>
                  {/* Stop 1: Today */}
                  <div className={`flex items-start ${isInFrame ? 'gap-2.5' : 'gap-3'}`}>
                    <div className={`relative z-10 ${isInFrame ? 'w-7 h-7' : 'w-8 h-8'} rounded-full bg-blue-500 flex items-center justify-center shrink-0 shadow-lg`}>
                      <Clock className={`${isInFrame ? 'w-3.5 h-3.5' : 'w-4 h-4'} text-white`} />
                    </div>
                    <div className="flex-1 pt-0.5">
                      <div className={`flex items-center ${isInFrame ? 'gap-1.5' : 'gap-2'} mb-1`}>
                        <h3 className={`font-bold text-gray-900 ${isInFrame ? 'text-xs' : 'text-xs'}`}>Today</h3>
                        <span className={`${isInFrame ? 'text-[10px]' : 'text-[10px]'} bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full font-medium`}>
                          ~30 min
                        </span>
                      </div>
                      <p className={`${isInFrame ? 'text-[11px]' : 'text-[11px]'} text-gray-700 leading-tight`}>
                        Complete equipment setup with our step-by-step guide
                      </p>
                    </div>
                  </div>

                  {/* Stop 2: Calibration Call */}
                  <div className={`flex items-start ${isInFrame ? 'gap-2.5' : 'gap-3'}`}>
                    <div className={`relative z-10 ${isInFrame ? 'w-7 h-7' : 'w-8 h-8'} rounded-full bg-green-500 flex items-center justify-center shrink-0 shadow-lg`}>
                      <Phone className={`${isInFrame ? 'w-3.5 h-3.5' : 'w-4 h-4'} text-white`} />
                    </div>
                    <div className="flex-1 pt-0.5">
                      <div className={`flex items-center ${isInFrame ? 'gap-1.5' : 'gap-2'} mb-1`}>
                        <h3 className={`font-bold text-gray-900 ${isInFrame ? 'text-xs' : 'text-xs'}`}>
                          Next: {callDate}
                        </h3>
                        <span className={`${isInFrame ? 'text-[10px]' : 'text-[10px]'} bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-medium`}>
                          Call
                        </span>
                      </div>
                      <p className={`${isInFrame ? 'text-[11px]' : 'text-[11px]'} text-gray-700 leading-tight`}>
                        Your Nielsen rep calls to calibrate and verify meters are reading correctly
                      </p>
                    </div>
                  </div>

                  {/* Stop 3: You're Live */}
                  <div className={`flex items-start ${isInFrame ? 'gap-2.5' : 'gap-3'}`}>
                    <div className={`relative z-10 ${isInFrame ? 'w-7 h-7' : 'w-8 h-8'} rounded-full bg-purple-500 flex items-center justify-center shrink-0 shadow-lg`}>
                      <CheckCircle className={`${isInFrame ? 'w-3.5 h-3.5' : 'w-4 h-4'} text-white`} />
                    </div>
                    <div className="flex-1 pt-0.5">
                      <div className={`flex items-center ${isInFrame ? 'gap-1.5' : 'gap-2'} mb-1`}>
                        <h3 className={`font-bold text-gray-900 ${isInFrame ? 'text-xs' : 'text-xs'}`}>
                          You're Live!
                        </h3>
                        <span className={`${isInFrame ? 'text-[10px]' : 'text-[10px]'} bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded-full font-medium`}>
                          Ongoing
                        </span>
                      </div>
                      <p className={`${isInFrame ? 'text-[11px]' : 'text-[11px]'} text-gray-700 leading-tight`}>
                        Watch TV normally, press your remote button, and earn monthly rewards
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* CTA Button */}
          <Button
            onClick={onStartSetup}
            fullWidth
            className={`${isInFrame ? 'h-10 text-sm' : 'h-11 sm:h-12 text-sm sm:text-base'} font-semibold shadow-lg`}
          >
            Let's Get Started
            <ArrowRight className={`${isInFrame ? 'w-4 h-4' : 'w-4 h-4 sm:w-5 sm:h-5'} ml-2`} />
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}

