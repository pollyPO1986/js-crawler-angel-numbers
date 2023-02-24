const convertSecondsToDHMS = (second) => {
  const oneHourSecond = 3600;
  const oneDaySecond = oneHourSecond * 24;

  const days = Math.floor(second / oneDaySecond)
    .toString()
    .padStart(2, '0');
  const hours = Math.floor((second % oneDaySecond) / oneHourSecond)
    .toString()
    .padStart(2, '0');
  const minutes = Math.floor((second % oneHourSecond) / 60)
    .toString()
    .padStart(2, '0');
  const seconds = ((second % oneHourSecond) % 60).toString().padStart(2, '0');

  return `${days}:${hours}:${minutes}:${seconds}`;
};

const convertToDate = (date) => {
  const Y = `${date.getFullYear()}`;
  const M = `${date.getMonth() + 1}`.padStart(2, '0');
  const D = `${date.getDate()}`.padStart(2, '0');
  const h = `${date.getHours()}`.padStart(2, '0');
  const m = `${date.getMinutes()}`.padStart(2, '0');
  const s = `${date.getSeconds()}`.padStart(2, '0');
  const ms = `${date.getMilliseconds()}`.padStart(2, '0');

  return { Y, M, D, h, m, s, ms };
};

export { convertSecondsToDHMS, convertToDate };
