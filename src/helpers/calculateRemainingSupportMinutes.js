export function calculateRemainingSupportMinutes(currentSupportMinutes, usedSeconds) {
    const usedMinutes = usedSeconds / 60;
    return currentSupportMinutes - usedMinutes;
}