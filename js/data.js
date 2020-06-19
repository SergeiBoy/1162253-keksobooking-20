'use strict';

(function () {
  var OFFER_QUANTITY = 8;
  var PIN_X_RANGE = [0, 1200];
  var PIN_Y_RANGE = [130, 630];
  var APARTMENT_TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var APARTMENT_TYPES_TRANSLATION = ['Дворец', 'Квартира', 'Дом', 'Бунгало'];
  var MAX_ROOM_QUANTITY = 5;
  var MAX_GUEST_QUANTITY = 5;
  var CHECKIN_TIMES = ['12:00', '13:00', '14:00'];
  var CHECKOUT_TIMES = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  var getRandomNumber = function (number) {
    return Math.floor(Math.random() * (number + 1));
  };

  var createOffer = function (i) {
    var locationX = PIN_X_RANGE[0] + getRandomNumber(PIN_X_RANGE[1] - PIN_X_RANGE[0]);
    var locationY = PIN_Y_RANGE[0] + getRandomNumber(PIN_Y_RANGE[1] - PIN_Y_RANGE[0]);

    var offering = {
      author: {
        avatar: 'img/avatars/user0' + i + '.png',
      },
      offer: {
        title: 'Милые апартаменты',
        address: locationX + ', ' + locationY,
        price: 500 + getRandomNumber(2000),
        type: APARTMENT_TYPES[getRandomNumber(APARTMENT_TYPES.length - 1)],
        rooms: getRandomNumber(MAX_ROOM_QUANTITY - 1) + 1,
        guests: getRandomNumber(MAX_GUEST_QUANTITY - 1) + 1,
        checkin: CHECKIN_TIMES[getRandomNumber(CHECKIN_TIMES.length - 1)],
        checkout: CHECKOUT_TIMES[getRandomNumber(CHECKOUT_TIMES.length - 1)],
        features: FEATURES.slice(0, getRandomNumber(FEATURES.length - 1) + 1),
        description: 'Просторная уютная квартира',
        photos: PHOTOS.slice(0, getRandomNumber(PHOTOS.length - 1) + 1),
      },
      location: {
        x: locationX,
        y: locationY,
      },
    };

    return offering;
  };

  var createOffers = function () {
    var offers = [];
    for (var j = 0; j < OFFER_QUANTITY; j++) {
      offers.push(createOffer(j + 1));
    }
    return offers;
  };

  window.data = {
    offers: createOffers(),
    APARTMENT_TYPES: APARTMENT_TYPES,
    APARTMENT_TYPES_TRANSLATION: APARTMENT_TYPES_TRANSLATION,
    FEATURES: FEATURES,
  };
})();
