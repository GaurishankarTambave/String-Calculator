import express, {Application,Request, Response} from 'express';
import os from 'os';
import bodyParser from 'body-parser';
import router from './api/calculator';

const app: Application =  express();

app.use(bodyParser.json());
app.use('/', router);

app.get('/', (req: Request, res: Response, next: any) => {
    const result: any = {
		name: 'api-v1-string-calculator',
		apiStartedAt: new Date(),
		host: os.hostname()
	};
	res.send(JSON.stringify(result));
});

const port: number = 3000;
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
