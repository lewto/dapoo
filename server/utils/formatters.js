export function formatPosition(position) {
  if (position === 1) return '1st Place';
  if (position === 2) return '2nd Place';
  if (position === 3) return '3rd Place';
  return `${position}th Place`;
}

export function formatLapTime(time) {
  if (!time || time === 0) return '--:--.---';
  const minutes = Math.floor(time / 60);
  const seconds = (time % 60).toFixed(3);
  return `${minutes}:${seconds.padStart(6, '0')}`;
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString();
}