$(document).ready(function(a) {   
      $("#app > footer").hover(function(){
        $("#app > footer").addClass("hover-footer");
        }, function(){
        $("#app > footer").removeClass("hover-footer");
      });
      
 });

// Show filters on Catalog Page
$(document).ready(function(b) {
  $(document).on("click", "#filters-wrapper > div.filter-content > div.filters > div.show-filter > svg",function() {
    $("#wrapper-catalog").addClass("hover-filter");
    $("#filters-wrapper > div.filter-content > div.filters > div.hide-filter").css("display", "flex");
    $("#filters-wrapper > div.filter-content > div.filters > div.show-filter").css("display", "none");
  });
});

$(document).ready(function(c) {
  $(document).on("click","#filters-wrapper > div.filter-content > div.filters > div.hide-filter > svg",function() {
    $("#wrapper-catalog").removeClass("hover-filter");
    $("#filters-wrapper > div.filter-content > div.filters > div.hide-filter").css("display", "none");
    $("#filters-wrapper > div.filter-content > div.filters > div.show-filter").css("display", "flex");
  });
});

// Show filters on Portfolio
$(document).ready(function(z) {
  $(document).on("click","#element-wrapper > div.section-filter-container-portfolio > div.filters-portfolio > div.show-filter-portfolio > svg",function() {
    $("#portfolio-wrapper").addClass("hover-filter-portfolio");
    $("#element-wrapper > div.section-filter-container-portfolio > div.filters-portfolio > div.hide-filter-portfolio").css("display", "flex");
    $("#element-wrapper > div.section-filter-container-portfolio > div.filters-portfolio > div.show-filter-portfolio").css("display", "none");
  });
});

$(document).ready(function(q) {
  $(document).on("click","#element-wrapper > div.section-filter-container-portfolio > div.filters-portfolio > div.hide-filter-portfolio > svg",function() {
    $("#portfolio-wrapper").removeClass("hover-filter-portfolio");
    $("#element-wrapper > div.section-filter-container-portfolio > div.filters-portfolio > div.hide-filter-portfolio").css("display", "none");
    $("#element-wrapper > div.section-filter-container-portfolio > div.filters-portfolio > div.show-filter-portfolio").css("display", "flex");
  });
});


// Professionalisme Changement CSS
$(document).on("mouseover", "#wrapper-about-main-bloc > div > div > div.trust-brand > div.items-of-trust-one > div > div", function() {;
  $("#Path_478").css('opacity', '0.3');
  $("#Group_455").css('opacity', '0.3');
  $("#wrapper-about-main-bloc > div > div > div.trust-brand > div.items-of-trust-two").css('opacity', '0.3');
  $("#wrapper-about-main-bloc > div > div > div.trust-brand > div.items-of-trust-three").css('opacity', '0.3');
});

$(document).on("mouseout", "#wrapper-about-main-bloc > div > div > div.trust-brand > div.items-of-trust-one > div > div", function() {
  $("#Path_478").css('opacity', '1');
  $("#Group_455").css('opacity', '1');
  $("#wrapper-about-main-bloc > div > div > div.trust-brand > div.items-of-trust-two").css('opacity', '1');
  $("#wrapper-about-main-bloc > div > div > div.trust-brand > div.items-of-trust-three").css('opacity', '1');
});


// Diversité changement CSS
$(document).on("mouseover", "#wrapper-about-main-bloc > div > div > div.trust-brand > div.items-of-trust-two > div > div", function() {
  $("#Path_477").css({ opacity: 0.3 });;
  $("#Group_455").css('opacity', '0.3');
  $("#wrapper-about-main-bloc > div > div > div.trust-brand > div.items-of-trust-one").css('opacity', '0.3');
  $("#wrapper-about-main-bloc > div > div > div.trust-brand > div.items-of-trust-three").css('opacity', '0.3');
});

$(document).on("mouseout", "#wrapper-about-main-bloc > div > div > div.trust-brand > div.items-of-trust-two > div > div", function() {
  $("#Path_477").css('opacity', '1');
  $("#Group_455").css('opacity', '1');
  $("#wrapper-about-main-bloc > div > div > div.trust-brand > div.items-of-trust-one").css('opacity', '1');
  $("#wrapper-about-main-bloc > div > div > div.trust-brand > div.items-of-trust-three").css('opacity', '1');
});

// Confiance changement CSS
$(document).on("mouseover", "#wrapper-about-main-bloc > div > div > div.trust-brand > div.items-of-trust-three > div > div", function() {
  $("#wrapper-about-main-bloc > div > div > div.trust-brand > div.items-of-trust-one").css('opacity', '0.3');
  $("#wrapper-about-main-bloc > div > div > div.trust-brand > div.items-of-trust-two").css('opacity', '0.3');
});

$(document).on("mouseout", "#wrapper-about-main-bloc > div > div > div.trust-brand > div.items-of-trust-three > div > div", function() {
  $("#wrapper-about-main-bloc > div > div > div.trust-brand > div.items-of-trust-one").css('opacity', '1');
  $("#wrapper-about-main-bloc > div > div > div.trust-brand > div.items-of-trust-two").css('opacity', '1');});

  $(window).scroll(function() {
    if ($(this).scrollTop()) {
        $('#back-to-top').fadeIn();
        $('#back-to-top').css("display", "flex");
    } else {
        $('#back-to-top').fadeOut();
    }
});

$("#toTop").click(function() {
    $("html, body").animate({scrollTop: 10}, 10000);
 });

$(document).on("mouseover", "#back-to-top", function() {
$("#back-to-top").addClass("back-to-top-hover");
  
});

$(document).on("mouseout", "#back-to-top", function() {
$("#back-to-top").removeClass("back-to-top-hover");
});