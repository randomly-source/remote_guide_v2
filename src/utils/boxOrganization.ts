import { HouseholdConfig, RoomConfig } from '../types/household';

export interface BoxConfig {
  label: string;
  type: 'room' | 'hub' | 'streaming';
  contents: string[];
  roomName?: string; // Only for room boxes
}

/**
 * Determines box organization based on household configuration
 * Rules:
 * - For each room with TV: One box labeled with room name (contains: nano, remote, power sensor)
 * - Hub: Always separate box (one per house)
 * - Streaming Meter: Separate box if streaming exists (one per house)
 */
export function getBoxOrganization(config: HouseholdConfig): BoxConfig[] {
  const boxes: BoxConfig[] = [];

  // Add room boxes for each room with TV
  config.rooms.forEach((room) => {
    if (room.hasTV) {
      boxes.push({
        label: room.name,
        type: 'room',
        roomName: room.name,
        contents: ['Nano Meter', 'Remote', 'Power Sensor']
      });
    }
  });

  // Always add Hub box (one per house)
  boxes.push({
    label: 'Hub',
    type: 'hub',
    contents: ['The Hub']
  });

  // Add Streaming Meter box if streaming exists (one per house)
  if (config.hasStreaming) {
    boxes.push({
      label: 'Streaming Meter',
      type: 'streaming',
      contents: ['Streaming Meter']
    });
  }

  return boxes;
}

