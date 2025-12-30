import React from 'react';
import { Card } from './ui/Card';
import { NanoMeterIcon, PowerSensorIcon, HubIcon, StreamingMeterIcon, RemoteIcon } from './icons/DeviceIcons';
export function EquipmentOverview() {
  return <div className="max-w-2xl mx-auto pb-6">
      <div className="text-center mb-6 sm:mb-8">
        <p className="text-sm sm:text-base text-gray-600 px-4">
          Your equipment is organized by room. Each box is clearly labeled so
          you know exactly where each piece goes.
        </p>
      </div>

      <div className="space-y-6 sm:space-y-8 pb-24">
        <section>
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h3 className="text-xs sm:text-sm font-semibold text-gray-400 uppercase tracking-wider">
              Living Room Box
            </h3>
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
              Required
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <Card className="flex flex-col items-center text-center p-3 sm:p-4">
              <NanoMeterIcon className="w-12 h-12 sm:w-16 sm:h-16 text-gray-700 mb-2" />
              <span className="text-xs sm:text-sm font-medium">Nano Meter</span>
              <span className="text-xs text-gray-500 mt-1">Detects audio</span>
            </Card>
            <Card className="flex flex-col items-center text-center p-3 sm:p-4">
              <RemoteIcon className="w-12 h-12 sm:w-16 sm:h-16 text-gray-700 mb-2" />
              <span className="text-xs sm:text-sm font-medium">Remote</span>
              <span className="text-xs text-gray-500 mt-1">Who's watching</span>
            </Card>
            <Card className="flex flex-col items-center text-center p-3 sm:p-4 col-span-2">
              <PowerSensorIcon className="w-12 h-12 sm:w-16 sm:h-16 text-gray-700 mb-2" />
              <span className="text-xs sm:text-sm font-medium">
                Power Sensor
              </span>
              <span className="text-xs text-gray-500 mt-1">
                TV on/off detection
              </span>
            </Card>
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h3 className="text-xs sm:text-sm font-semibold text-gray-400 uppercase tracking-wider">
              Bedroom Box
            </h3>
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full font-medium">
              Optional
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <Card className="flex flex-col items-center text-center p-3 sm:p-4">
              <NanoMeterIcon className="w-12 h-12 sm:w-16 sm:h-16 text-gray-700 mb-2" />
              <span className="text-xs sm:text-sm font-medium">Nano Meter</span>
            </Card>
            <Card className="flex flex-col items-center text-center p-3 sm:p-4">
              <RemoteIcon className="w-12 h-12 sm:w-16 sm:h-16 text-gray-700 mb-2" />
              <span className="text-xs sm:text-sm font-medium">Remote</span>
            </Card>
            <Card className="flex flex-col items-center text-center p-3 sm:p-4 col-span-2">
              <PowerSensorIcon className="w-12 h-12 sm:w-16 sm:h-16 text-gray-700 mb-2" />
              <span className="text-xs sm:text-sm font-medium">
                Power Sensor
              </span>
            </Card>
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h3 className="text-xs sm:text-sm font-semibold text-gray-400 uppercase tracking-wider">
              Central Devices
            </h3>
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
              Required
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <Card className="flex flex-col items-center text-center p-3 sm:p-4">
              <HubIcon className="w-12 h-12 sm:w-16 sm:h-16 text-gray-700 mb-2" />
              <span className="text-xs sm:text-sm font-medium">The Hub</span>
              <span className="text-xs text-gray-500 mt-1">
                Backup connection
              </span>
            </Card>
            <Card className="flex flex-col items-center text-center p-3 sm:p-4">
              <StreamingMeterIcon className="w-12 h-12 sm:w-16 sm:h-16 text-gray-700 mb-2" />
              <span className="text-xs sm:text-sm font-medium">
                Streaming Meter
              </span>
              <span className="text-xs text-gray-500 mt-1">WiFi router</span>
            </Card>
          </div>
        </section>
      </div>
    </div>;
}