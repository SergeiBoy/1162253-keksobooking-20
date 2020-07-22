'use strict';

(function () {
  var MAX_PIN_ON_MAP_QUANTITY = 5;

  var LOWER_PRICE_LEVEL = 10000;
  var HIGHER_PRICE_LEVEL = 50000;

  var form = document.querySelector('.map__filters');
  var selectFilterHousingType = form.querySelector('#housing-type');
  var selectFilterPrice = form.querySelector('#housing-price');
  var selectFilterRoomNumber = form.querySelector('#housing-rooms');
  var selectFilterGuestCapacity = form.querySelector('#housing-guests');

  var fieldsetFilterFeatures = form.querySelector('#housing-features');
  var wifiCheckbox = fieldsetFilterFeatures.querySelector('#filter-wifi');
  var dishwasherCheckbox = fieldsetFilterFeatures.querySelector('#filter-dishwasher');
  var parkingCheckbox = fieldsetFilterFeatures.querySelector('#filter-parking');
  var washerCheckbox = fieldsetFilterFeatures.querySelector('#filter-washer');
  var elevatorCheckbox = fieldsetFilterFeatures.querySelector('#filter-elevator');
  var conditionerCheckbox = fieldsetFilterFeatures.querySelector('#filter-conditioner');
  var featureCheckboxes = [wifiCheckbox, dishwasherCheckbox, parkingCheckbox, washerCheckbox, elevatorCheckbox, conditionerCheckbox];

  var selectOffers = function (offers) {

    var filteredOffers = [];

    for (var i = 0; i < offers.length; i++) {
      var offering = offers[i];
      var isFeatureAvailable = true;

      if (!offering.offer) {
        continue;
      }

      if (selectFilterHousingType.value !== 'any' && offering.offer.type !== selectFilterHousingType.value) {
        continue;
      }

      if (selectFilterPrice.value === 'low' && offering.offer.price >= LOWER_PRICE_LEVEL) {
        continue;
      }

      if (selectFilterPrice.value === 'middle' && (offering.offer.price < LOWER_PRICE_LEVEL || offering.offer.price > HIGHER_PRICE_LEVEL)) {
        continue;
      }

      if (selectFilterPrice.value === 'high' && offering.offer.price <= HIGHER_PRICE_LEVEL) {
        continue;
      }

      if (selectFilterRoomNumber.value !== 'any' && offering.offer.rooms !== +selectFilterRoomNumber.value) {
        continue;
      }

      if (selectFilterGuestCapacity.value !== 'any' && selectFilterGuestCapacity.value !== '0' && offering.offer.guests < +selectFilterGuestCapacity.value) {
        continue;
      }

      if (selectFilterGuestCapacity.value === '0' && offering.offer.guests !== +selectFilterGuestCapacity.value) {
        continue;
      }

      for (var j = 0; j < featureCheckboxes.length; j++) {
        if (featureCheckboxes[j].checked && offering.offer.features.indexOf(window.data.FEATURES[j]) === -1) {
          isFeatureAvailable = false;
          break;
        }
      }

      if (!isFeatureAvailable) {
        continue;
      }

      filteredOffers.push(offering);

      if (filteredOffers.length >= MAX_PIN_ON_MAP_QUANTITY) {
        break;
      }
    }

    return filteredOffers;
  };

  var renderPinsOnFilterChange = window.debounce(function () {
    window.map.renderPins(selectOffers(window.data.offers));
  });

  var onFilterFormChange = function () {
    window.card.close();
    renderPinsOnFilterChange();
  };

  var setFormDisabled = function (isDisabled) {
    selectFilterHousingType.disabled = isDisabled;
    selectFilterPrice.disabled = isDisabled;
    selectFilterRoomNumber.disabled = isDisabled;
    selectFilterGuestCapacity.disabled = isDisabled;
    fieldsetFilterFeatures.disabled = isDisabled;

    if (isDisabled) {
      form.removeEventListener('change', onFilterFormChange);
    } else {
      form.addEventListener('change', onFilterFormChange);
    }
  };

  window.filter = {
    form: form,
    setFormDisabled: setFormDisabled,
    selectOffers: selectOffers,
  };
})();
