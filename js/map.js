'use strict';

(function () {
  var map = document.querySelector('.map');
  var pinsOnMap = map.querySelector('.map__pins');
  var mainPin = pinsOnMap.querySelector('.map__pin--main');
  var filter = document.querySelector('.map__filters-container');

  var renderPins = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.data.offers.length; i++) {
      fragment.appendChild(window.pin.renderPin(window.data.offers[i]));
    }
    pinsOnMap.appendChild(fragment);
  };

  // Временно:
  filter.before(window.card.renderOffer(window.data.offers[0]));

  window.map = {
    renderPins: renderPins,
    map: map,
    mainPin: mainPin,
  };
})();
