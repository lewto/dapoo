export const IRACING_API = {
  BASE_URL: 'https://members-ng.iracing.com/data',
  ENDPOINTS: {
    MEMBER_INFO: '/member/get',
    CAREER_STATS: '/stats/member_career',
    RECENT_RACES: '/stats/member_recent_races',
    YEARLY_STATS: '/stats/member_yearly'
  }
};

export const CACHE_CONFIG = {
  TTL: 3600, // 1 hour
  CHECK_PERIOD: 600 // 10 minutes
};