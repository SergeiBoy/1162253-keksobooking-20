'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var PIN_X_OFFSET = 25;
  var PIN_Y_OFFSET = 70;

  var renderPin = function (offering) {
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.style = 'left: ' + (offering.location.x - PIN_X_OFFSET) + 'px; top: ' + (offering.location.y - PIN_Y_OFFSET) + 'px';
    pinElement.querySelector('img').src = offering.author.avatar;
    pinElement.querySelector('img').alt = offering.offer.title;

    return pinElement;
  };

  window.pin = {
    renderPin: renderPin,
  };
})();
