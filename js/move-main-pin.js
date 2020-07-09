'use strict';

(function () {
  window.map.mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoordinates = {
      x: evt.clientX,
      y: evt.clientY,
    };

    var setMainPinLeftTopAddress = function (moveUpEvt) {
      var shift = {
        x: startCoordinates.x - moveUpEvt.clientX,
        y: startCoordinates.y - moveUpEvt.clientY,
      };

      startCoordinates = {
        x: moveUpEvt.clientX,
        y: moveUpEvt.clientY,
      };

      var mainPinStyleLeft = window.map.mainPin.offsetLeft - shift.x;
      var mainPinStyleTop = window.map.mainPin.offsetTop - shift.y;

      var correctMainPinOffset = function (offsetX, offsetY) {
        if (mainPinStyleLeft < window.data.PIN_X_RANGES[0] - offsetX) {
          mainPinStyleLeft = window.data.PIN_X_RANGES[0] - offsetX;
        }
        if (mainPinStyleLeft > window.data.PIN_X_RANGES[1] - offsetX) {
          mainPinStyleLeft = window.data.PIN_X_RANGES[1] - offsetX;
        }
        if (mainPinStyleTop < window.data.PIN_Y_RANGES[0] - offsetY) {
          mainPinStyleTop = window.data.PIN_Y_RANGES[0] - offsetY;
        }
        if (mainPinStyleTop > window.data.PIN_Y_RANGES[1] - offsetY) {
          mainPinStyleTop = window.data.PIN_Y_RANGES[1] - offsetY;
        }
      };

      if (window.main.isPageActive) {
        correctMainPinOffset(window.form.MAIN_PIN_X_OFFSET_ACTIVE, window.form.MAIN_PIN_Y_OFFSET_ACTIVE);
      } else {
        correctMainPinOffset(window.form.MAIN_PIN_X_OFFSET_INACTIVE, window.form.MAIN_PIN_Y_OFFSET_INACTIVE);
      }

      window.map.mainPin.style.left = mainPinStyleLeft + 'px';
      window.map.mainPin.style.top = mainPinStyleTop + 'px';

      window.form.setAddress(mainPinStyleLeft, mainPinStyleTop, window.main.isPageActive);
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      setMainPinLeftTopAddress(moveEvt);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      setMainPinLeftTopAddress(upEvt);

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
