const {google} = require('googleapis');
const fs = require('fs');

const CALENDARS_PATH = 'calendars.json';

const CALENDARS = JSON.parse(fs.readFileSync(CALENDARS_PATH));

const MAX_EVENTS_COUNT = 50;

class CalendarApi {
    constructor(props) {
        let auth = props.auth;
        this.calendar = google.calendar({version: 'v3', auth});
    }

    //todo
    async getEvent(calendarId, eventId) {
        let x = "error";

        let calendarObject =
            {
                'calendarId': calendarId,
                'eventId': eventId,
            };

        await this.calendar.events.get(calendarObject).then(
            res => x = res.data,
            err => console.log(err),
        );

        console.log("getting event data");
        return x;
    }
}

module.exports = CalendarApi;