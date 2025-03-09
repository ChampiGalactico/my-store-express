import { faker } from '@faker-js/faker';

const USERS = generate();

function generate() {

  const users = [];

  for (let i = 0; i < 100; i++) {

    users.push({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      username: faker.internet.username(),
      gender: faker.person.sex(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      birthdate: faker.date.birthdate(),
      phone: faker.phone.number(),
      bio: faker.person.bio(),
      profile_img: faker.image.url(),
    });

  }

  return users;
}

export default USERS;
