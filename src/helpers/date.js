export function getCurrentDate() {
  const current = new Date();
  let month = current.getMonth()+1
  let date = current.getDate()
  const year = current.getFullYear()
    if(month < 10) {
      month = '0'+month;
    }
    if(date < 10) {
      date = '0'+date;
    }
  const today = `${year}-${month}-${date}`;
  return today;
}