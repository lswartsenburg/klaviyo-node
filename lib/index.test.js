Klaviyo = require('./');

test('Require a write key', () => {
  expect(() =>
    new Klaviyo()
  ).toThrowError(new Error('You must pass your Klaviyo public key.'));
});

test('Require an email for track', () => {
  const errMsg = 'No identifier (email or id) found in customerProperties';
  expect(() =>
    (new Klaviyo('fake key')).track()
  ).toThrowError(new Error(errMsg));
});

test('Require an email for identify', () => {
  const errMsg = 'No identifier (email or id) found in customerProperties';
  expect(() =>
    (new Klaviyo('fake key')).identify()
  ).toThrowError(new Error(errMsg));
});

describe('#prepCutomerProperties', () => {
  let klaviyo;
  beforeAll(() => {
    klaviyo = new Klaviyo('fake key');
  });

  test('Returns prepped customer properties as expected', () => {
    const customerProperties = {
      email: 'test@test.com',
      id: '13134',
    };
    const prepCutomerProperties =
      klaviyo.prepCutomerProperties(customerProperties);
    expect(prepCutomerProperties.email).toBeFalsy();
    expect(prepCutomerProperties.$email).toBeTruthy();
    expect(prepCutomerProperties.id).toBeFalsy();
    expect(prepCutomerProperties.$id).toBeTruthy();
  });

  test('Throws if no identifier is found', () => {
    const customerProperties = {};
    const errMsg = 'No identifier (email or id) found in customerProperties';
    expect(() =>
      klaviyo.prepCutomerProperties(customerProperties)
    ).toThrowError(new Error(errMsg));
  });
});
