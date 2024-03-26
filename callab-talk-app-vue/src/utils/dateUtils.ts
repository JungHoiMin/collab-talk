export const dateTimeToString = (time: Date) => {
  const year = time.getFullYear();
  const month = time.getMonth() + 1;
  const date = time.getDate();
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const milliseconds = time.getMilliseconds();

  const strYear = `${year}`.padStart(4, "0");
  const strMonth = `${month}`.padStart(2, "0");
  const strDate = `${date}`.padStart(2, "0");
  const strHours = `${hours}`.padStart(2, "0");
  const strMinutes = `${minutes}`.padStart(2, "0");
  const strSeconds = `${seconds}`.padStart(2, "0");
  const strMilliseconds = `${milliseconds}`.padStart(3, "0");

  return `${strYear}-${strMonth}-${strDate} ${strHours}:${strMinutes}:${strSeconds}.${strMilliseconds}`;
};
