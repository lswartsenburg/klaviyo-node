Klaviyo = require('./');

const ensurIdentiferErrMsg =
  'No identifier ($email or $id) found in customerProperties';

describe('#constructor', () => {
  test('Require a write key', () => {
    expect(() =>
      new Klaviyo()
    ).toThrowError(new Error('You must pass your Klaviyo public key.'));
  });
});


describe('#track', () => {
  test('Require customer identier ($id or $email) for track', () => {
    expect(() =>
      (new Klaviyo('fake key')).track()
    ).toThrowError(new Error(ensurIdentiferErrMsg));
  });
});

describe('#identify', () => {
  test('Require customer identier ($id or $email) for identify', () => {
    expect(() =>
      (new Klaviyo('fake key')).identify()
    ).toThrowError(new Error(ensurIdentiferErrMsg));
  });
});

describe('#ensureIdentifier', () => {
  let klaviyo;
  beforeAll(() => {
    klaviyo = new Klaviyo('fake key');
  });

  test('Verifies customer identifiers as expected', () => {
    let customerProperties = {
      $email: 'test@test.com',
      $id: '13134',
    };
    expect(() =>
      klaviyo.ensureIdentifier(customerProperties)
    ).not.toThrowError();

    customerProperties = {
      $id: '13134',
    };
    expect(() =>
      klaviyo.ensureIdentifier(customerProperties)
    ).not.toThrowError();

    customerProperties = {
      $email: 'test@test.com',
    };
    expect(() =>
      klaviyo.ensureIdentifier(customerProperties)
    ).not.toThrowError();
  });

  test('Throws if no identifier is found', () => {
    const customerProperties = {};
    expect(() =>
      klaviyo.ensureIdentifier(customerProperties)
    ).toThrowError(new Error(ensurIdentiferErrMsg));
  });
});

describe('#ensurePrivateKey', () => {
  test('Throws if no private key is set', () => {
    expect(() =>
      (new Klaviyo('fake key')).ensurePrivateKey()
    ).toThrowError(new Error('Klaviyo private key not set'));
  });
});
