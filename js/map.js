'use strict';

(function () {
  var map = document.querySelector('.map');
  var pinsOnMap = map.querySelector('.map__pins');
  var mainPin = pinsOnMap.querySelector('.map__pin--main');

  var renderPins = function (offers) {

    pinsOnMap.querySelectorAll('.map__pin:not(.map__pin--main)').forEach(function (item) {
      item.remove();
    });

    var fragment = document.createDocumentFragment();
    for (var i = 0; i < offers.length; i++) {
      fragment.appendChild(window.pin.renderPin(offers[i]));
    }
    pinsOnMap.appendChild(fragment);
  };

  pinsOnMap.addEventListener('click', function (evt) {
    var pinElement = evt.target.closest('.map__pin:not(.map__pin--main)');
    if (pinElement) {
      window.card.closeOpenCard();
      window.card.renderOffer(pinElement.offering);
    }
  });

  window.map = {
    renderPins: renderPins,
    map: map,
    mainPin: mainPin,
  };
})();
