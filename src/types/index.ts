export interface MemberData {
  custId: string;
  displayName: string;
  memberSince: string;
  iRating: number;
  licenseLevel: string;
}

export interface RaceResult {
  id: string;
  position: string;
  trackName: string;
  date: string;
  lapTime: string;
  carName: string;
  seriesName: string;
}

export interface CareerStats {
  wins: number;
  top5: number;
  top10: number;
  totalRaces: number;
  avgFinish: number;
  avgStart: number;
  avgIncidents: number;
  lapsLed: number;
  winPercentage: number;
}

export interface Certificate {
  position: string;
  driverName: string;
  trackName: string;
  date: string;
  lapTime?: string;
  carName?: string;
  split?: string;
  startPosition?: string;
  fastestLap?: boolean;
  incidentPoints?: number;
  seriesName?: string;
  achievement?: string;
}