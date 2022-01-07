export const courseStartDate = '6 December 2021, 09:00'
// export const courseDays = 60
export const nonCourseDays = [
  new Date('20 December 2021, 09:00').toISOString(),
  new Date('21 December 2021, 09:00').toISOString(),
  new Date('22 December 2021, 09:00').toISOString(),
  new Date('23 December 2021, 09:00').toISOString(),
  new Date('24 December 2021, 09:00').toISOString(),
  new Date('27 December 2021, 09:00').toISOString(),
  new Date('28 December 2021, 09:00').toISOString(),
  new Date('29 December 2021, 09:00').toISOString(),
  new Date('30 December 2021, 09:00').toISOString(),
  new Date('31 December 2021, 09:00').toISOString()
]

export const addDateMethods = (bankHolidays) => {
  // updates a date to a day later & endOfDay
  Date.prototype.addDay = function(){
    const today = new Date(this.valueOf())
    const nextClassDay = (d) => {
      d.setDate(d.getDate() + 1)
      // Check if it's a bank holiday
      if (nonCourseDays.length && nonCourseDays.includes(d.toISOString())){
        console.log('Non Course Day', d.toString())
        return nextClassDay(d)
      } else if (bankHolidays.includes(d.toISOString())){
        console.log('Bank Holiday', d.toString())
        return nextClassDay(d)
      // Check if it's a weekend
      } else if (d.getDay() === 6 || d.getDay() === 0){
        console.log('Weekend', d.toString())
        return nextClassDay(d)
      // It's a class day
      } else {
        console.log('Class', d.toString())
        return d
      }
    }
    const ncd = nextClassDay(today)
    this.setDate(ncd.getDate())
    this.setMonth(ncd.getMonth())
    this.setYear(ncd.getFullYear())
  }

  Date.prototype.endOfDay = function(){
    const newDate = new Date(this.valueOf())
    newDate.setTime(newDate.getTime() + 8 * (1000 * 60 * 60))
    return newDate.toISOString()
  }
}