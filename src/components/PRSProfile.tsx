import React from 'react';
import { Card } from './ui/Card';
import { Phone, Calendar, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
interface PRSProfileProps {
  name?: string;
  yearsAtNielsen?: number;
  funFact?: string;
  callDate?: string;
  callTime?: string;
}
export function PRSProfile({
  name = 'Sarah Mitchell',
  yearsAtNielsen = 5,
  funFact = 'Loves 90s sitcoms and has seen every episode of Friends twice!',
  callDate = 'Thursday, Jan 25',
  callTime = '2:00 PM - 3:00 PM'
}: PRSProfileProps) {
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    delay: 0.2
  }}>
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100">
        <div className="flex items-start gap-4 mb-4">
          {/* Avatar */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold text-2xl shrink-0 shadow-lg">
            {name.split(' ').map(n => n[0]).join('')}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-900 text-lg mb-1">{name}</h3>
            <p className="text-sm text-gray-600 mb-2">
              Your Nielsen Specialist • {yearsAtNielsen} years with Nielsen
            </p>
            <div className="flex items-center gap-2 text-xs text-indigo-700 bg-indigo-100 rounded-lg px-3 py-1.5 w-fit">
              <Heart className="w-3.5 h-3.5" />
              <span>{funFact}</span>
            </div>
          </div>
        </div>

        <div className="space-y-3 pt-4 border-t border-blue-200">
          <div className="flex items-center gap-3 text-sm">
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-blue-600">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Scheduled Call</p>
              <p className="text-gray-600">{callDate}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-blue-600">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Time Window</p>
              <p className="text-gray-600">{callTime}</p>
            </div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-white/60 rounded-xl">
          <p className="text-xs text-gray-600 leading-relaxed">
            <strong className="text-gray-900">You're in good hands.</strong>{' '}
            {name} will walk you through the final WiFi setup and calibration.
            It usually takes about 15 minutes.
          </p>
        </div>
      </Card>
    </motion.div>;
}