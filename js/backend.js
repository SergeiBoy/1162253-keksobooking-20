'use strict';

(function () {
  var saveURL = 'https://javascript.pages.academy/keksobooking';
  var loadURL = 'https://javascript.pages.academy/keksobooking/data';
  var StatusCode = {
    OK: 200,
  };
  var TIMEOUT_IN_MS = 10000;

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

  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend = {
    save: save,
    load: load,
    onError: onError,
  };
})();
