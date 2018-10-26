jQuery(function($) {

    $('#file').change(function () {
        var filename = $(this).val().split('\\').pop();
        $('#file_label').text(filename);
        $('#file_name').val(filename);
    });

    $('#file').change(function () {
        if($(this).val()!==""){
            $('#submit_form').removeAttr("disabled");
        } else {
            $('#submit_form').attr("disabled", "disabled");
        }
    });

});