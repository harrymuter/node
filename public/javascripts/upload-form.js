
$("#uploadForm").submit(function(e) {
    e.preventDefault();
    $.ajax({
        url: 'add-comment',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        method: 'POST',
        type: 'POST', // For jQuery < 1.9
        success: function(){
        }
    });
});