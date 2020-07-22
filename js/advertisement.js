'use strict';

(function () {
  var MAIN_PIN_X_OFFSET_INACTIVE = 33;
  var MAIN_PIN_Y_OFFSET_INACTIVE = 33;
  var MAIN_PIN_X_OFFSET_ACTIVE = 33;
  var MAIN_PIN_Y_OFFSET_ACTIVE = 76;

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

  var initialPricePlaceholder = inputPrice.placeholder;

  var avatarChooser = form.querySelector('.ad-form-header__input');
  var avatarPreview = form.querySelector('.ad-form-header__preview img');
  var initialAvatarSrc = avatarPreview.src;

  var housingPhotoChooser = form.querySelector('.ad-form__input');
  var housingPhotoPreview = form.querySelector('.ad-form__photo');

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
      case (window.data.APARTMENT_TYPES[3]): {
        minPrice = '0';
        break;
      }
      case (window.data.APARTMENT_TYPES[1]): {
        minPrice = '1000';
        break;
      }
      case (window.data.APARTMENT_TYPES[2]): {
        minPrice = '5000';
        break;
      }
      case (window.data.APARTMENT_TYPES[0]): {
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
    selectTimeOut.value = selectTimeIn.value;
  };

  var onSelectTimeOutChange = function () {
    selectTimeIn.value = selectTimeOut.value;
  };

  var setAddress = function (left, top, isPageActive) {
    if (isPageActive) {
      inputAddress.value = (left + MAIN_PIN_X_OFFSET_ACTIVE) + ', ' + (top + MAIN_PIN_Y_OFFSET_ACTIVE);
    } else {
      inputAddress.value = (left + MAIN_PIN_X_OFFSET_INACTIVE) + ', ' + (top + MAIN_PIN_Y_OFFSET_INACTIVE);
    }
  };

  var onFormSubmit = function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), function () {
      window.main.deactivatePage();
      window.backend.showSuccessFormSubmitMessage();
    }, window.backend.showErrorFormSubmitMessage);
  };

  var onResetButtonClick = function (evt) {
    evt.preventDefault();
    window.main.deactivatePage();
  };

  var setFormDisabled = function (isDisabled) {
    var imgPreview = housingPhotoPreview.querySelector('img');

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
      form.removeEventListener('submit', onFormSubmit);
      resetButton.removeEventListener('click', onResetButtonClick);
      inputPrice.placeholder = initialPricePlaceholder;
      avatarPreview.src = initialAvatarSrc;
      if (imgPreview) {
        imgPreview.src = '';
      }
    } else {
      form.classList.remove('ad-form--disabled');
      coordinateGuestsRooms();
      selectGuestCapacity.addEventListener('change', onSelectGuestRoomChange);
      selectRoomNumber.addEventListener('change', onSelectGuestRoomChange);
      coordinatePriceAndHousingType();
      selectHousingType.addEventListener('change', onSelectHousingTypeChange);
      selectTimeIn.addEventListener('change', onSelectTimeInChange);
      selectTimeOut.addEventListener('change', onSelectTimeOutChange);
      form.addEventListener('submit', onFormSubmit);
      resetButton.addEventListener('click', onResetButtonClick);
    }
  };

  window.imagePreview.show(avatarChooser, avatarPreview);
  window.imagePreview.show(housingPhotoChooser, housingPhotoPreview);

  window.advertisement = {
    form: form,
    setFormDisabled: setFormDisabled,
    setAddress: setAddress,
    MAIN_PIN_X_OFFSET_INACTIVE: MAIN_PIN_X_OFFSET_INACTIVE,
    MAIN_PIN_Y_OFFSET_INACTIVE: MAIN_PIN_Y_OFFSET_INACTIVE,
    MAIN_PIN_X_OFFSET_ACTIVE: MAIN_PIN_X_OFFSET_ACTIVE,
    MAIN_PIN_Y_OFFSET_ACTIVE: MAIN_PIN_Y_OFFSET_ACTIVE,
  };
})();
