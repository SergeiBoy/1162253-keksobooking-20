'use strict';

(function () {
  var activatePage = function () {
    window.map.map.classList.remove('map--faded');
    window.map.renderPins();

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
