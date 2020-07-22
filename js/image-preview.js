'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var show = function (fileChooser, preview) {
    if (preview.tagName === 'DIV') {
      var imgPreview = document.createElement('img');
      imgPreview.style.width = '100%';
      imgPreview.style.height = '100%';
      imgPreview.alt = '';
      preview.appendChild(imgPreview);
      preview = imgPreview;
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
