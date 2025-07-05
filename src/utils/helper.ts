export function addHour(srcDate: Date, hour: number) {
  const destDate = new Date(srcDate);
  destDate.setTime(destDate.getTime() + hour * 60 * 60 * 1000);

  return destDate;
}
