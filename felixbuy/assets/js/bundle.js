function readURL(input) {
  if (input.files && input.files[0]) {
      const imgID = $(input).data('img');
      var reader = new FileReader();

      reader.onload = function (e) {
          $('#' + imgID).attr('src', e.target.result);
      };
      reader.readAsDataURL(input.files[0]);
  }
}

$(document).ready(function () {
  $('.custom-select').each(function (index, item) {
    var text = $(item).data('placeholder');
    $(item).prepend('<option selected>' + text + '</option>');
  });
  $('.datepicker').datepicker({
    format: "dd/mm/yyyy",
    autoclose: true
  });
})