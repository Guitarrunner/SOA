import express from 'express';
import { Response } from 'express';
import cors from 'cors';
import spacesApp from './api/spaces';
import reservationsApp from './api/reservations';

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

mainApp.listen(port, () => console.log(`App listening on PORT ${port}`));
