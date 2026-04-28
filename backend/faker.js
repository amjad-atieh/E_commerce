import { faker } from '@faker-js/faker';
import db from './postgres_init.js';
import pgp from 'pg-promise';

function createRandomTestEntry() {
  const product = faker.commerce.productName();
  const price = faker.commerce.price();

    return new pgp.ParameterizedQuery({text: 'INSERT INTO test(product, price) VALUES($1, $2)', 
    values: [
        product,
        price,
    ]});
};

const queries = Array.from({ length: 100 }, () => db.none(createRandomTestEntry()));


Promise.all(queries)
  .then(() => {
    console.log("100 test entries added");
  })
  .catch(error => {
    console.error(error.message);
  });


