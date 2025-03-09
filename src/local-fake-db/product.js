import { faker } from '@faker-js/faker';

const PRODUCTS = generate();

function generate(){

  const products = [];

  for (let i = 0; i < 100; i++){

    products.push({
      id: faker.string.uuid(),
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      description: faker.commerce.productDescription(),
      category: faker.commerce.department(),
      image: faker.image.url()
      });

  }
  return products;
}

export default PRODUCTS;