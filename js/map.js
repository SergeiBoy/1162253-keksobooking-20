'use strict';

(function () {
  var map = document.querySelector('.map');
  var pinsOnMap = map.querySelector('.map__pins');
  var mainPin = pinsOnMap.querySelector('.map__pin--main');

  var initialMainPinLeft = mainPin.style.left;
  var initialMainPinTop = mainPin.style.top;

  var removePins = function () {
    pinsOnMap.querySelectorAll('.map__pin:not(.map__pin--main)').forEach(function (item) {
      item.remove();
    });
  };

  var renderPins = function (offers) {

    removePins();

    var fragment = document.createDocumentFragment();
    for (var i = 0; i < offers.length; i++) {
      fragment.appendChild(window.pin.renderPin(offers[i]));
    }
    pinsOnMap.appendChild(fragment);
  };

  var setMainPinInInitialPosition = function () {
    mainPin.style.left = initialMainPinLeft;
    mainPin.style.top = initialMainPinTop;
  };

  pinsOnMap.addEventListener('click', function (evt) {
    var pinElement = evt.target.closest('.map__pin:not(.map__pin--main)');
    if (pinElement) {
      window.card.closeOpenCard();
      window.card.renderOffer(pinElement.offering);
    }
  });

  window.map = {
    removePins: removePins,
    renderPins: renderPins,
    setMainPinInInitialPosition: setMainPinInInitialPosition,
    map: map,
    mainPin: mainPin,
  };
})();
