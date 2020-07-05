'use strict';

(function () {
  var MAX_PIN_ON_MAP_QUANTITY = 5;

  var filter = document.querySelector('.map__filters-container');
  var selectFilterHousingType = filter.querySelector('#housing-type');
  var selectFilterPrice = filter.querySelector('#housing-price');
  var selectFilterRoomNumber = filter.querySelector('#housing-rooms');
  var selectFilterGuestCapacity = filter.querySelector('#housing-guests');
  var fieldsetFilterFeatures = filter.querySelector('#housing-features');

  var filterOffers = function (offers) {
    return offers.filter(function (offer) {
      return offer.offer.type === selectFilterHousingType.value || selectFilterHousingType.value === 'any';
    }).slice(0, MAX_PIN_ON_MAP_QUANTITY);
  };

  var onSelectChange = function () {
    window.card.closeOpenCard();
    window.map.renderPins(filterOffers(window.data.offers));
  };

  var setFilterDisabled = function (isDisabled) {
    selectFilterHousingType.disabled = isDisabled;
    selectFilterPrice.disabled = isDisabled;
    selectFilterRoomNumber.disabled = isDisabled;
    selectFilterGuestCapacity.disabled = isDisabled;
    fieldsetFilterFeatures.disabled = isDisabled;

    if (isDisabled) {
      selectFilterHousingType.removeEventListener('change', onSelectChange);
    } else {
      selectFilterHousingType.addEventListener('change', onSelectChange);
    }
  };

  window.filter = {
    setFilterDisabled: setFilterDisabled,
    filterOffers: filterOffers,
  };
})();
