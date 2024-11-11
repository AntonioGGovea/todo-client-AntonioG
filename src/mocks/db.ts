import { factory, primaryKey } from '@mswjs/data';
import { faker } from '@faker-js/faker';

const db = factory({
    todo: {
        id: primaryKey(faker.number.int),
        title: () => faker.word.verb(),
        isDone: () => faker.datatype.boolean(),
    }
});

export default db;
