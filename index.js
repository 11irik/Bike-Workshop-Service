const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());
app.set('view engine', 'pug');


app.use('/check', require('./routes/event.routes'));


const path = require('path');
const port = process.env.PORT || 5001;

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));

// app.get('/*', function (req, res) {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

app.listen(port, () => {
    console.log('server started on port: ' + port);
});


