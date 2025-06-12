import edit from './edit'

const f = () => {
  const datetime = new Date();
  datetime.setHours(datetime.getHours() + 1);
  datetime.setMinutes(0);
  datetime.setSeconds(0);

  return edit("", datetime.toLocaleString("ja-JP"), 1);
}

export default f;

