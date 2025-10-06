const express = require('express');
const app = express();
const homeHandler = require('./home');

app.get('/', homeHandler);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
