const {Router} = require('express');
const router = Router();
const getAuthenticatedClient = require('../modules/utils/authentication');
const CalendarApi = require('../modules/calendar/СalendarApi');
const firebaseClient = require('../modules/utils/firebaseClient');

let calendarApi;

getAuthenticatedClient().then(auth => {
    calendarApi = new CalendarApi(auth = {auth});
});

const MILLISECONDS_PER_HOUR = 1000 * 60 * 60;


router.get('/:eventId', (req, res) => {
    try {
        firebaseClient.getEvent(req.params.eventId).then(doc => {
            console.log("firebase id request");

            try {
                let now = new Date();
                calendarApi.getEvent(doc.calendarId, doc.eventId).then(event => {
                    let status = doc.status;
                    let approximateDate = new Date(doc.end);
                    let finalDate = new Date(doc.finalEnd);
                    let description = event.description;
                    let eventEndDate = new Date(event.end.dateTime);
                    let options = {
                        weekday: 'long',
                        hour: '2-digit',
                        minute: '2-digit',
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                    };

                    if (status) {
                        let hours = getHours(finalDate, approximateDate);

                        if (hours > 1) {
                            res.render('delay', {
                                status: status,
                                firstDate: approximateDate.toLocaleDateString('ru-ru', options),
                                secondDate: finalDate.toLocaleDateString('ru-ru', options),
                                description: description
                            })
                        } else {
                            res.render('index', {
                                status: status,
                                date: finalDate.toLocaleDateString('ru-ru', options),
                                description: description
                            })
                        }
                    } else {
                        let hours = getHours(now, approximateDate);

                        if (hours > 1) {

                            let newDate;
                            if (eventEndDate - approximateDate !== 0) {
                                newDate = new Date(eventEndDate);
                                newDate = newDate.toLocaleDateString('ru-ru', options)
                            }
                            res.render('delay', {
                                status: status,
                                firstDate: approximateDate.toLocaleDateString('ru-ru', options),
                                secondDate: newDate,
                                description: description
                            })
                        } else {
                            res.render('index', {
                                status: status,
                                date: eventEndDate.toLocaleDateString('ru-ru', options),
                                description: description
                            })
                        }
                    }


                });
            } catch (e) {
                console.log(e);
                res.status(404).json({message: 'Not found'});
            }
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({message: 'Server error'});
    }
});


function getHours(firstDate, secondDate) {
    let millisBetween = firstDate.getTime() - secondDate.getTime();
    return millisBetween / MILLISECONDS_PER_HOUR;
}

module.exports = router;