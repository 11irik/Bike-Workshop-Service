const express = require('express');
const cors = require('cors');
const log4js = require('log4js')
log4js.configure({
    appenders: {
        console: { type: 'console' },
        file: { type: 'file', filename: 'request.log' }
    },
    categories: {
        file: { appenders: ['file'], level: 'info' },
        default: { appenders: ['console'], level: 'info' }
    }
});

const logger = log4js.getLogger('file')

const app = express();


app.use(express.json());
app.use(cors());
app.set('view engine', 'pug');
app.use(log4js.connectLogger(logger, { level: 'info' }));



app.use('/check', require('./routes/event.routes'));


const path = require('path');
const port = process.env.PORT || 5001;

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));

// app.get('/*', function (req, res) {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

app.listen(port, () => {
    // console.log('ss')
    // logger.info('server started on port: ' + port)
});


