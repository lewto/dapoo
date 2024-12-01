import { useState, useCallback } from 'react';
import { getMemberInfo, getRaceResults } from '../services/api';
import type { MemberData, RaceResult } from '../types';

export function useIRacing() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [memberData, setMemberData] = useState<MemberData | null>(null);
  const [raceResults, setRaceResults] = useState<RaceResult[]>([]);

  const fetchMemberData = useCallback(async (custId: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const member = await getMemberInfo(custId);
      setMemberData(member);

      const results = await getRaceResults(custId);
      setRaceResults(results);
    } catch (err: any) {
      setError(err?.message || 'Failed to fetch iRacing data');
      setMemberData(null);
      setRaceResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    memberData,
    raceResults,
    fetchMemberData
  };
}