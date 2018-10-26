
$(document).ready(function() {


    var custom_select = [];
    var subtitle = '';

    function getUrlVars(url) {
        var hash;
        var myJson = {};
        var hashes = url.slice(url.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            myJson[hash[0]] = hash[1];
        }
        return myJson;
    }

    $("#add_title").submit(function(e) {
        e.preventDefault();
        var getFormName = $('input[name="form_title"]');
        form_name = getFormName.val();
        $('#form_title').text(form_name);
        $('#form_title_input').css('border-color','');
    });

    $("#add_subtitle").submit(function(e) {
        e.preventDefault();
        var getFormName = $('input[name="form_subtitle"]');
        $('#form_subtitle').text(getFormName.val());
        subtitle = getFormName.val();
    });

    $("#add_heading").submit(function(e) {
        e.preventDefault();
        var stamp = Date.now();
        var form = getUrlVars($(this).serialize());
        var newform = $("#newForm");
        var heading = unescape(form.form_heading);
        var size = form.size;
        newform.append('<div class="row col-12 '+stamp+'" data-identifier="' + stamp + '">' +
            '<div class="row col-12 top-buffer-lg"></div>' +
            '<div class="row col-12"><div class="'+size+'-alt">'+heading+'</div>'+'</div>' +
            '<div class="row col-12 top-buffer"></div>' +
            '<div class="col-1 move" data-identifier="' + stamp + '"  data-direction="up"><span class="alert alert-warning glyphicon glyphicon-circle-arrow-up"></span></div>' +
            '<div class="col-10 delete" data-identifier="' + stamp + '"><span class="col-12 alert alert-danger glyphicon glyphicon-remove"></span></div>' +
            '<div class="col-1 move" data-identifier="' + stamp + '"  data-direction="down"><span class="alert alert-warning glyphicon glyphicon-circle-arrow-down"></span></div>');
        $('input[name="form_heading"]').val("");
        $('input[name="size"]').val("");

        if ($('#toggle-controls').is(':checked')) {
            $('.delete').hide();
            $('.move').hide();
        }
    });

    $("#add_text").submit(function(e) {
        e.preventDefault();
        var stamp = Date.now();
        var form = getUrlVars($(this).serialize());
        var newform = $("#newForm");
        var text = unescape(form.form_text);
        newform.append('<div class="row col-12 '+stamp+'" data-identifier="' + stamp + '">' +
            '<div class="row col-12 top-buffer"></div>' +
            '<div class="row col-12"><p>'+text+'</p></div>' +
            '<div class="row col-12 top-buffer"></div>' +
            '<div class="col-1 move" data-identifier="' + stamp + '"  data-direction="up"><span class="alert alert-warning glyphicon glyphicon-circle-arrow-up"></span></div>' +
            '<div class="col-10 delete" data-identifier="' + stamp + '"><span class="col-12 alert alert-danger glyphicon glyphicon-remove"></span></div>' +
            '<div class="col-1 move" data-identifier="' + stamp + '"  data-direction="down"><span class="alert alert-warning glyphicon glyphicon-circle-arrow-down"></span></div>');
        $('textarea[name="form_text"]').val("");

        if ($('#toggle-controls').is(':checked')) {
            $('.delete').hide();
            $('.move').hide();
        }
    });

    $("#select-builder").submit(function(e) {
        e.preventDefault();
        var stamp = Date.now();
        var form = getUrlVars($(this).serialize());
        var newform = $("#newForm");

        if (form.required === "no") {
            var html = '<div class="row col-12 ' + stamp + '" data-identifier="' + stamp + '">' +
                '<div class="row col-12"><label class="col-4 col-form-label" for="' + stamp + '">' + unescape(form.select_input).trim() + '</label>' +
                '<div class="form-group col-4">' +
                '<select name="' + stamp + '" id="' + stamp + '" class="form-control">';

            for (var i = 0; i < custom_select.length; i++) {
                var option = custom_select[i] + '_option';
                var val = custom_select[i] + '_val';
                if (form[val] !== "" && form[option] !== "")
                    html += '<option value="' + unescape(form[val]).trim() + '">' + unescape(form[option]).trim() + '</option>';
            }

            html += '</select>' +
                '</div>' +
                '<div class="form-group col-3"></div>' +
                '</div>' +
                '<div class="col-1 move" data-identifier="' + stamp + '"  data-direction="up"><span class="alert alert-warning glyphicon glyphicon-circle-arrow-up"></span></div>' +
                '<div class="col-10 delete" data-identifier="' + stamp + '"><span class="col-12 alert alert-danger glyphicon glyphicon-remove"></span></div>' +
                '<div class="col-1 move" data-identifier="' + stamp + '"  data-direction="down"><span class="alert alert-warning glyphicon glyphicon-circle-arrow-down"></span></div>' +
                '</div>';
            newform.append(html);
        } else {
            var html = '<div class="row col-12 ' + stamp + '" data-identifier="' + stamp + '">' +
                '<div class="row col-12"><label class="col-4 col-form-label" for="' + stamp + '">' + unescape(form.select_input).trim() + ' *</label>' +
                '<div class="form-group col-4">' +
                '<select name="' + stamp + '" id="' + stamp + '" class="form-control">';

            for (var i = 0; i < custom_select.length; i++) {
                var option = custom_select[i] + '_option';
                var val = custom_select[i] + '_val';
                if (form[val] !== "" && form[option] !== "")
                    html += '<option value="' + unescape(form[val]).trim() + '" required>' + unescape(form[option]).trim() + '</option>';
            }

            html += '</select>' +
                '</div>' +
                '<div class="form-group col-3"></div>' +
                '</div>' +
                '<div class="col-1 move" data-identifier="' + stamp + '"  data-direction="up"><span class="alert alert-warning glyphicon glyphicon-circle-arrow-up"></span></div>' +
                '<div class="col-10 delete" data-identifier="' + stamp + '"><span class="col-12 alert alert-danger glyphicon glyphicon-remove"></span></div>' +
                '<div class="col-1 move" data-identifier="' + stamp + '"  data-direction="down"><span class="alert alert-warning glyphicon glyphicon-circle-arrow-down"></span></div>' +
                '</div>';
            newform.append(html);
            }

        custom_select = [];
        array_of_questions.push(stamp);
        $('#options').html('');
        $('#select_input').val('');
        $('#select_required').val('');
        if ($('#toggle-controls').is(':checked')) {
            $('.delete').hide();
            $('.move').hide();
        }
    });

    $("#add_divider").on('click',function(e) {
        e.preventDefault();
        var stamp = Date.now();
        var newform = $("#newForm");
        newform.append('<div class="row col-12 '+stamp+'" data-identifier="' + stamp + '">' +
            '<div class="row col-12"><hr></div>' +
            '<div class="col-1 move" data-identifier="' + stamp + '"  data-direction="up"><span class="alert alert-warning glyphicon glyphicon-circle-arrow-up"></span></div>' +
            '<div class="col-10 delete" data-identifier="' + stamp + '"><span class="col-12 alert alert-danger glyphicon glyphicon-remove"></span></div>' +
            '<div class="col-1 move" data-identifier="' + stamp + '"  data-direction="down"><span class="alert alert-warning glyphicon glyphicon-circle-arrow-down"></span></div>' +
            '</div>');

        if ($('#toggle-controls').is(':checked')) {
            $('.delete').hide();
            $('.move').hide();
        }
    });

    $("#clear-options").on('click',function(e) {
        $("#select-input").val("");
        $("#select-required").val("");
        $("#options").empty();
    });


    $(document).on('click', '.delete', function(){
        var class_to_delete = $(this).data('identifier');
        name = '.'+class_to_delete;
        $(name).remove();
        var index = array_of_questions.indexOf(class_to_delete);
        if (index !== -1) array_of_questions.splice(index, 1);

        var index2 = custom_select.indexOf(class_to_delete);
        if (index2 !== -1) custom_select.splice(index, 1);
    });

    $(document).on('click', '.assign-value', function(){
        var name = $(this).data('identifier');
        var option_name = '#'+name+'_option';
        var val_name = '#'+name;
        var value = $(option_name).val();
        $(val_name).val(value);
    });

    $(document).on('click', '.move', function(){
        var class_to_move = $(this).data('identifier');
        var name = '.'+class_to_move;
        var action = $(this).data('direction');
        if(action === 'up'){
            var identifier = $(name).prev().data('identifier');
            identifier = '.'+identifier;
            $(name).insertBefore(identifier);
        } else {
            var identifier = $(name).next().data('identifier');
            identifier = '.'+identifier;
            $(identifier).insertBefore(name);
        }
    });

    $("#add-option").on('click',function(e) {
        var stamp = Date.now();
        var custom_select_html = $("#options");
        custom_select_html.append('<div class="row col-12 '+stamp+'">'+
            '<div class="form-group col-5">'+
            '<label for="select_option" class="sr-only">Value</label>'+
            '<input name="'+stamp+'_option" type="text" class="form-control" id="'+stamp+'_option" placeholder="Option" required>'+
            '</div>'+
            '<div style="vertical-align: middle; margin:0; padding:0; cursor: pointer" class="assign-value" data-identifier="'+stamp+'">'+
            '<span style="vertical-align: middle; margin:0; padding:0;" class="glyphicon glyphicon-arrow-right"></span>'+
            '</div>'+
            '<div class="form-group col-5">'+
            '<label for="select_value" class="sr-only">Value</label>'+
            '<input name="'+stamp+'_val" id="' + stamp + '" type="text" class="form-control" id="select_value" placeholder="Value" required>'+
            '</div>'+
            '<div class="delete" style="vertical-align:middle;margin:0;padding:0" data-identifier="' + stamp + '" ><span style="vertical-align: middle; margin:0; padding:0;" class="col-12 glyphicon glyphicon-remove"></span>'+
            '</div>');
        custom_select.push(stamp);
    });


    $("#builder").submit(function(e) {

        e.preventDefault();

        var form = getUrlVars($(this).serialize());

        var question = '';

        if (form.required === 'yes') {
            question = unescape(form.question) + ' *';
        } else {
            question = unescape(form.question);
        }

        var newform = $("#newForm");

        var stamp = Date.now();

        array_of_questions.push(stamp);

        switch (form.type) {
            case 'text':
                if (form.required === 'yes') {
                    newform.append('<div class="row col-12 '+stamp+'" data-identifier="' + stamp + '">' +
                        '<div class="row col-12"><label class="col-4 col-form-label"  for="' + stamp + '">' + question + '</label>' +
                        '<div class="form-group col-7">' +
                        '<input name="'+stamp+'" id="' + stamp + '" class="form-control" type="' + form.type + '" required/>' +
                        '</div>' +
                        '</div>' +
                        '<div class="col-1 move" data-identifier="' + stamp + '"  data-direction="up"><span class="alert alert-warning glyphicon glyphicon-circle-arrow-up"></span></div>' +
                        '<div class="col-10 delete" data-identifier="' + stamp + '"><span class="col-12 alert alert-danger glyphicon glyphicon-remove"></span></div>' +
                        '<div class="col-1 move" data-identifier="' + stamp + '"  data-direction="down"><span class="alert alert-warning glyphicon glyphicon-circle-arrow-down"></span></div>' +
                        '</div>');
                } else {
                    newform.append('<div class="row col-12 '+stamp+'" data-identifier="' + stamp + '">' +
                        '<div class="row col-12"><label class="col-4 col-form-label"  for="' + stamp + '">' + question + '</label>' +
                        '<div class="form-group col-7">' +
                        '<input name="'+stamp+'" id="' + stamp + '" class="form-control" type="' + form.type + '"/>' +
                        '</div>' +
                        '</div>' +
                        '<div class="col-1 move" data-identifier="' + stamp + '"  data-direction="up"><span class="alert alert-warning glyphicon glyphicon-circle-arrow-up"></span></div>' +
                        '<div class="col-10 delete" data-identifier="' + stamp + '"><span class="col-12 alert alert-danger glyphicon glyphicon-remove"></span></div>' +
                        '<div class="col-1 move" data-identifier="' + stamp + '"  data-direction="down"><span class="alert alert-warning glyphicon glyphicon-circle-arrow-down"></span></div>' +
                        '</div>');
                }
                break;
            case 'textarea':
                if (form.required === 'yes') {
                    newform.append('<div class="row col-12 '+stamp+'" data-identifier="' + stamp + '">' +
                        '<div class="row col-12"><label class="col-4 col-form-label" for="' + stamp + '">' + question + '</label>' +
                        '<div class="form-group col-7">' +
                        '<textarea name="'+stamp+'" id="' + stamp + '" class="form-control" rows="3" required></textarea>' +
                        '</div>' +
                        '</div>' +
                        '<div class="col-1 move" data-identifier="' + stamp + '"  data-direction="up"><span class="alert alert-warning glyphicon glyphicon-circle-arrow-up"></span></div>' +
                        '<div class="col-10 delete" data-identifier="' + stamp + '"><span class="col-12 alert alert-danger glyphicon glyphicon-remove"></span></div>' +
                        '<div class="col-1 move" data-identifier="' + stamp + '"  data-direction="down"><span class="alert alert-warning glyphicon glyphicon-circle-arrow-down"></span></div>' +
                        '</div>');
                } else {
                    newform.append('<div class="row col-12 '+stamp+'" data-identifier="' + stamp + '">' +
                        '<div class="row col-12"><label class="col-4 col-form-label" for="' + stamp + '">' + question + '</label>' +
                        '<div class="form-group col-7">' +
                        '<textarea name="'+stamp+'" id="' + stamp + '" class="form-control" rows="3"></textarea>' +
                        '</div>' +
                        '</div>' +
                        '<div class="col-1 move" data-identifier="' + stamp + '"  data-direction="up"><span class="alert alert-warning glyphicon glyphicon-circle-arrow-up"></span></div>' +
                        '<div class="col-10 delete" data-identifier="' + stamp + '"><span class="col-12 alert alert-danger glyphicon glyphicon-remove"></span></div>' +
                        '<div class="col-1 move" data-identifier="' + stamp + '"  data-direction="down"><span class="alert alert-warning glyphicon glyphicon-circle-arrow-down"></span></div>' +
                        '</div>');
                }
                break;
            case 'number':
                if (required === 'yes') {
                    newform.append('<div class="row col-12 '+stamp+'" data-identifier="' + stamp + '">' +
                        '<div class="row col-12"><label class="col-4 col-form-label" for="' + stamp + '">' + question + '</label>' +
                        '<div class="form-group col-3">' +
                        '<input name="'+stamp+'" id="' + stamp + '" class="form-control" type="' + form.type + '" required/>' +
                        '</div>' +
                        '<div class="form-group col-3"></div>' +
                        '</div>' +
                        '<div class="col-1 move" data-identifier="' + stamp + '"  data-direction="up"><span class="alert alert-warning glyphicon glyphicon-circle-arrow-up"></span></div>' +
                        '<div class="col-10 delete" data-identifier="' + stamp + '"><span class="col-12 alert alert-danger glyphicon glyphicon-remove"></span></div>' +
                        '<div class="col-1 move" data-identifier="' + stamp + '"  data-direction="down"><span class="alert alert-warning glyphicon glyphicon-circle-arrow-down"></span></div>' +
                        '</div>');
                } else {
                    newform.append('<div class="row col-12 '+stamp+'" data-identifier="' + stamp + '">' +
                        '<div class="row col-12"><label class="col-4 col-form-label" for="' + stamp + '">' + question + '</label>' +
                        '<div class="form-group col-4">' +
                        '<input name="'+stamp+'" id="' + stamp + '" class="form-control" type="' + form.type + '"/>' +
                        '</div>' +
                        '<div class="form-group col-3"></div>' +
                        '</div>' +
                        '<div class="col-1 move" data-identifier="' + stamp + '"  data-direction="up"><span class="alert alert-warning glyphicon glyphicon-circle-arrow-up"></span></div>' +
                        '<div class="col-10 delete" data-identifier="' + stamp + '"><span class="col-12 alert alert-danger glyphicon glyphicon-remove"></span></div>' +
                        '<div class="col-1 move" data-identifier="' + stamp + '"  data-direction="down"><span class="alert alert-warning glyphicon glyphicon-circle-arrow-down"></span></div>' +
                        '</div>');
                }
                break;
            case 'boolean':
                if (form.required === 'yes') {
                    newform.append('<div class="row col-12 '+stamp+'" data-identifier="' + stamp + '">' +
                        '<div class="row col-12"><label class="col-4 col-form-label" for="' + stamp + '">' + question + '</label>' +
                        '<div class="form-group col-4">' +
                        '<select name="'+stamp+'" id="' + stamp + '" class="form-control" required>' +
                        '<option value="no">No</option>' +
                        '<option value="yes">Yes</option>' +
                        '</select>' +
                        '</div>' +
                        '<div class="form-group col-3"></div>' +
                        '</div>' +
                        '<div class="col-1 move" data-identifier="' + stamp + '"  data-direction="up"><span class="alert alert-warning glyphicon glyphicon-circle-arrow-up"></span></div>' +
                        '<div class="col-10 delete" data-identifier="' + stamp + '"><span class="col-12 alert alert-danger glyphicon glyphicon-remove"></span></div>' +
                        '<div class="col-1 move" data-identifier="' + stamp + '"  data-direction="down"><span class="alert alert-warning glyphicon glyphicon-circle-arrow-down"></span></div>' +
                        '</div>');
                } else {
                    newform.append('<div class="row col-12 '+stamp+'" data-identifier="' + stamp + '">' +
                        '<div class="row col-12"><label class="col-4 col-form-label" for="' + stamp + '">' + question + '</label>' +
                        '<div class="form-group col-4">' +
                        '<select name="'+stamp+'" id="' + stamp + '" class="form-control">' +
                        '<option value="no">No</option>' +
                        '<option value="yes">Yes</option>' +
                        '</select>' +
                        '</div>' +
                        '<div class="form-group col-3"></div>' +
                        '</div>' +
                        '<div class="col-1 move" data-identifier="' + stamp + '"  data-direction="up"><span class="alert alert-warning glyphicon glyphicon-circle-arrow-up"></span></div>' +
                        '<div class="col-10 delete" data-identifier="' + stamp + '"><span class="col-12 alert alert-danger glyphicon glyphicon-remove"></span></div>' +
                        '<div class="col-1 move" data-identifier="' + stamp + '"  data-direction="down"><span class="alert alert-warning glyphicon glyphicon-circle-arrow-down"></span></div>' +
                        '</div>');
                }
                break;

                if ($(this).is(':checked')) {
                    $('.delete').hide();
                    $('.move').hide();
                }
        }

        $("#type").val('');
        $("#question").val('');
        $("#required").val('');

    });

    $('#toggle-controls').change(function()
    {
        if ($(this).is(':checked')) {
            $('.delete').hide();
            $('.move').hide();
        } else{
            $('.delete').show();
            $('.move').show();
        };
    });

    $("#submit_layout").submit(function (e) {
        e.preventDefault();

        var form = $('#newForm');
        var form_type = $('#form_type').val();
        var form_name = $('#form_title').html();
        console.log(form_name);

        var html_raw = form.html();
        html_raw = html_raw.replace(/(\r\n\t|\n|\r\t)/gm, "");

        $(".delete").remove();
        $(".move").remove();

        var html = form.html();
        html = html.replace(/(\r\n\t|\n|\r\t)/gm, "");

        $.ajax({
            method:'POST',
            type: 'POST',
            url: 'update-form',
            data: {
                form_name: form_name,
                form_type: form_type,
                html_template: unescape(html).trim(),
                raw_html: unescape(html_raw).trim(),
                questions: array_of_questions,
            },
            success: setTimeout(function(){ window.location.href = '/update-a-form' }, 1000)
        });
    });
});