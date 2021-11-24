import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import 'express-async-errors';

import authRouter from './routes/authRouter.js';
import { sequelize } from './db/index.js';

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRouter);

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

}).catch();
app.listen(4000);