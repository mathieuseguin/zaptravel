$(document).ready(function() {
  
var flipbook = $("#flipbook"),
    current_page,
    current_page_index = 1,
    url = 'http://zaptravel.no-ip.org/data.json?callback=?',

    newPage = function() {
      var $page = $("<div/>").html('<div class="gradient"></div>').appendTo("#flipbook");
      current_page = $("<div/>", {class: "page_wrapper"}).appendTo($page);
      addToPage($("<p>", {class: "page_number", text: current_page_index}));
      current_page_index++;
      return current_page;
    },
    
    newBlankPage = function() {
      $("<div/>", {class: "hard blank_page"}).html('<div class="gradient"></div>').appendTo("#flipbook");
      current_page_index++;
    }
  
    imgURL = function(slide) {
      return "http://assets.zaptravel.com/theme/" + slide["root"] + "-" + slide["assetkey"] + "-657360." + slide["extension"];
    },
  
    addToPage = function(element) {
      element.appendTo(current_page);        
    },
  
    initFlipbook = function(data) {
      newBlankPage();

      $.each(data, function(index, place) {
        $.each(place["slides"], function(index, slide) {          
          if (slide["root"] && slide["assetkey"] && slide["extension"]) {
            newPage();
            addToPage($("<div/>", {class: "header"}).html("<h2>" + place.title["en"] + "</h2>"));
            addToPage($("<img/>", {src: imgURL(slide)}));
          } else if (slide["quote"] && slide["quote"]["en"]) {
            addToPage($("<p/>", {text: slide["quote"]["en"]}));
          }
        });
      });
      
      newBlankPage();
    
      flipbook.turn({
    		width: 860,
    		height: 600,
    		autoCenter: true,
    		turnCorners: "bl,br"
    	});
  	
    	$('<div class="next-button"></div> <div class="previous-button"></div>').prependTo(flipbook);
        
      flipbook.find('.next-button').mouseover(function() {
  			$(this).addClass('next-button-hover');
  		}).mouseout(function() {
  			$(this).removeClass('next-button-hover');
  		}).mousedown(function() {
  			$(this).addClass('next-button-down');
  			return false;
  		}).mouseup(function() {
  			$(this).removeClass('next-button-down');
  		}).click(function() {
  			flipbook.turn('next');
  		});

  		flipbook.find('.previous-button').mouseover(function() {
  			$(this).addClass('previous-button-hover');
  		}).mouseout(function() {
  			$(this).removeClass('previous-button-hover');
  		}).mousedown(function() {
  			$(this).addClass('previous-button-down');
  			return false;
  		}).mouseup(function() {
  			$(this).removeClass('previous-button-down');
  		}).click(function() {
  			flipbook.turn('previous');
  		});
    };

  $.ajax({
     type: 'GET',
      url: url,
      async: false,
      jsonpCallback: 'loadJSON',
      contentType: "application/json",
      dataType: 'jsonp',
      success: function(data) { initFlipbook(data); }
  });

});
