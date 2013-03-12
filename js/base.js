var videoheight, videowidth;

/**
 * This function links to other sections, and loads them into the #container div
 */
function bindLinksToLoadNewSections(){
  jQuery('a').on('click', function(e){
    var href = $(this).attr('href') || null;
    if(href.substr(0, 4) != 'http' && href != null){//make sure this isn't an external link
      e.preventDefault();
      jQuery.ajax({url:href,dataType:'html'}).done(
        function(data){
          jQuery('#container').html(data);
          //centerVideos();
          bindLinksToLoadNewSections();
        });
    }
    return false;
  });
}

function centerVideos(){
	//retrieve the sizes that are set on the video tag
	videoheight = $('video').eq(0).attr('height');
	videowidth = $('video').eq(0).attr('width');

	//convert them to numbers, default to 1920x1080
	videowidth = (videowidth.match(/\%/) || videowidth.match(/auto/)) ? 1920 : videowidth;
	videoheight = (videoheight.match(/\%/) || videoheight.match(/auto/) || videowidth == 1920) ? 1080 : videoheight;
	
	//now that we have the sizes, make it responsive
	$('video, video object, video img').attr('width', '100%').attr('height', 'auto');
	
	console.log("Window height: " + $(window).height() + ", Window width: " + $(window).width() + ", videowidth: " + videowidth + ", videoheight: " + videoheight);
	//vertically center the container
	if($(window).width() * videoheight/videowidth > $(window).height){
		$('#container').css({'width':Math.floor($(window).height() * videowidth/videoheight), 'height':$(window).height, 'left':($(window).width() - videowidth)/2});
	} else {
		$('#container').css({'width':'100%', 'height': Math.floor($(window).width() * videoheight/videowidth), 'top':($(window).height() - Math.floor($(window).width() * videoheight/videowidth))/2});
	}
	
	$(window).on('resize', function(){
		if($(window).width() * videoheight/videowidth > $(window).height){
			$('#container').css({'width':Math.floor($(window).height() * videowidth/videoheight), 'height':$(window).height, 'left':($(window).width() - videowidth)/2});
		} else {
			$('#container').css({'width':'100%', 'height': Math.floor($(window).width() * videoheight/videowidth), 'top':($(window).height() - Math.floor($(window).width() * videoheight/videowidth))/2});
		}
	})
}



jQuery(document).ready(function($){
  

  centerVideos();
  //run the function above to setup the links to the different sections
  bindLinksToLoadNewSections();
  
});