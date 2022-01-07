import { google }  from 'googleapis'
const calendar = google.calendar('v3')

export default (details, auth) => {
  calendar.events.insert({
    auth: auth,
    calendarId: 'primary',
    resource: details
  }, (err, event) => {
    if (err) {
      console.log('There was an error contacting the Calendar service: ' + err)
      return
    }
    console.log('Event created: %s', event.data.htmlLink)
  })
}