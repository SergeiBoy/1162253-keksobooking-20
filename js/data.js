'use strict';

(function () {
  var APARTMENT_TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var APARTMENT_TYPES_TRANSLATION = ['Дворец', 'Квартира', 'Дом', 'Бунгало'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PIN_X_RANGES = [0, 1200];
  var PIN_Y_RANGES = [130, 630];

  var offers = [];

  window.data = {
    APARTMENT_TYPES: APARTMENT_TYPES,
    APARTMENT_TYPES_TRANSLATION: APARTMENT_TYPES_TRANSLATION,
    FEATURES: FEATURES,
    PIN_X_RANGES: PIN_X_RANGES,
    PIN_Y_RANGES: PIN_Y_RANGES,
    offers: offers,
  };
})();
