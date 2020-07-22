'use strict';

(function () {
  var layout = document.querySelector('.map');
  var pinsOnMap = layout.querySelector('.map__pins');
  var mainPin = pinsOnMap.querySelector('.map__pin--main');

  var initialMainPinLeft = mainPin.style.left;
  var initialMainPinTop = mainPin.style.top;

  var removePins = function () {
    pinsOnMap.querySelectorAll('.map__pin:not(.map__pin--main)').forEach(function (item) {
      item.remove();
    });
  };

  var removeActiveClassForPin = function () {
    var activePin = pinsOnMap.querySelector('.map__pin--active');
    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
  };

  var renderPins = function (offers) {

    removePins();

    var fragment = document.createDocumentFragment();
    for (var i = 0; i < offers.length; i++) {
      fragment.appendChild(window.pin.render(offers[i]));
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
      window.card.close();
      pinElement.classList.add('map__pin--active');
      window.card.render(pinElement.offering);
    }
  });

  window.map = {
    removePins: removePins,
    removeActiveClassForPin: removeActiveClassForPin,
    renderPins: renderPins,
    setMainPinInInitialPosition: setMainPinInInitialPosition,
    layout: layout,
    mainPin: mainPin,
  };
})();
