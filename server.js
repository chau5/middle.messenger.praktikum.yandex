import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.static('./dist'));

app.listen(process.env.PORT || PORT, function () {
    console.log(`Middle Messenger is up at http://localhost:${process.env.PORT || PORT}`);
});
