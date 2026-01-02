import React, { useState } from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Package, Tv, Wifi, ChevronDown, X } from 'lucide-react';
import { HouseholdConfig } from '../types/household';
import { getBoxOrganization } from '../utils/boxOrganization';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  NanoMeterIcon, 
  RemoteIcon, 
  PowerSensorIcon, 
  HubIcon, 
  StreamingMeterIcon 
} from './icons/DeviceIcons';

interface BoxPreviewCardProps {
  householdConfig: HouseholdConfig;
}

// Meter descriptions mapping
const meterDescriptions: Record<string, string> = {
  'Nano Meter': 'Detects audio',
  'Remote': "Who's watching",
  'Power Sensor': 'TV on/off detection',
  'The Hub': 'Backup connection',
  'Streaming Meter': 'WiFi router'
};

// Meter icon mapping
const meterIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'Nano Meter': NanoMeterIcon,
  'Remote': RemoteIcon,
  'Power Sensor': PowerSensorIcon,
  'The Hub': HubIcon,
  'Streaming Meter': StreamingMeterIcon
};

export function BoxPreviewCard({
  householdConfig
}: BoxPreviewCardProps) {
  const boxes = getBoxOrganization(householdConfig);
  const roomsWithTVs = householdConfig.rooms.filter(room => room.hasTV);
  const [showBoxModal, setShowBoxModal] = useState(false);
  const [expandedBoxes, setExpandedBoxes] = useState<Set<number>>(new Set());

  const toggleBox = (index: number) => {
    setExpandedBoxes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-4"
    >
      <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-100">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-[#4A90E2] flex items-center justify-center shrink-0">
            <Package className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 mb-4">
              You should receive a shipment from Nielsen
            </h3>
          </div>
        </div>

        {/* Section 1: Here's what you told us */}
        <div className="mb-4 pb-4 border-b border-gray-200">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">
            Here's what you told us
          </h4>
          <div className="flex flex-wrap gap-2 mb-2">
            {roomsWithTVs.map((room, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium"
              >
                <Tv className="w-3.5 h-3.5" />
                {room.name}
              </span>
            ))}
            {householdConfig.hasStreaming && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                <Wifi className="w-3.5 h-3.5" />
                Streaming
              </span>
            )}
          </div>
        </div>

        {/* Section 2: CTA Button */}
        <div className="mb-0">
          <Button
            onClick={() => setShowBoxModal(true)}
            fullWidth
            className="h-12 text-base font-semibold"
          >
            Check my box
          </Button>
        </div>
      </Card>

      {/* Box Organization Modal */}
      <AnimatePresence>
        {showBoxModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
            onClick={() => setShowBoxModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30
              }}
              className="bg-[#F5F3F0] w-full sm:max-w-3xl sm:rounded-3xl rounded-t-3xl max-h-[90vh] flex flex-col shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex-shrink-0 bg-white border-b border-gray-200 px-4 sm:px-6 py-4 flex items-center justify-between rounded-t-3xl">
                <h2 className="text-xl font-bold text-gray-900">
                  Here's how we have organised your meters
                </h2>
                <button
                  onClick={() => setShowBoxModal(false)}
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 active:scale-95 transition-all"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Modal Content - Scrollable */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                <div className="space-y-2">
                  {boxes.map((box, idx) => {
                    const isExpanded = expandedBoxes.has(idx);
                    return (
                      <div
                        key={idx}
                        className="bg-white rounded-lg border border-gray-200 overflow-hidden"
                      >
                        <button
                          onClick={() => toggleBox(idx)}
                          className="w-full flex items-start gap-2 p-2 hover:bg-gray-50 transition-colors"
                        >
                          <div className="w-6 h-6 rounded bg-gray-100 flex items-center justify-center shrink-0 mt-0.5">
                            <Package className="w-3.5 h-3.5 text-gray-600" />
                          </div>
                          <div className="flex-1 min-w-0 text-left">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-bold text-gray-900">
                                {box.label}
                              </span>
                              {box.type === 'room' && (
                                <span className="text-[10px] bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded font-medium">
                                  Room Box
                                </span>
                              )}
                            </div>
                            {!isExpanded && (
                              <p className="text-xs text-gray-600">
                                {box.contents.join(', ')}
                              </p>
                            )}
                          </div>
                          <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="shrink-0 mt-0.5"
                          >
                            <ChevronDown className="w-4 h-4 text-gray-500" />
                          </motion.div>
                        </button>
                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="px-2 pb-2 pt-2">
                                {/* Horizontal scrolling container */}
                                <div
                                  className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
                                  style={{
                                    WebkitOverflowScrolling: 'touch',
                                    scrollBehavior: 'smooth',
                                    touchAction: 'pan-x'
                                  }}
                                >
                                  <div className="flex gap-2 pb-2" style={{ minWidth: 'max-content' }}>
                                    {box.contents.map((content, contentIdx) => {
                                      const IconComponent = meterIcons[content];
                                      return (
                                        <Card
                                          key={contentIdx}
                                          className="flex flex-col items-center justify-center p-3 min-w-[80px] shrink-0 bg-white border border-gray-200"
                                        >
                                          <div className="w-12 h-12 mb-2 flex items-center justify-center text-gray-700">
                                            {IconComponent ? (
                                              <IconComponent className="w-12 h-12" />
                                            ) : (
                                              <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                                                <Package className="w-6 h-6 text-gray-400" />
                                              </div>
                                            )}
                                          </div>
                                          <span className="text-[10px] font-medium text-gray-900 text-center leading-tight mb-1">
                                            {content}
                                          </span>
                                          {meterDescriptions[content] && (
                                            <span className="text-[9px] text-gray-600 text-center leading-tight">
                                              {meterDescriptions[content]}
                                            </span>
                                          )}
                                        </Card>
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Sticky CTA */}
              <div className="flex-shrink-0 p-4 bg-white border-t border-gray-200">
                <Button
                  onClick={() => setShowBoxModal(false)}
                  fullWidth
                  className="h-12 text-base font-semibold"
                >
                  Got it, close
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

