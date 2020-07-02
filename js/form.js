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

  var onSelectChange = function () {
    coordinateGuestsRooms();
  };

  var setAddress = function (left, top) {
    inputAddress.value = left + ', ' + top;
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

    if (isDisabled) {
      form.classList.add('ad-form--disabled');
      selectGuestCapacity.removeEventListener('change', onSelectChange);
      selectRoomNumber.removeEventListener('change', onSelectChange);
      setAddress(+window.map.mainPin.style.left.replace('px', '') + PIN_X_OFFSET_INACTIVE, +window.map.mainPin.style.top.replace('px', '') + PIN_Y_OFFSET_INACTIVE);
    } else {
      form.classList.remove('ad-form--disabled');
      coordinateGuestsRooms();
      selectGuestCapacity.addEventListener('change', onSelectChange);
      selectRoomNumber.addEventListener('change', onSelectChange);
      setAddress(+window.map.mainPin.style.left.replace('px', '') + PIN_X_OFFSET_ACTIVE, +window.map.mainPin.style.top.replace('px', '') + PIN_Y_OFFSET_ACTIVE);
    }
  };

  window.imagePreview.showImagePreview(avatarChooser, avatarPreview);
  window.imagePreview.showImagePreview(housingPhotoChooser, housingPhotoPreview);

  window.form = {
    setFormDisabled: setFormDisabled,
  };
})();
