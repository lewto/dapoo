import { IRACING_API } from '../config/constants.js';
import { fetchFromAPI } from './api.js';
import { formatPosition, formatLapTime } from '../utils/formatters.js';

export async function searchResults(custId, startDate, endDate) {
  try {
    const searchParams = {
      cust_id: custId,
      start_range_begin: startDate?.toISOString() || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      start_range_end: endDate?.toISOString() || new Date().toISOString()
    };

    const searchData = await fetchFromAPI(IRACING_API.ENDPOINTS.RESULTS_SEARCH, searchParams);

    if (!searchData?.sessions?.length) {
      return [];
    }

    const detailedResults = await Promise.all(
      searchData.sessions.map(session => 
        fetchFromAPI(IRACING_API.ENDPOINTS.RESULTS_GET, { subsession_id: session.subsession_id })
      )
    );

    return transformResults(detailedResults);
  } catch (error) {
    console.error('Error fetching race results:', error);
    throw error;
  }
}

function transformResults(results) {
  return results
    .filter(result => result && result.session_results?.[0]?.finish_position !== undefined)
    .map(result => {
      const sessionResult = result.session_results[0];
      return {
        id: result.subsession_id.toString(),
        position: formatPosition(sessionResult.finish_position),
        trackName: result.track.track_name,
        date: new Date(result.start_time).toISOString(),
        lapTime: formatLapTime(sessionResult.best_lap_time),
        carName: result.car_class.name,
        seriesName: result.series.name,
        startPosition: sessionResult.starting_position,
        incidents: sessionResult.incidents,
        strengthOfField: result.strength_of_field,
        split: result.heat_info?.heat_number || 1
      };
    });
}