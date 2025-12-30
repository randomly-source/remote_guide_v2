import React from 'react';
import { Card } from './ui/Card';
import { motion } from 'framer-motion';
import { Award, Users, TrendingUp, Shield } from 'lucide-react';
export function TrustSection() {
  return <div className="mb-12">
      {/* Header */}
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          Why Nielsen?
        </h2>
        <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
          For over 100 years, Nielsen has been the trusted voice of media
          measurement. Your participation helps shape the future of
          entertainment.
        </p>
      </motion.div>

      {/* Trust Stats */}
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      delay: 0.1
    }} className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <Card className="text-center p-4">
          <Award className="w-8 h-8 text-[#4A90E2] mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">100+</p>
          <p className="text-xs text-gray-600 mt-1">Years trusted</p>
        </Card>

        <Card className="text-center p-4">
          <Users className="w-8 h-8 text-green-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">42K+</p>
          <p className="text-xs text-gray-600 mt-1">US households</p>
        </Card>

        <Card className="text-center p-4">
          <TrendingUp className="w-8 h-8 text-purple-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">Top</p>
          <p className="text-xs text-gray-600 mt-1">Networks rely on us</p>
        </Card>

        <Card className="text-center p-4">
          <Shield className="w-8 h-8 text-amber-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">100%</p>
          <p className="text-xs text-gray-600 mt-1">Privacy protected</p>
        </Card>
      </motion.div>

      {/* Value Proposition */}
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      delay: 0.2
    }}>
        <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-100">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#4A90E2] flex items-center justify-center shrink-0">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 mb-2">
                Your Voice Matters
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Networks, advertisers, and content creators use Nielsen data to
                decide what shows to make, what to renew, and where to invest.
                Your viewing habits directly influence the entertainment
                industry.
              </p>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>;
}