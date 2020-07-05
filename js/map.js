'use strict';

(function () {
  var map = document.querySelector('.map');
  var pinsOnMap = map.querySelector('.map__pins');
  var mainPin = pinsOnMap.querySelector('.map__pin--main');

  var renderPins = function (offers) {
    pinsOnMap.innerHTML = '';
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < offers.length; i++) {
      fragment.appendChild(window.pin.renderPin(offers[i]));
    }
    pinsOnMap.appendChild(fragment);
  };

  window.map = {
    renderPins: renderPins,
    map: map,
    mainPin: mainPin,
  };
})();
