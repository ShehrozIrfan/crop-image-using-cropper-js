window.onload = function () {
  var image = document.getElementById("image");
  var inputImage = document.getElementById("inputImage");
  var croppedImage = document.getElementById("croppedImage");
  var cropper;
  var URL = window.URL || window.webkitURL;

  inputImage.onchange = function () {
    var files = this.files;
    var file;

    if (image && files && files.length) {
      file = files[0];

      image.src = URL.createObjectURL(file);

      console.log("image: ", image);
      image.onload = function () {
        URL.revokeObjectURL(this.src);
      };

      // Destroy the old cropper instance
      if (cropper) {
        cropper.destroy();
      }

      // Create new cropper instance
      cropper = new Cropper(image, {
        aspectRatio: 1,
        viewMode: 1,
        crop: function () {
          var canvas = this.cropper.getCroppedCanvas();
          croppedImage.src = canvas.toDataURL("image/png");
        },
      });
    }
  };
};
