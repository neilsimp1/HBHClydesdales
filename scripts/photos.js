'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

$(document).ready(function () {

	//window.fbAsyncInit = function() {
	//	FB.init({
	//		appId: '103316603396090'//test
	//		//appId: '103311900063227'//prod
	//		,xfbml: true
	//		,version: 'v2.5'
	//	});

	//	FB.getLoginStatus(function(response){
	//		FB.api(
	//			'/1598011883810456/photos'
	//			,'POST'
	//			,{
	//				source: '{image-data}'
	//			}
	//			,function(response){
	//				if(response && !response.error){
	//					let asd = 123;

	//				}
	//			}
	//		)
	//	});
	//};
	////<iframe src="//embedsocial.com/facebook_album/album_photos/1598011883810456"

	//(function(d, s, id){
	//	let js, fjs = d.getElementsByTagName(s)[0];
	//	if(d.getElementById(id)) return;
	//	js = d.createElement(s);
	//	js.id = id;
	//	js.src = '//connect.facebook.net/en_US/sdk.js';
	//	fjs.parentNode.insertBefore(js, fjs);
	//}(document, 'script', 'facebook-jssdk'));
});

$(document).ready(function () {
	$('.fb-albums').FacebookAlbumBrowser(_defineProperty({
		account: '1597977573813887'
		//,accessToken: '0951d59b81f52e9dfcc8bf936e25f74a'
		, showComments: true,
		commentsLimit: 3,
		showAccountInfo: true,
		showImageCount: true,
		showImageText: true,
		shareButton: false,
		albumsPageSize: 0,
		photosPageSize: 0,
		lightbox: true,
		photosCheckbox: true,
		pluginImagesPath: '/assets/',
		likeButton: false
	}, 'shareButton', false));
});