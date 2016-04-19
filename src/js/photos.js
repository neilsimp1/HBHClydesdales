$(document).ready(function(){
    let url = 'http://fb-albums.azurewebsites.net/1597977573813887/albums';
    
    $.getJSON(url, function(albums){

		albums.forEach(function(album, index){
            $('.fb-albums-list').append($('<li><a class="album pointer">' + album.name + '</a></li>'));
            
            let $li = $('<li>')
                , $container = $('<div class="container-fluid">')
                , $row = $('<div class="row">');
            
            album.photos.forEach(function(photo){
                $row.append('<div class="col-xs-6 col-sm-3"><a href="#" class="thumbnail" data-src="'
                    + photo.src + '" data-hint="' + (photo.name !== 'undefined'? photo.name: '') + '"><img src="'
                    + photo.thumb + '" class="img-responsive"></a></div>');
            });

			if(index === 0){if(albums.length) $('#loading').remove();}
            
            $container.append($row);
            $li.append($container);
            $('.fb-albums').append($li);
        });

		//open first album
        document.querySelector('.fb-albums-list li a').classList.add('active');
		let firstAlbum = document.querySelector('.fb-albums li');
		firstAlbum.style.display = 'list-item';
		let count = 0, firstAlbumCount = $(firstAlbum).find('img').length;
		$(firstAlbum).find('img').each(function(){
			this.onload = function(){
				count++;
				if(count === firstAlbumCount) fixHeight();
			}
		});
    });
    
    
    //album switch
    $('.fb-albums-list').on('click', '.album', function(){
        if(this.className.indexOf('active') !== -1) return;
        
        $('.fb-albums-list li a.active').removeClass('active');
        this.classList.add('active');
        
        $('.fb-albums li').css('display', 'none');
        $('.fb-albums').children().eq($(this).parent().index()).css('display', 'list-item');
        
        fixHeight();
    });
    
    //show modal
    $('.fb-albums').on('click', '.thumbnail', function(){
        let img = $('<img src="' + $(this).data('src') + '" class="img-responsive">');
        $('#modal_pic_body').html('').append(img);
        $('#modal_pic').modal('show');
    });

	function fixHeight(){
		let height = 0;
		let $pics = $('a.thumbnail:visible');
        $pics.each(function(){
            if(this.clientHeight > height) height = this.clientHeight;
        });
		$pics.css('height', height);
	}

});