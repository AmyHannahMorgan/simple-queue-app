const FS = require('fs').promises;
const EXPRESS = require('express');
const APP = EXPRESS();
const PORT = process.argv[2] || 3000

APP.use(EXPRESS.static('./static'));

APP.listen(PORT);