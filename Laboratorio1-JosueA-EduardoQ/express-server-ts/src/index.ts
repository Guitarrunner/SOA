import express from 'express';
import { Response } from 'express';
import cors from 'cors';
import spacesApp from './api/spaces';
import reservationsApp from './api/reservations';

const https = require('https');
const path = require('path');
const fs = require('fs');
const mainApp = express();

const port = process.env.PORT || 3000;

mainApp.get('/', (req, res) => {
    res.send('Hello from express and typescript');
});

mainApp.use(
    express.json({
        verify: (_, res: Response, buf, __) => {
            try {
                JSON.parse(buf.toString());
            } catch (e) {
                res.status(405).send('ko');
                throw Error('invalid JSON');
            }
        }
    })
);
mainApp.use(cors());

mainApp.use('/spaces', spacesApp);
mainApp.use('/reservations', reservationsApp);

const sslApp = https.createServer({
    key : fs.readFileSync(path.join(__dirname, 'cert','key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert','cert.pem')),
}, mainApp)

sslApp.listen(port, () => console.log(`App listening on PORT ${port}`));
