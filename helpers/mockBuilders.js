import Faker from 'faker';
import { v4 as uuid } from 'uuid';

export const MOCK_FLAG = '(mock)';

export const fakeBean = () => {
  const possibleRoasts = ['Light', 'Medium', 'Dark'];
  const fakeBeanName = Faker.commerce.product() + ' beans';
  const roastProfile = Faker.random.arrayElement(possibleRoasts);
  const id = uuid() + MOCK_FLAG;
  return {
    name: fakeBeanName,
    roast_profile: roastProfile,
    id,
  };
};

export const fakeBatch = (beanId) => {
  const id = uuid() + MOCK_FLAG;
  return {
    bean_id: beanId,
    grind_size: Faker.random.number(30),
    grinds_oz: Faker.random.number(100),
    batch_size_oz: Faker.random.number(100),
    rating: Faker.random.number(10),
    note: Faker.company.catchPhrase(),
    date: Faker.date.past().valueOf(),
    id,
  };
};
