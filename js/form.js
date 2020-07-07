'use strict';

(function () {
  var form = document.querySelector('.ad-form');
  var inputAvatarImage = form.querySelector('#avatar');
  var inputTitle = form.querySelector('#title');
  var inputAddress = form.querySelector('#address');
  var selectHousingType = form.querySelector('#type');
  var inputPrice = form.querySelector('#price');
  var selectTimeIn = form.querySelector('#timein');
  var selectTimeOut = form.querySelector('#timeout');
  var selectRoomNumber = form.querySelector('#room_number');
  var selectGuestCapacity = form.querySelector('#capacity');
  var fieldsetFeatures = form.querySelector('.features');
  var textareaDescription = form.querySelector('#description');
  var inputHousingImage = form.querySelector('#images');
  var submitButton = form.querySelector('.ad-form__submit');
  var resetButton = form.querySelector('.ad-form__reset');

  var avatarChooser = form.querySelector('.ad-form-header__input');
  var avatarPreview = form.querySelector('.ad-form-header__preview img');

  var housingPhotoChooser = form.querySelector('.ad-form__input');
  var housingPhotoPreview = form.querySelector('.ad-form__photo img');

  var PIN_X_OFFSET_INACTIVE = 33;
  var PIN_Y_OFFSET_INACTIVE = 33;
  var PIN_X_OFFSET_ACTIVE = 31;
  var PIN_Y_OFFSET_ACTIVE = 84;

  var coordinateGuestsRooms = function () {
    if (selectRoomNumber.value === '1' && selectGuestCapacity.value !== '1') {
      selectGuestCapacity.setCustomValidity('Для одной комнаты вы можете выбрать только "для одного гостя"');
    } else if (selectRoomNumber.value === '2' && (selectGuestCapacity.value === '3' || selectGuestCapacity.value === '0')) {
      selectGuestCapacity.setCustomValidity('Для двух комнат вы можете выбрать только "для одного гостя" или "для двух гостей"');
    } else if (selectRoomNumber.value === '3' && selectGuestCapacity.value === '0') {
      selectGuestCapacity.setCustomValidity('Для трех комнат вы можете выбрать только "для одного гостя", "для двух гостей" или "для трех гостей"');
    } else if (selectRoomNumber.value === '100' && selectGuestCapacity.value !== '0') {
      selectGuestCapacity.setCustomValidity('Для 100 комнат вы можете выбрать только "не для гостей"');
    } else {
      selectGuestCapacity.setCustomValidity('');
    }
  };

  var onSelectGuestRoomChange = function () {
    coordinateGuestsRooms();
  };

  var coordinatePriceAndHousingType = function () {
    var minPrice;
    var housingType = selectHousingType.value;
    switch (housingType) {
      case ('bungalo'): {
        minPrice = '0';
        break;
      }
      case ('flat'): {
        minPrice = '1000';
        break;
      }
      case ('house'): {
        minPrice = '5000';
        break;
      }
      case ('palace'): {
        minPrice = '10000';
        break;
      }
      default: {
        minPrice = '0';
      }
    }

    inputPrice.min = minPrice;
    inputPrice.placeholder = minPrice;
  };

  var onSelectHousingTypeChange = function () {
    coordinatePriceAndHousingType();
  };

  var onSelectTimeInChange = function () {
    if (selectTimeIn.value === '12:00') {
      selectTimeOut.value = '12:00';
    } else if (selectTimeIn.value === '13:00') {
      selectTimeOut.value = '13:00';
    } else if (selectTimeIn.value === '14:00') {
      selectTimeOut.value = '14:00';
    }
  };

  var onSelectTimeOutChange = function () {
    if (selectTimeOut.value === '12:00') {
      selectTimeIn.value = '12:00';
    } else if (selectTimeOut.value === '13:00') {
      selectTimeIn.value = '13:00';
    } else if (selectTimeOut.value === '14:00') {
      selectTimeIn.value = '14:00';
    }
  };

  var setAddress = function (left, top, isPageActive) {
    if (isPageActive) {
      inputAddress.value = (left + PIN_X_OFFSET_ACTIVE) + ', ' + (top + PIN_Y_OFFSET_ACTIVE);
    } else {
      inputAddress.value = (left + PIN_X_OFFSET_INACTIVE) + ', ' + (top + PIN_Y_OFFSET_INACTIVE);
    }
  };

  var setFormDisabled = function (isDisabled) {
    inputAvatarImage.disabled = isDisabled;
    inputTitle.disabled = isDisabled;
    inputAddress.disabled = isDisabled;
    selectHousingType.disabled = isDisabled;
    inputPrice.disabled = isDisabled;
    selectTimeIn.disabled = isDisabled;
    selectTimeOut.disabled = isDisabled;
    selectRoomNumber.disabled = isDisabled;
    selectGuestCapacity.disabled = isDisabled;
    fieldsetFeatures.disabled = isDisabled;
    textareaDescription.disabled = isDisabled;
    inputHousingImage.disabled = isDisabled;
    submitButton.disabled = isDisabled;
    resetButton.disabled = isDisabled;
    setAddress(+window.map.mainPin.style.left.replace('px', ''), +window.map.mainPin.style.top.replace('px', ''), !isDisabled);

    if (isDisabled) {
      form.classList.add('ad-form--disabled');
      selectGuestCapacity.removeEventListener('change', onSelectGuestRoomChange);
      selectRoomNumber.removeEventListener('change', onSelectGuestRoomChange);
      selectHousingType.removeEventListener('change', onSelectHousingTypeChange);
      selectTimeIn.removeEventListener('change', onSelectTimeInChange);
      selectTimeOut.removeEventListener('change', onSelectTimeOutChange);
    } else {
      form.classList.remove('ad-form--disabled');
      coordinateGuestsRooms();
      selectGuestCapacity.addEventListener('change', onSelectGuestRoomChange);
      selectRoomNumber.addEventListener('change', onSelectGuestRoomChange);
      coordinatePriceAndHousingType();
      selectHousingType.addEventListener('change', onSelectHousingTypeChange);
      selectTimeIn.addEventListener('change', onSelectTimeInChange);
      selectTimeOut.addEventListener('change', onSelectTimeOutChange);
    }
  };

  window.imagePreview.showImagePreview(avatarChooser, avatarPreview);
  window.imagePreview.showImagePreview(housingPhotoChooser, housingPhotoPreview);

  window.form = {
    setFormDisabled: setFormDisabled,
    setAddress: setAddress,
    PIN_X_OFFSET_INACTIVE: PIN_X_OFFSET_INACTIVE,
    PIN_Y_OFFSET_INACTIVE: PIN_Y_OFFSET_INACTIVE,
    PIN_X_OFFSET_ACTIVE: PIN_X_OFFSET_ACTIVE,
    PIN_Y_OFFSET_ACTIVE: PIN_Y_OFFSET_ACTIVE,
  };
})();
