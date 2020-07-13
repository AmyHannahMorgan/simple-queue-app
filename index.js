const FS = require('fs').promises;
const EXPRESS = require('express');
const APP = EXPRESS();
const PORT = process.argv[2] || 3000

APP.use(EXPRESS.static('./static'));

APP.get('/api/getqueue', (req, res) => {
    res.send('this endpoint is not implimented yet');
});

APP.post('/api/addtoqueue', (req, res) => {
    res.send('this endpoint is not implimented yet');
});

APP.delete('/api/removefromqueue', (req, res) => {
    res.send('this endpoint is not implimented yet');
});

APP.listen(PORT);