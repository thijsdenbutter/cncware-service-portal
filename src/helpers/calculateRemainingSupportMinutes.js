export function calculateRemainingSupportMinutes(currentSupportMinutes, usedSeconds) {
    const usedMinutes = Math.ceil(usedSeconds / 60);
    return currentSupportMinutes - usedMinutes;
}