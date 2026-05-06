import { faker } from '@faker-js/faker';
import db from './postgres_init.js';
import pgp from 'pg-promise';

function createRandomProduct() {
  const name = faker.commerce.productName();
  const price = faker.commerce.price();
  const description = faker.commerce.productDescription();

    return new pgp.ParameterizedQuery({text: 'INSERT INTO product(name, price, description) VALUES($1, $2, $3)', 
    values: [
        name,
        price,
        description,
    ]});
};

const queries = Array.from({ length: 100 }, () => db.none(createRandomProduct()));


Promise.all(queries)
  .then(() => {
    console.log("100 product entries added");
  })
  .catch(error => {
    console.error(error.message);
  });


