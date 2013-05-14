var all_data;
var place = 0;
jQuery(document).ready(function() {
  var base = window.Drupal.settings.basePath;
    $.ajax({
      url: base + 'accordion_module/setup/' + place,
      async:false,
      success: function(data, status, xhr) {
        all_data = data;
        build_form();
        init_rotator();
      },
      error: function() {
          alert("Please Login to site");
      },
      dataType: 'json'
    });
  }); 

function build_form() {
  var img_path = window.parent.Drupal.settings.accordion_module.linkpath;
    console.log(img_path);
    var total = all_data["content"].length;
    for(var i = 0;i<6;i++) {
     //alert(i);
      $('#slider').append("<li></li>");
      $('#slider').children("li").eq(i).append("<img src='" + all_data["content"][i].img_url + "' alt=''/>");
      console.log("added image");
      // Create the div
      $('#slider').children("li").eq(i).append("<div><strong>'" + all_data["content"][i].title + "'</strong><p>'" + all_data["content"][i].description + "'</p></div>");
    }
    
  }

/**
 * Adds buttons to the accordion for navigation.
 */
function add_buttons() {
  var img_path = window.parent.Drupal.settings.accordion_module.linkpath;
 // $('#button_holder').append("<div id='accordion_button previous' class='prev_accordion_button' normal='" + img_path + "/images/ui/next_button.png' over='" + img_path + "/images/ui/next_button_over.png'></div>");
 // $('#button_holder').append("<a id='btn_right' class='accordion_button next' normal='" + img_path + "/images/ui/next_button.png' over='" + img_path + "/images/ui/next_button_over.png'></a>");
  $('#button_holder').append("<input type='image' id='btn_next' src='" + img_path + "/images/ui/next_button.png' style='border:none;width:48px;height:48px;'");
  //buttonsClass("div.social_button");
  //buttonsClass("div.accordion_button");
 // $('.next_accordion_button').css("background-image", "url(" + img_path + "/images/ui/previous_button.png)");
  //$('.next_accordion_button').css("hover", "url(" + img_path + "/images/ui/previous_button_over.png)");
  //$span.css("background-image", "url("+over+")");
}

/**
 * Initilize the rotator, and add the buttons afterward
 */
function init_rotator() {
	
  $("#slider").zAccordion({
    tabWidth: 100,
    speed: 650,
    slideClass: 'slider',
    animationStart: function () {
      $('#slider').find('li.slider-open div').css('display', 'none');
      $('#slider').find('li.slider-previous div').css('display', 'none');
    },
    animationComplete: function () {
      $('#slider').find('li div').fadeIn(600);
    },
    width: $('#content').width(),//900,
    height: 330
  });
  
  add_buttons();
}

/**
 * @file
 * Appearance logic for the rotator buttons
 */
function buttonsClass(classButton) {
  //NEXT OVER
	console.log("button class");
  $(classButton).append('<span class="hover"></span>').each(function () {  
    var $span = $('span.hover', this);
    var normal = $(this).attr("normal");
    var over = $(this).attr("over");

    $(this).css("background-image", "url("+normal+")");
    $span.css("background-image", "url("+over+")");
    fnFixPng($span);
    $span.css('opacity', 0);
    $(this).hover(function () { 
      if(!$(this).hasClass('disabled'))
       $span.stop().fadeTo(500, 1);   
      }, function () {  
       $span.stop().fadeTo(500, 0); 
    });
  }); 
};
  

