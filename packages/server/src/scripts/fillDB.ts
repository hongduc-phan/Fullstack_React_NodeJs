import '../lib/env';
import { Spark } from 'src/models/spark';
import db from '../db/repository';

const MEMBER_COUNT = 1;
const SPARKS_PER_MEMBER = 30;
const SPARKS_ON_PER_SPARK = 5;

async function fillDB() {
	console.log('Filling DB ...');
	try {
		for (let i = 0; i < MEMBER_COUNT; i++) {
			const member = await db.member.create({
				membername: `testuser${i}`,
				email: `testuser${i}@testserver.com`,
				firstname: `Jhon${i}`,
				lastname: `Doe${i}`,
				birthdate: new Date('1990-04-20'),
				password: `testuserpassword${i}`
			});
			console.log(`User ${member.membername} is created.`);

			const updatedMemberProfile = await db.member.update({
				...member,
				birthdate: new Date('1990-04-20'),
				profilePictureUrl: 'https://unsplash.com/photos/MTZTGvDsHFY/download?force=true&w=640',
				coverImageUrl: 'https://unsplash.com/photos/zAjdgNXsMeg/download?force=true&w=640',
				aboutme: 'learning new stuff',
				languages: ['English'],
				places: ['Helsinki', 'Turku'],
				website: 'https://helsinki.fi',
				background: ['anthropology', 'art'],
				interests: ['behavior', 'beliefs'],
				knowtypes: ['aesthetic', 'anecdotal'],
				isFirstLogin: true
			});

			console.log(
				'Updated member profile with ignites and other profile data',
				JSON.stringify(updatedMemberProfile, null, 2)
			);

			for (let j = 0; j < SPARKS_PER_MEMBER; j++) {
				const spark: Spark = await db.spark.createSpark({
					title: `Test Spark ${j} for member ${member.membername}`,
					description: `Test Spark ${j} for member ${member.membername}`,
					body: `Test Spark ${j} for member ${member.membername}`,
					memberId: member.id
				});

				console.log(`Spark ${spark.id} is created.`);

				for (let k = 0; k < SPARKS_ON_PER_SPARK; k++) {
					const sparkon: Spark = await db.spark.createSparkOn({
						parentSparkId: spark.id,
						title: `Test SparkOn ${k} on Spark ${j} for member ${member.membername}`,
						description: `Test SparkOn ${k} on Spark ${spark.id} for member ${member.membername}`,
						body: `Test SparkOn ${k} on Spark ${spark.id} for member ${member.membername}`,
						memberId: member.id
					});
					console.log(`SparkOn ${sparkon.id} is created.`);
				}
			}
		}
	} catch (error) {
		console.log('Failed to fill the db', error);
	} finally {
		console.log('\n Successfully filled DB with spark, sparkons & member data \n');
		process.exit();
	}
}

fillDB();
