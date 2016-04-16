'use strict';

$(document).ready(function () {
    var url = 'http://fb-albums.azurewebsites.net/1597977573813887/albums';

    $.getJSON(url, function (albums) {

        albums.forEach(function (album, index) {
            $('.fb-albums-list').append($('<li><a class="album pointer">' + album.name + '</a></li>'));

            var $li = $('<li>'),
                $container = $('<div class="container-fluid">'),
                $row = $('<div class="row">');

            album.photos.forEach(function (photo) {
                $row.append('<div class="col-xs-6 col-sm-3"><a href="#" class="thumbnail" data-src="' + photo.src + '" data-hint="' + (photo.name !== 'undefined' ? photo.name : '') + '"><img src="' + photo.thumb + '" class="img-responsive"></a></div>');
            });

            if (index === 0) {
                if (albums.length) $('#loading').slideUp();
            }

            $container.append($row);
            $li.append($container);
            $('.fb-albums').append($li);

            //open first album
            $('.fb-albums-list li a')[0].classList.add('active');
            //$('.fb-albums li:first-of-type')[0].style.display = 'list-item';
            $('.fb-albums li:first-of-type').slideDown();
        });
    });

    //album switch
    $('.fb-albums-list').on('click', '.album', function () {
        if (this.className.indexOf('active') !== -1) return;

        $('.fb-albums-list li a.active').removeClass('active');
        this.classList.add('active');

        $('.fb-albums li').css('display', 'none');
        $('.fb-albums').children().eq($(this).parent().index()).css('display', 'list-item');

        var height = 0;
        $('a.thumbnail:visible').each(function () {
            if (this.clientHeight > height) height = this.clientHeight;
        });
        $('a.thumbnail:visible').css('height', height);
    });

    //show modal
    $('.fb-albums').on('click', '.thumbnail', function () {
        var img = $('<img src="' + $(this).data('src') + '" class="img-responsive">');
        $('#modal_pic_body').html('').append(img);
        $('#modal_pic').modal('show');
    });
});