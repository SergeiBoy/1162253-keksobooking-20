'use strict';

(function () {
  var offerTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var filter = document.querySelector('.map__filters-container');

  var formatNounPluralForm = function (number, one, two, many) {
    var mod10 = number % 10;
    var mod100 = number % 100;

    switch (true) {
      case (mod100 >= 11 && mod100 <= 20): {
        return many;
      }
      case (mod10 > 5): {
        return many;
      }
      case (mod10 === 1): {
        return one;
      }
      case (mod10 >= 2 && mod10 <= 4): {
        return two;
      }
      default: {
        return many;
      }
    }
  };

  var closeOpenCard = function () {
    var openCard = document.querySelector('.map__card');
    if (openCard) {
      openCard.remove();
    }
    document.removeEventListener('keydown', onOpenCardEscPress);
  };

  var onOpenCardEscPress = function (evt) {
    var openCard = document.querySelector('.map__card');
    if (evt.key === 'Escape' && openCard) {
      evt.preventDefault();
      openCard.remove();
    }
    document.removeEventListener('keydown', onOpenCardEscPress);
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

    offerElement.querySelector('.popup__type').textContent = window.data.APARTMENT_TYPES_TRANSLATION[window.data.APARTMENT_TYPES.indexOf(offering.offer.type)];

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

    for (var i = 0; i < window.data.FEATURES.length; i++) {
      if (offering.offer.features.indexOf(window.data.FEATURES[i]) < 0) {
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

    offerElement.querySelector('.popup__close').addEventListener('click', function () {
      closeOpenCard();
    });

    document.addEventListener('keydown', onOpenCardEscPress);

    filter.before(offerElement);
  };

  window.card = {
    renderOffer: renderOffer,
    closeOpenCard: closeOpenCard,
  };
})();
