import { faker } from '@faker-js/faker';
import { DriverEntity } from 'src/pg/entity/driver.entity';
import { carSizeList } from 'src/type/driver';
import axios from 'axios';
import { TripEntity } from 'src/pg/entity/trip.entity';
import { sleep } from 'src/util/util';
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
        await axios.post('http://claycat.site:3000/api/driver', fakeDriver);
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
        await axios.post('http://claycat.site:3000/api/trip', fakeTrip);
    }
}

async function main() {
    await generateDriver(1);
    await sleep(1000);
    const response = await axios.get('http://claycat.site:3000/api/driver');
    const driverList = response.data.value.itemList as DriverEntity[];
    for (const driver of driverList) {
        console.log(driver);
        try {
            await generateTrip(1, driver.driverId);
        } catch (e) {
            console.log(e);
        }
    }
}

main();
