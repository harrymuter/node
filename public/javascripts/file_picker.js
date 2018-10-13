jQuery(function($) {

    $('#file').change(function () {
        var filename = $(this).val().split('\\').pop();
        $('#file_label').text(filename);
        $('#file_name').val(filename);
    });

});