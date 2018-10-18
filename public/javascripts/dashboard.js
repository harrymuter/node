$(function(){
    $('#markAsVisited').click(function(){
        $.ajax({
            url: 'mark-as-visited',
            type: 'POST',
        });
    });
});
$(function() {
    $('#toggleView').click(function(){
        $.ajax({
            url: 'toggle-view',
            type: 'POST',
            success: function() {
                location.reload();
            }
        });
    });
});


$('#headingOne').on('click',function() {
    var icon = $('#headingOneIcon');
    if($('#collapseOne').hasClass('show')) {
        icon.removeClass('glyphicon-minus');
        icon.addClass('glyphicon-plus');
    } else {
        icon.removeClass('glyphicon-plus');
        icon.addClass('glyphicon-minus');
    }
});

$('#headingTwo').on('click',function() {
    var icon = $('#headingTwoIcon');
    if($('#collapseTwo').hasClass('show')) {
        icon.removeClass('glyphicon-minus');
        icon.addClass('glyphicon-plus');
    } else {
        icon.removeClass('glyphicon-plus');
        icon.addClass('glyphicon-minus');
    }
});

$('#headingThree').on('click', function() {
    var icon = $('#headingThreeIcon');
    if($('#collapseThree').hasClass('show')) {
        icon.removeClass('glyphicon-minus');
        icon.addClass('glyphicon-plus');
    } else {
        icon.removeClass('glyphicon-plus');
        icon.addClass('glyphicon-minus');
    }
});