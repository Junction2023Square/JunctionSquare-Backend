import { faker } from '@faker-js/faker';
import { DriverEntity } from 'src/pg/entity/driver.entity';
import { carSizeList } from 'src/type/driver';
import axios from 'axios';
import { TripEntity } from 'src/pg/entity/trip.entity';
import { sleep } from 'src/util/util';
import { ReviewEntity } from 'src/pg/entity/review.entity';

const targetUrl = `http://localhost:3000`;

function getRandomNumber(min: number, max: number): number {
    const randomDecimal: number = Math.random();
    const randomNumberInRange: number = min + randomDecimal * (max - min + 1);
    return Math.floor(randomNumberInRange);
}

async function generateDriver(n: number) {
    for (let i = 0; i < n; i++) {
        const fakeDriver: Partial<DriverEntity> = {
            name: faker.person.firstName(),
            drives: 0,
            averageRating: 0,
            region: faker.location.city(),
            carSize: carSizeList[getRandomNumber(0, 2)],
            profileImgUrl: faker.image.urlLoremFlickr({ category: 'cats' }),
        };
        await axios.post(`${targetUrl}/api/driver`, fakeDriver);
    }
}

async function generateTrip(n: number, driverId: string) {
    for (let i = 0; i < n; i++) {
        const fakeTrip: Partial<TripEntity> = {
            startDate: faker.date.past(),
            endDate: faker.date.future(),
            driverId,
            pickupLocation: {
                type: 'Point',
                coordinates: [faker.location.longitude(), faker.location.latitude()],
            },
        };
        await axios.post(`${targetUrl}/api/trip`, fakeTrip);
    }
}

async function generateReview(tripId: string) {
    const fakeReview: Partial<ReviewEntity> = {
        rating: getRandomNumber(1, 5),
        content: faker.lorem.lines({ max: 5, min: 1 }),
        title: faker.lorem.lines(1),
        tripId,
    };

    await axios.post(`${targetUrl}/api/review`, fakeReview);
}
async function main() {
    await generateDriver(10);
    await sleep(1000);
    const driverResponse = await axios.get(`${targetUrl}/api/driver`);
    const driverList = driverResponse.data.value.itemList as DriverEntity[];
    await Promise.all(
        driverList.map((driver) => {
            const driverId = driver.driverId;
            return generateTrip(10, driverId);
        })
    );

    const tripResponse = await axios.get(`${targetUrl}/api/trip`);
    const tripList = tripResponse.data.value.itemList as TripEntity[];
    await Promise.all(
        tripList.map((trip) => {
            const tripId = trip.tripId;
            return generateReview(tripId);
        })
    );
}

main();
