'use strict';

(function () {
  var activatePage = function () {
    window.map.map.classList.remove('map--faded');

    window.backend.load(function (offers) {
      window.map.renderPins(window.filter.filterOffers(offers));
      window.data.offers = offers;
      window.filter.setFilterDisabled(false);
    }, window.backend.onError);

    window.form.setFormDisabled(false);
    window.main.isPageActive = true;
  };

  var onMainPinClick = function (evt) {
    if (evt.button === 0) {
      activatePage();
      window.map.mainPin.removeEventListener('mousedown', onMainPinClick);
    }
  };

  window.form.setFormDisabled(true);
  window.filter.setFilterDisabled(true);

  window.map.mainPin.addEventListener('mousedown', onMainPinClick);

  window.map.mainPin.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      activatePage();
    }
  });

  window.main = {
    isPageActive: false,
  };
})();
