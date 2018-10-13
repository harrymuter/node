$("#submit_comment").submit(function(e) {
    e.preventDefault();
    var comment = $('[name="comment"]').val();
    var code = $('[name="code"]').val();
    var seq = $('[name="seq"]').val();
    $.ajax({
        type: 'post',
        url: 'add-comment',
        data: {
            feedback: comment,
            code: code,
            seq: seq
        },
        success: function(){
            location.reload();
        }
    });
});