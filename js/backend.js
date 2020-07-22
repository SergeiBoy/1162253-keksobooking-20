'use strict';

(function () {
  var TIMEOUT_IN_MS = 10000;

  var StatusCode = {
    OK: 200,
  };

  var successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');

  var saveURL = 'https://javascript.pages.academy/keksobooking';
  var loadURL = 'https://javascript.pages.academy/keksobooking/data';

  var sendRequest = function (onLoad, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    if (data) {
      xhr.open('POST', saveURL);
      xhr.send(data);
    } else {
      xhr.open('GET', loadURL);
      xhr.send();
    }
  };

  var save = function (data, onLoad, onError) {
    sendRequest(onLoad, onError, data);
  };

  var load = function (onLoad, onError) {
    sendRequest(onLoad, onError);
  };

  var showErrorMessage = function (errorMessage) {
    var node = document.createElement('div');
    node.classList.add('error-message');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var removeErrorMessage = function () {
    var errorMessage = document.querySelector('.error-message');
    if (errorMessage) {
      errorMessage.remove();
    }
  };

  var removeSuccessFormSubmitMessage = function () {
    document.querySelector('main .success').remove();
    document.removeEventListener('keydown', onSuccessMessageEscPress);
    document.removeEventListener('click', onSuccessMessageClick);
  };

  var onSuccessMessageEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      removeSuccessFormSubmitMessage();
    }
  };

  var onSuccessMessageClick = function (evt) {
    if (evt.target !== document.querySelector('.success__message')) {
      evt.preventDefault();
      removeSuccessFormSubmitMessage();
    }
  };

  var showSuccessFormSubmitMessage = function () {
    var successMessageElement = successMessageTemplate.cloneNode(true);
    document.querySelector('main').appendChild(successMessageElement);
    document.addEventListener('keydown', onSuccessMessageEscPress);
    document.addEventListener('click', onSuccessMessageClick);
  };

  var removeErrorFormSubmitMessage = function () {
    document.querySelector('main .error').remove();
    document.removeEventListener('keydown', onErrorMessageEscPress);
    document.removeEventListener('click', onErrorMessageClick);
  };

  var onErrorMessageEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      removeErrorFormSubmitMessage();
    }
  };

  var onErrorMessageClick = function (evt) {
    if (evt.target !== document.querySelector('.error__message')) {
      evt.preventDefault();
      removeErrorFormSubmitMessage();
    }
  };

  var showErrorFormSubmitMessage = function () {
    var errorMessageElement = errorMessageTemplate.cloneNode(true);
    errorMessageElement.querySelector('.error__button').addEventListener('click', function (evt) {
      evt.preventDefault();
      removeErrorFormSubmitMessage();
    });
    document.querySelector('main').appendChild(errorMessageElement);
    document.addEventListener('keydown', onErrorMessageEscPress);
    document.addEventListener('click', onErrorMessageClick);
  };

  window.backend = {
    save: save,
    load: load,
    showErrorMessage: showErrorMessage,
    removeErrorMessage: removeErrorMessage,
    showSuccessFormSubmitMessage: showSuccessFormSubmitMessage,
    showErrorFormSubmitMessage: showErrorFormSubmitMessage,
  };
})();
