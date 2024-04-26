function pad(number: number): string {
  let r = String(number);
  if (r.length === 1) {
    r = "0" + r;
  }
  return r;
}

const now = new Date();
const today = Date.parse(
  `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`,
);
export default today;
