import 'express-async-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';

import authRouter from './routes/authRouter.js';
import infoRouter from './routes/infoRouter.js';
import { sequelize } from './models/index.js';
import { config } from './config.js';
import { statusCode } from './utils/statusCode.js';
import { statusMessage } from './utils/statusMessage.js';
import { responseMessage } from './utils/responseMessage.js';

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRouter);
app.use('/info', infoRouter);

app.use((req, res, next) => {
	res.status(statusCode.BAD_REQUEST).json({ message: statusMessage.BAD_REQUEST+' '+responseMessage.NOT_FOUND });
});

app.use((error, req, res, next) => {
	console.error(error);
	res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: statusMessage.INTERNAL_SERVER_ERROR });
})
sequelize.sync().then(() => {
	console.log("connected DB & Server start");
	app.listen(config.port);
	/*
	sequelize.query("show processlist")
	.then(result => console.log(result))
	.catch(err => console.log(err))
	*/

}).catch(console.log);