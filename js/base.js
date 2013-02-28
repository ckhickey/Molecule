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
          bindLinksToLoadNewSections();
        });
    }
    return false;
  });
}

jQuery(document).ready(function($){
  
  //run the function above to setup the links to the different sections
  bindLinksToLoadNewSections();
  
});