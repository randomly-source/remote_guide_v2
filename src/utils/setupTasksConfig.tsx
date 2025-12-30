import React, { Component } from 'react';
import { NanoMeterIcon, RemoteIcon, PowerSensorIcon, HubIcon, StreamingMeterIcon, TVIcon, RouterIcon } from '../components/icons/DeviceIcons';
import setupTasksData from '../config/setupTasks.json';
// Type definitions
export type MilestoneId = 'living-room' | 'hub' | 'streaming' | 'bedroom' | 'validate-setup';
export interface StepConfig {
  id: string;
  title: string;
  description: string;
  illustrationType: string;
  tip?: string;
}
export interface MilestoneConfig {
  id: MilestoneId;
  title: string;
  subtitle: string;
  iconType: string;
  required: boolean;
  steps: StepConfig[];
}
export interface SetupTasksConfig {
  milestones: MilestoneConfig[];
}
// Icon mapping function
export function getIcon(iconType: string, className?: string): React.ReactNode {
  const iconMap: Record<string, ComponentType<{
    className?: string;
  }>> = {
    tv: TVIcon,
    hub: HubIcon,
    'streaming-meter': StreamingMeterIcon,
    'nano-meter': NanoMeterIcon,
    remote: RemoteIcon,
    'power-sensor': PowerSensorIcon,
    router: RouterIcon
  };
  const IconComponent = iconMap[iconType];
  return IconComponent ? <IconComponent className={className} /> : null;
}
// Illustration mapping function
export function getIllustration(illustrationType: string): React.ReactNode {
  switch (illustrationType) {
    case 'box':
      return <div className="border-2 border-dashed border-gray-400 w-32 h-24 rounded-lg flex items-center justify-center text-gray-400 font-bold">
          BOX
        </div>;
    case 'nano-meter-tv':
      return <div className="flex items-end gap-2">
          <NanoMeterIcon className="w-20 h-20" />
          <TVIcon className="w-32 h-32 opacity-50" />
        </div>;
    case 'power-sensor':
      return <PowerSensorIcon className="w-32 h-32" />;
    case 'remote':
      return <RemoteIcon className="w-24 h-24" />;
    case 'hub':
      return <HubIcon className="w-32 h-32" />;
    case 'hub-animated':
      return <HubIcon className="w-32 h-32 animate-pulse" />;
    case 'streaming-meter-router':
      return <div className="flex items-end gap-4">
          <StreamingMeterIcon className="w-24 h-24" />
          <RouterIcon className="w-24 h-24 opacity-50" />
        </div>;
    case 'streaming-meter-connected':
      return <div className="flex items-center gap-0">
          <StreamingMeterIcon className="w-20 h-20" />
          <div className="h-2 w-10 bg-gray-800" />
          <RouterIcon className="w-20 h-20" />
        </div>;
    case 'streaming-meter':
      return <StreamingMeterIcon className="w-32 h-32" />;
    case 'nano-meter':
      return <NanoMeterIcon className="w-32 h-32" />;
    default:
      return null;
  }
}
// Load and export the configuration
export const setupTasksConfig: SetupTasksConfig = setupTasksData as SetupTasksConfig;
// Helper function to get milestone by ID
export function getMilestoneById(id: MilestoneId): MilestoneConfig | undefined {
  return setupTasksConfig.milestones.find(m => m.id === id);
}
// Helper function to get all milestone IDs in order
export function getMilestoneOrder(): MilestoneId[] {
  return setupTasksConfig.milestones.map(m => m.id);
}