/* eslint-disable camelcase */
import access from './helpers/access.js'
import schedule from './helpers/schedule.js'
import axios from 'axios'
import { courseStartDate, addDateMethods } from './helpers/dates.js'
import createEvent from './events/create.js'

const getBankHolidays = async (auth) => {
  try {
    const { data } = await axios.get('https://www.gov.uk/bank-holidays.json')
    const bankHolidays = data['england-and-wales'].events.map(e => new Date(e.date).toISOString())
    createCourseSchedule(courseStartDate, bankHolidays, auth)
  } catch (err) {
    console.log('err', err)
  }
}

const createCourseSchedule = (startDate, bankHolidays, auth) => {

  // Add date methods
  addDateMethods(bankHolidays)
  
  const d = new Date(startDate)

  const settings = {
    'reminders': {
      'useDefault': true
    }
  }
  
  schedule.forEach(day => {
    // Update settings
    if (day.summary === 'Project Week'){
      const date = d.toISOString().split('T')[0]
      day['start'] = { 'date': date }
      day['end'] = { 'date': date }
    } else {
      day['start'] = { 'dateTime': d.toISOString() }
      day['end'] = { 'dateTime': d.endOfDay() }
    }
    const dayToAdd = { ...day, ...settings }
    dayToAdd.start.timeZone = 'Europe/London'
    dayToAdd.end.timeZone = 'Europe/London'

    // Create event
    createEvent(dayToAdd, auth)
    
    // Increment day
    d.addDay()
  })
}

// Get access
access(getBankHolidays)