'use strict';

(function () {
  var activatePage = function () {
    window.map.layout.classList.remove('map--faded');

    window.backend.load(function (offers) {
      window.map.renderPins(window.filter.selectOffers(offers));
      window.data.offers = offers;
      window.filter.setFormDisabled(false);
    }, window.backend.onError);

    window.advertisement.setFormDisabled(false);
    window.main.isPageActive = true;
  };

  var deactivatePage = function () {
    window.map.layout.classList.add('map--faded');
    window.main.isPageActive = false;
    window.map.removePins();
    window.card.close();
    window.map.setMainPinInInitialPosition();
    window.advertisement.form.reset();
    window.filter.form.reset();
    window.advertisement.setFormDisabled(true);
    window.filter.setFormDisabled(true);
    window.map.mainPin.addEventListener('mousedown', onMainPinClick);
    window.backend.removeErrorMessage();
  };

  var onMainPinClick = function (evt) {
    if (evt.button === 0) {
      activatePage();
      window.map.mainPin.removeEventListener('mousedown', onMainPinClick);
    }
  };

  window.advertisement.setFormDisabled(true);
  window.filter.setFormDisabled(true);

  window.map.mainPin.addEventListener('mousedown', onMainPinClick);

  window.map.mainPin.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      activatePage();
    }
  });

  window.main = {
    isPageActive: false,
    deactivatePage: deactivatePage,
  };
})();
