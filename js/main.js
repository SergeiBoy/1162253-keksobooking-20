'use strict';

(function () {
  var activatePage = function () {
    window.map.map.classList.remove('map--faded');

    window.backend.load(function (offers) {
      window.map.renderPins(offers);
      window.data.offers = offers;
    }, window.backend.onError);

    window.form.setFormsDisabled(false);
  };

  window.form.setFormsDisabled(true);

  window.map.mainPin.addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      activatePage();
    }
  });

  window.map.mainPin.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      activatePage();
    }
  });
})();
