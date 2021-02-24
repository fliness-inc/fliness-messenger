export const formatDate = (time: Date) => {
  if (!(time instanceof Date) || Number.isNaN(time.getTime())) return;

  const hours = time.getHours() < 10 ? `0${time.getHours()}` : time.getHours();

  const minutes =
    time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes();

  const format = time.getHours() >= 12 ? 'PM' : 'AM';

  return `${hours}:${minutes} ${format}`;
};

export default formatDate;
