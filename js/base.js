var videoheight, videowidth;
var readyToNavigate = {
			videoReady			: false,
			linksReady			: false,
			centerContainer	: false
};

/**
 * This function links to other sections, and loads them into the #container div
 */
function bindLinksToLoadNewSections(elm){
  jQuery(elm).on('click', function(e){
		var href = $(this).attr('href') || null;
		var fade = $(this).data('transition') || null;
		var speed = $(this).data('transitionspeed') || null;
		if(href.substr(0, 4) != 'http' && href != null){//make sure this isn't an external link
			e.preventDefault();
			if(fade !== null && ("fadeout" == fade.toLowerCase() || "fadeinout" == fade.toLowerCase())){
				if(speed == null){ speed = 500; }
				jQuery('#container').stop().animate({'opacity': 0}, speed, function(){
					if(readyToNavigate.videoReady && readyToNavigate.linksReady && readyToNavigate.centerContainer){
						goToNextSection(href, fade, speed);
					} else {
						setTimeout(goToNextSection.call(window, href, fade, speed), 500);
					}
					
				});
			} else {
				if(readyToNavigate.videoReady && readyToNavigate.linksReady && readyToNavigate.centerContainer){
					goToNextSection(href, fade, speed);
				} else {
					setTimeout(goToNextSection.call(window, href, fade, speed), 500);
				}
			}
		}	
		return false;
	});
	readyToNavigate.linksReady = true;
}

function goToNextSection(href, fade, speed){
	
	readyToNavigate.videoReady = false;
	soundManager.stopAll();
	//This line is where you put the function to fade out any sound file that might be playing
	jQuery.ajax({url:href,dataType:'html'}).done(
		function(data){
			jQuery('#container').html(data);
			if(fade != null && ("fadein" == fade.toLowerCase() || "fadeinout" == fade.toLowerCase())){
				jQuery('#container').stop().animate({'opacity':1}, speed, function(){
					bindLinksToLoadNewSections('#container a');
				});
			} else{
				jQuery('#container').css({'opacity':1});
				bindLinksToLoadNewSections('#container a');
			}
		
	}).fail(
		function(jqXHR, why) { 
			console.log(jqXHR); 
	});
}

function centerVideos(){
		
	//retrieve the sizes that are set on the video tag
	videoheight = 1080;//$('video').eq(0).attr('height');
	videowidth = 1920;//$('video').eq(0).attr('width');

	//convert them to numbers, default to 1920x1080
	//videowidth = (videowidth.match(/\%/) || videowidth.match(/auto/)) ? 1920 : videowidth;
	//videoheight = (videoheight.match(/\%/) || videoheight.match(/auto/) || videowidth == 1920) ? 1080 : videoheight;
	
	//now that we have the sizes, make it responsive
	//$('video, video object, video embed, video img').attr('width', '100%').attr('height', 'auto');
	
	console.log("Window width: " + $(window).width() + ", Window height: " + $(window).height() + ", VideoWidth: " + videowidth + ", VideohHeight: " + videoheight);
	//vertically center the container
	if($(window).width() * videoheight/videowidth > $(window).height()){
		$('#container').css({'width':Math.floor($(window).height() * videowidth/videoheight), 'height':$(window).height(), 'left':($(window).width() - Math.floor($(window).height() * videowidth/videoheight))/2, 'top':0});
	} else {
		$('#container').css({'width':'100%', 'height': Math.floor($(window).width() * videoheight/videowidth), 'top':($(window).height() - Math.floor($(window).width() * videoheight/videowidth))/2, 'left':0});
	}
	
	$(window).on('resize', function(){
		if($(window).width() * videoheight/videowidth > $(window).height()){
  		$('#container').css({'width':Math.floor($(window).height() * videowidth/videoheight), 'height':$(window).height(), 'left':($(window).width() - Math.floor($(window).height() * videowidth/videoheight))/2, 'top':0});
		} else {
  		$('#container').css({'width':'100%', 'height': Math.floor($(window).width() * videoheight/videowidth), 'top':($(window).height() - Math.floor($(window).width() * videoheight/videowidth))/2, 'left':0});
		}
	})
	
	readyToNavigate.centerContainer = true;
}

jQuery(document).ready(function($){
  

  centerVideos();
  //run the function above to setup the links to the different sections
  bindLinksToLoadNewSections('a');
  
});