import DatabaseRepository from 'src/db/repository/interfaces/database';
import context from '../context';
import sparkmap from './impl/sparkmap';
import member from './impl/member';
import spark from './impl/spark';
import memberprofile from './impl/memberprofile';
import ignite from './impl/ignite';
import registration from './impl/registration';
import resetPassword from './impl/resetPassword';
import search from './impl/search';

const db: DatabaseRepository = {
	context,
	sparkmap,
	member,
	spark,
	memberprofile,
	ignite,
	registration,
	resetPassword,
	search
};

export default db;
