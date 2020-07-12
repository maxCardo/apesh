const express = require('express')
const path = require('path');

const app = express()


//serve static assets in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        const file = path.join(__dirname + '/../client/build/index.html')
        res.sendFile(file);
    });
}


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is up on port ${port}`));

