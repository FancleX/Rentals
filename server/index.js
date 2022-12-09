const { ServerApiVersion } = require('mongodb');
const mongoose = require("mongoose");

require('dotenv').config({ path: `${__dirname}/.env` });
const app = require('./app');
const PORT = process.env.PORT || 3001;
const uri = process.env.DB_URL;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })
    .then(() => console.log('Connected to remote database'))
    .catch((error) => console.log(error));



app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});