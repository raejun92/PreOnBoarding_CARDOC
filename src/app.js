import 'express-async-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';

import authRouter from './routes/authRouter.js';
import infoRouter from './routes/infoRouter.js';
import { sequelize } from './models/index.js';
import { config } from './config.js';

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRouter);
app.use('/info', infoRouter);

app.use((req, res, next) => {
	res.sendStatus(404);
});

app.use((error, req, res, next) => {
	console.error(error);
	res.sendStatus(500);
})
sequelize.sync().then(() => {

	/*
	sequelize.query("show processlist")
	.then(result => console.log(result))
	.catch(err => console.log(err))
	*/

}).catch(console.log);
app.listen(config.port);