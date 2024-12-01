import { IRACING_API } from '../config/constants.js';
import { fetchFromAPI } from './api.js';
import { formatDate } from '../utils/formatters.js';

export async function getMemberInfo(custId) {
  try {
    const [memberData, careerStats] = await Promise.all([
      fetchFromAPI(IRACING_API.ENDPOINTS.MEMBER_INFO, { cust_id: custId }),
      fetchFromAPI(IRACING_API.ENDPOINTS.CAREER_STATS, { cust_id: custId })
    ]);

    if (!memberData) {
      throw new Error('Member not found');
    }

    return {
      custId,
      displayName: memberData.display_name,
      memberSince: formatDate(memberData.member_since),
      iRating: memberData.irating,
      licenseLevel: `${memberData.license_class} ${memberData.safety_rating.toFixed(2)}`,
      stats: {
        totalRaces: careerStats.total_races,
        wins: careerStats.wins,
        top5: careerStats.top5,
        podiums: careerStats.podiums,
        avgFinish: careerStats.avg_finish,
        lapsLed: careerStats.laps_led
      }
    };
  } catch (error) {
    console.error('Error fetching member info:', error);
    throw error;
  }
}