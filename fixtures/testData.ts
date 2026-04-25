// fixtures/testData.ts — All test data centralised here

export const urls = {
  home:   '/',
  sweets: '/sweets',
  login:  '/login',
  basket: '/basket',
  about:  '/about',
};

export const products = [
  { name: 'Chocolate Cups',    price: '£1.00' },
  { name: 'Sherbert Straws',   price: '£0.75' },
  { name: 'Sherbert Discs',    price: '£0.95' },
  { name: 'Bon Bons',          price: '£1.00' },
  { name: 'Jellies',           price: '£0.75' },
  { name: 'Fruit Salads',      price: '£0.50' },
  { name: 'Bubble Gums',       price: '£0.25' },
  { name: 'Wham Bars',         price: '£0.15' },
  { name: 'Whistles',          price: '£0.25' },
  { name: 'Sherbert Fountains',price: '£0.35' },
  { name: 'Swansea Mixture',   price: '£1.50' },
  { name: 'Chocolate Beans',   price: '£0.80' },
  { name: 'Nerds',             price: '£0.60' },
  { name: 'Drumsticks',        price: '£0.20' },
  { name: 'Bubbly',            price: '£0.10' },
  { name: 'Dolly Mixture',     price: '£0.90' },
];

export const loginData = {
  // No valid credentials exist — Bug #001
  // These are used for NEGATIVE tests only
  invalidEmail:    'user@sweetshop.com',
  invalidPassword: 'test1234',
  emptyEmail:      '',
  emptyPassword:   '',
  badEmailFormat:  'notanemail',
};

export const basketData = {
  validBilling: {
    firstName:  'QA',
    lastName:   'Tester',
    email:      'qa@sweetshop.com',
    address:    '123 Test Street',
    zip:        'SW1A 1AA',
  },
  invalidPromoCode: 'INVALID123',
};

export const messages = {
  loginError:      'Use one of the demo email addresses shown in the tooltip.',
  firstNameError:  'Valid first name is required.',
  lastNameError:   'Valid last name is required.',
  emailError:      'Please enter a valid email address for shipping updates.',
  addressError:    'Please enter your shipping address.',
  promoError:      'Please input a valid promo code.',
  cardNameError:   'Name on card is required',
  cardNumError:    'Credit card number is required',
  expiryError:     'Expiration date required',
  cvvError:        'Security code required',
};

export const pageContent = {
  homeTitle:   'Welcome to the sweet shop!',
  sweetsTitle: 'Browse sweets',
  loginTitle:  'Login',
  basketTitle: 'Your Basket',
  aboutTitle:  'Sweet Shop Project',
  promoBanner: '20% Off!',
};
