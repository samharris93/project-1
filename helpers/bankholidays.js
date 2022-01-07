export default async () => {
  try {
    const { data } = await axios.get('https://www.gov.uk/bank-holidays.json')
    const bankHolidays = data['england-and-wales'].events.map(e => new Date(e.date).toISOString())
    createCourseSchedule(courseStartDate, bankHolidays)
  } catch (err) {
    console.log('err', err)
  }
}