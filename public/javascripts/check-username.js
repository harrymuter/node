
$('#username').focusout(function() {
    var username = $(this).val();
        const key = /^[[a-zA-Z]{3}[0-9]{2}[[a-zA-Z]{3}?$/;
        const valid = key.test(username);

        if (username.length === 8 && valid) {
            $('#username').removeClass('is-invalid');
            $.ajax({
                type: 'post',
                url: 'check-username',
                data: {username},
                success: function(result){
                    if(result.event==="error") {
                        $('#username').addClass('is-invalid');
                    } else {
                        $('#username').removeClass('is-invalid');
                    }
                }
            });
        } else {
            $('#username').addClass('is-invalid');
        }
    }
);

$('#username_login').focusout(function() {
    var username = $(this).val();
        const key = /^[[a-zA-Z]{3}[0-9]{2}[[a-zA-Z]{3}?$/;
        const valid = key.test(username);
        if (username.length === 8 && valid) {
            $(this).removeClass('is-invalid')
        } else {
            $(this).addClass('is-invalid');
        }
    }
);