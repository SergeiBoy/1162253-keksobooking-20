'use strict';

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
var PIN_X_OFFSET = 25;
var PIN_Y_OFFSET = 70;
var PIN_X_OFFSET_INACTIVE = 33;
var PIN_Y_OFFSET_INACTIVE = 33;
var PIN_X_OFFSET_ACTIVE = 31;
var PIN_Y_OFFSET_ACTIVE = 84;

var offers = [];
var map = document.querySelector('.map');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var pinsOnMap = document.querySelector('.map__pins');
var offerTemplate = document.querySelector('#card').content.querySelector('.map__card');
var filter = map.querySelector('.map__filters-container');

var mainPin = pinsOnMap.querySelector('.map__pin--main');

var form = document.querySelector('.ad-form');
var inputAvatarImage = form.querySelector('#avatar');
var inputTitle = form.querySelector('#title');
var inputAddress = form.querySelector('#address');
var selectHousingType = form.querySelector('#type');
var inputPrice = form.querySelector('#price');
var selectTimeIn = form.querySelector('#timein');
var selectTimeOut = form.querySelector('#timeout');
var selectRoomNumber = form.querySelector('#room_number');
var selectGuestCapacity = form.querySelector('#capacity');
var fieldsetFeatures = form.querySelector('.features');
var textareaDescription = form.querySelector('#description');
var inputHousingImage = form.querySelector('#images');
var submitButton = form.querySelector('.ad-form__submit');
var resetButton = form.querySelector('.ad-form__reset');

var selectFilterHousingType = filter.querySelector('#housing-type');
var selectFilterPrice = filter.querySelector('#housing-price');
var selectFilterRoomNumber = filter.querySelector('#housing-rooms');
var selectFilterGuestCapacity = filter.querySelector('#housing-guests');
var fieldsetFilterFeatures = filter.querySelector('#housing-features');

var getRandomNumber = function (number) {
  return Math.floor(Math.random() * (number + 1));
};

var formatNounPluralForm = function (number, one, two, many) {
  var mod10 = number % 10;
  var mod100 = number % 100;

  switch (true) {
    case (mod100 >= 11 && mod100 <= 20):
      return many;

    case (mod10 > 5):
      return many;

    case (mod10 === 1):
      return one;

    case (mod10 >= 2 && mod10 <= 4):
      return two;

    default:
      return many;
  }
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
  for (var j = 0; j < OFFER_QUANTITY; j++) {
    offers.push(createOffer(j + 1));
  }
};

var renderPin = function (offering) {
  var pinElement = pinTemplate.cloneNode(true);

  pinElement.style = 'left: ' + (offering.location.x - PIN_X_OFFSET) + 'px; top: ' + (offering.location.y - PIN_Y_OFFSET) + 'px';
  pinElement.querySelector('img').src = offering.author.avatar;
  pinElement.querySelector('img').alt = offering.offer.title;

  return pinElement;
};

var renderOffer = function (offering) {
  var offerElement = offerTemplate.cloneNode(true);
  var roomsForGuests = offerElement.querySelector('.popup__text--capacity');
  var checkinCheckout = offerElement.querySelector('.popup__text--time');
  var featuresList = offerElement.querySelectorAll('.popup__feature');
  var imgList = offerElement.querySelector('.popup__photos');
  var img = imgList.querySelector('.popup__photo');

  offerElement.querySelector('.popup__title').textContent = offering.offer.title;
  offerElement.querySelector('.popup__text--address').textContent = offering.offer.address;

  if (offering.offer.price) {
    offerElement.querySelector('.popup__text--price').innerHTML = '&#x20bd;<span>/ночь</span>';
    offerElement.querySelector('.popup__text--price').prepend(offering.offer.price);
  } else {
    offerElement.querySelector('.popup__text--price').innerHTML = '';
  }

  offerElement.querySelector('.popup__type').textContent = APARTMENT_TYPES_TRANSLATION[APARTMENT_TYPES.indexOf(offering.offer.type)];

  roomsForGuests.textContent = '';
  if (offering.offer.rooms) {
    roomsForGuests.textContent = offering.offer.rooms + ' ' + formatNounPluralForm(offering.offer.rooms, 'комната', 'комнаты', 'комнат') + ' ';
  }
  if (offering.offer.guests) {
    roomsForGuests.textContent += 'для ' + offering.offer.guests + ' ' + formatNounPluralForm(offering.offer.guests, 'гостя', 'гостей', 'гостей');
  }

  checkinCheckout.textContent = '';
  if (offering.offer.checkin) {
    checkinCheckout.textContent = 'Заезд после ' + offering.offer.checkin + ', ';
  }
  if (offering.offer.checkout) {
    checkinCheckout.textContent += 'выезд до ' + offering.offer.checkout;
  }

  for (var i = 0; i < FEATURES.length; i++) {
    if (offering.offer.features.indexOf(FEATURES[i]) < 0) {
      featuresList[i].remove();
    }
  }

  offerElement.querySelector('.popup__description').textContent = offering.offer.description;

  img.remove();
  for (var j = 0; j < offering.offer.photos.length; j++) {
    var imgElement = img.cloneNode(true);
    imgElement.src = offering.offer.photos[j];
    imgList.appendChild(imgElement);
  }

  offerElement.querySelector('.popup__avatar').src = offering.author.avatar;

  return offerElement;
};

var renderPins = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < offers.length; i++) {
    fragment.appendChild(renderPin(offers[i]));
  }
  pinsOnMap.appendChild(fragment);
};

var setFormsDisabled = function (isDisabled) {
  inputAvatarImage.disabled = isDisabled;
  inputTitle.disabled = isDisabled;
  inputAddress.disabled = isDisabled;
  selectHousingType.disabled = isDisabled;
  inputPrice.disabled = isDisabled;
  selectTimeIn.disabled = isDisabled;
  selectTimeOut.disabled = isDisabled;
  selectRoomNumber.disabled = isDisabled;
  selectGuestCapacity.disabled = isDisabled;
  fieldsetFeatures.disabled = isDisabled;
  textareaDescription.disabled = isDisabled;
  inputHousingImage.disabled = isDisabled;
  submitButton.disabled = isDisabled;
  resetButton.disabled = isDisabled;

  selectFilterHousingType.disabled = isDisabled;
  selectFilterPrice.disabled = isDisabled;
  selectFilterRoomNumber.disabled = isDisabled;
  selectFilterGuestCapacity.disabled = isDisabled;
  fieldsetFilterFeatures.disabled = isDisabled;
};

var setAddress = function (left, top) {
  inputAddress.value = left + ', ' + top;
};

var coordinateGuestsRooms = function () {
  if (selectRoomNumber.value === '1' && selectGuestCapacity.value !== '1') {
    selectGuestCapacity.setCustomValidity('Для одной комнаты вы можете выбрать только "для одного гостя"');
  } else if (selectRoomNumber.value === '2' && (selectGuestCapacity.value === '3' || selectGuestCapacity.value === '0')) {
    selectGuestCapacity.setCustomValidity('Для двух комнат вы можете выбрать только "для одного гостя" или "для двух гостей"');
  } else if (selectRoomNumber.value === '3' && selectGuestCapacity.value === '0') {
    selectGuestCapacity.setCustomValidity('Для трех комнат вы можете выбрать только "для одного гостя", "для двух гостей" или "для трех гостей"');
  } else if (selectRoomNumber.value === '100' && selectGuestCapacity.value !== '0') {
    selectGuestCapacity.setCustomValidity('Для 100 комнат вы можете выбрать только "не для гостей"');
  } else {
    selectGuestCapacity.setCustomValidity('');
  }
};

var activatePage = function () {
  map.classList.remove('map--faded');
  renderPins();

  form.classList.remove('ad-form--disabled');

  setFormsDisabled(false);

  setAddress(+mainPin.style.left.replace('px', '') + PIN_X_OFFSET_ACTIVE, +mainPin.style.top.replace('px', '') + PIN_Y_OFFSET_ACTIVE);

  coordinateGuestsRooms();
  selectGuestCapacity.addEventListener('change', function () {
    coordinateGuestsRooms();
  });
  selectRoomNumber.addEventListener('change', function () {
    coordinateGuestsRooms();
  });
};

createOffers();

setAddress(+mainPin.style.left.replace('px', '') + PIN_X_OFFSET_INACTIVE, +mainPin.style.top.replace('px', '') + PIN_Y_OFFSET_INACTIVE);

setFormsDisabled(true);

mainPin.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    activatePage();
  }
});

mainPin.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    evt.preventDefault();
    activatePage();
  }
});

// filter.before(renderOffer(offers[0]));
// Чтобы не было ошибки eslint:
renderOffer(offers[0]);
