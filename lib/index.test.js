Klaviyo = require('./');

test('Require a write key', () => {
  expect(() =>
    new Klaviyo()
  ).toThrowError(new Error('You must pass your Klaviyo public key.'));
});

test('Require an email for track', () => {
  expect(() =>
    (new Klaviyo('fake key')).track()
  ).toThrowError(new Error('You must pass an email value.'));
});

test('Require an email for identify', () => {
  expect(() =>
    (new Klaviyo('fake key')).identify()
  ).toThrowError(new Error('You must pass an email value.'));
});
