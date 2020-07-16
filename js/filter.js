'use strict';

(function () {
  var MAX_PIN_ON_MAP_QUANTITY = 5;

  var LOWER_PRICE_LEVEL = 10000;
  var HIGHER_PRICE_LEVEL = 50000;

  var filter = document.querySelector('.map__filters');
  var selectFilterHousingType = filter.querySelector('#housing-type');
  var selectFilterPrice = filter.querySelector('#housing-price');
  var selectFilterRoomNumber = filter.querySelector('#housing-rooms');
  var selectFilterGuestCapacity = filter.querySelector('#housing-guests');

  var fieldsetFilterFeatures = filter.querySelector('#housing-features');
  var wifiCheckbox = fieldsetFilterFeatures.querySelector('#filter-wifi');
  var dishwasherCheckbox = fieldsetFilterFeatures.querySelector('#filter-dishwasher');
  var parkingCheckbox = fieldsetFilterFeatures.querySelector('#filter-parking');
  var washerCheckbox = fieldsetFilterFeatures.querySelector('#filter-washer');
  var elevatorCheckbox = fieldsetFilterFeatures.querySelector('#filter-elevator');
  var conditionerCheckbox = fieldsetFilterFeatures.querySelector('#filter-conditioner');
  var featureCheckboxes = [wifiCheckbox, dishwasherCheckbox, parkingCheckbox, washerCheckbox, elevatorCheckbox, conditionerCheckbox];

  var filterOffers = function (offers) {
    offers = offers.filter(function (offer) {
      return (offer.offer) && (offer.offer.type === selectFilterHousingType.value || selectFilterHousingType.value === 'any');
    });

    if (selectFilterPrice.value === 'low') {
      offers = offers.filter(function (offer) {
        return (offer.offer.price < LOWER_PRICE_LEVEL);
      });
    }

    if (selectFilterPrice.value === 'middle') {
      offers = offers.filter(function (offer) {
        return (offer.offer.price >= LOWER_PRICE_LEVEL && offer.offer.price <= HIGHER_PRICE_LEVEL);
      });
    }

    if (selectFilterPrice.value === 'high') {
      offers = offers.filter(function (offer) {
        return (offer.offer.price > HIGHER_PRICE_LEVEL);
      });
    }

    if (selectFilterRoomNumber.value !== 'any') {
      offers = offers.filter(function (offer) {
        return (offer.offer.rooms === +selectFilterRoomNumber.value);
      });
    }

    if (selectFilterGuestCapacity.value !== 'any' && selectFilterGuestCapacity.value !== '0') {
      offers = offers.filter(function (offer) {
        return (offer.offer.guests >= +selectFilterGuestCapacity.value);
      });
    }

    if (selectFilterGuestCapacity.value === '0') {
      offers = offers.filter(function (offer) {
        return (offer.offer.guests === +selectFilterGuestCapacity.value);
      });
    }

    for (var i = 0; i < featureCheckboxes.length; i++) {
      if (featureCheckboxes[i].checked) {
        offers = offers.filter(function (offer) {
          return (offer.offer.features.indexOf(window.data.FEATURES[i]) !== -1);
        });
      }
    }

    return offers.slice(0, MAX_PIN_ON_MAP_QUANTITY);
  };

  var renderPinsOnFilterChange = window.debounce(function () {
    window.map.renderPins(filterOffers(window.data.offers));
  });

  var onSelectChange = function () {
    window.card.closeOpenCard();
    renderPinsOnFilterChange();
  };

  var setFilterDisabled = function (isDisabled) {
    selectFilterHousingType.disabled = isDisabled;
    selectFilterPrice.disabled = isDisabled;
    selectFilterRoomNumber.disabled = isDisabled;
    selectFilterGuestCapacity.disabled = isDisabled;
    fieldsetFilterFeatures.disabled = isDisabled;

    if (isDisabled) {
      selectFilterHousingType.removeEventListener('change', onSelectChange);
      selectFilterPrice.removeEventListener('change', onSelectChange);
      selectFilterRoomNumber.removeEventListener('change', onSelectChange);
      selectFilterGuestCapacity.removeEventListener('change', onSelectChange);
      fieldsetFilterFeatures.removeEventListener('change', onSelectChange);
    } else {
      selectFilterHousingType.addEventListener('change', onSelectChange);
      selectFilterPrice.addEventListener('change', onSelectChange);
      selectFilterRoomNumber.addEventListener('change', onSelectChange);
      selectFilterGuestCapacity.addEventListener('change', onSelectChange);
      fieldsetFilterFeatures.addEventListener('change', onSelectChange);
    }
  };

  window.filter = {
    filter: filter,
    setFilterDisabled: setFilterDisabled,
    filterOffers: filterOffers,
  };
})();
