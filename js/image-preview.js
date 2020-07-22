'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var show = function (fileChooser, preview) {
    if (preview.tagName === 'DIV') {
      var imgPreviewElement = document.createElement('img');
      imgPreviewElement.style.width = '100%';
      imgPreviewElement.style.height = '100%';
      imgPreviewElement.alt = '';
      preview.appendChild(imgPreviewElement);
      preview = imgPreviewElement;
    }

    fileChooser.addEventListener('change', function () {
      var file = fileChooser.files[0];
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (item) {
        return fileName.endsWith(item);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          preview.src = reader.result;
        });

        reader.readAsDataURL(file);
      }
    });
  };

  window.imagePreview = {
    show: show,
  };
})();
