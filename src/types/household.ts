export interface RoomConfig {
  name: string; // e.g., "Living Room", "Bedroom"
  hasTV: boolean;
  hasStreaming?: boolean; // if streaming happens in this room
}

export interface HouseholdConfig {
  rooms: RoomConfig[];
  hasStreaming: boolean; // overall streaming capability
}

// Example/mock data - can be replaced with real data later
export const mockHouseholdConfig: HouseholdConfig = {
  rooms: [
    {
      name: "Living Room",
      hasTV: true,
      hasStreaming: true
    },
    {
      name: "Bedroom",
      hasTV: true
    }
  ],
  hasStreaming: true
};

