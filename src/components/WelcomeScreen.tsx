import React from 'react';
import { Button } from './ui/Button';
import { motion } from 'framer-motion';
interface WelcomeScreenProps {
  onStart: () => void;
}
export function WelcomeScreen({
  onStart
}: WelcomeScreenProps) {
  return <div className="flex flex-col min-h-[calc(100vh-120px)] justify-center text-center">
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.6
    }} className="space-y-6 sm:space-y-8 max-w-md mx-auto">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#4A90E2] rounded-2xl mx-auto flex items-center justify-center mb-6 sm:mb-8 shadow-lg shadow-blue-100">
          <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#2D3748] mb-3 sm:mb-4 tracking-tight px-4">
            Welcome to the Nielsen Family
          </h1>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed px-4">
            You're helping shape what America watches. Thank you for being part
            of something bigger.
          </p>
        </div>

        <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-gray-100 text-left">
          <h3 className="font-semibold text-[#2D3748] mb-2 flex items-center text-sm sm:text-base">
            <svg className="w-5 h-5 text-[#4A90E2] mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Privacy First
          </h3>
          <p className="text-sm text-gray-500 leading-relaxed">
            Your privacy matters. We measure what you watch, not who you are.
            All data is aggregated and anonymized.
          </p>
        </div>

        <div className="pt-6 sm:pt-8">
          <Button onClick={onStart} fullWidth className="text-base sm:text-lg py-4 min-h-[52px]">
            Let's get started
          </Button>
        </div>
      </motion.div>
    </div>;
}