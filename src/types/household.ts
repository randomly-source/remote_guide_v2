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

// Extended types for full household profile
export type ReceptionType = 'OTA' | 'Cable' | 'DBS' | 'MA_TV' | 'SMA_TV' | 'MMDS' | 'Broadband';

export type InternetStatus = 'Internet Enabled' | 'Internet Capable, but not Enabled' | 'Not Internet Capable';

export type OSType = 'Android' | 'iOS/Apple' | 'Windows' | 'macOS' | 'Linux' | 'Other';

export type DeviceProvider = 'AT&T' | 'Verizon Wireless' | 'T-Mobile' | 'Sprint' | 'Other' | 'Home WiFi';

export interface SetTopBox {
  present: boolean;
  make?: string;
  hdCapable?: boolean;
  dvrCapable?: boolean;
}

export interface StreamingDevice {
  present: boolean;
  device?: string;
  internetEnabled?: boolean;
}

export interface GameSystem {
  present: boolean;
  device?: string;
}

export interface ConnectedDevice {
  setTopBox?: SetTopBox;
  streamingDevice?: StreamingDevice;
  gameSystem?: GameSystem;
  physicalConnections?: boolean; // Computer/tablet/phone via cable
  headphoneUsage?: {
    used: boolean;
    cutsOffSpeakers?: boolean;
    usedForStreaming?: boolean;
  };
}

export interface TVDetails {
  make?: string;
  isCombo?: boolean;
  hdCapable?: boolean;
  internetStatus?: InternetStatus;
}

export interface Site {
  id: string;
  label: string;
  metered: boolean;
  receptionTypes: ReceptionType[];
  tvDetails: TVDetails;
  connectedDevices: ConnectedDevice;
}

export interface HouseholdMember {
  id: string;
  name: string;
  age?: number;
  sex?: 'Male' | 'Female' | 'Other';
  primaryRoles?: string;
}

export interface PersonalDevice {
  id: string;
  shortName: string;
  type: 'Mobile Phone' | 'Tablet' | 'Computer';
  provider?: DeviceProvider;
  osType?: OSType;
  primaryUserId: string; // Reference to HouseholdMember id
  homeWifi?: boolean;
  make?: string;
  internetType?: string;
  workRelated?: boolean;
}

export interface ConsentInfo {
  householdAgreement: boolean;
  mappingAgreement: boolean;
  mappingMethod?: 'Panelist Mapping' | 'Other';
}

export interface HouseholdProfile {
  address: string;
  householdComposition: number; // Number of people
  totalTelevisions: number;
  members: HouseholdMember[];
  sites: Site[];
  personalDevices: PersonalDevice[];
  consent: ConsentInfo;
  primaryContact?: string;
}

