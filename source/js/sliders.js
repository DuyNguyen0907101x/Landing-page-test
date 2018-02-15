$(function() {
  var prevArrow = '<button class="slick-prev slick-arrow" aria-label="Previous"><i class="fa fa-angle-left" aria-hidden="true"></i></button>';
  var nextArrow = '<button class="slick-next slick-arrow" aria-label="Next"><i class="fa fa-angle-right" aria-hidden="true"></i></button>';

  $('.shops-slider').slick({
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    prevArrow: prevArrow,
    nextArrow: nextArrow,
    responsive: [{
      breakpoint: 576,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3
      }
    }]
  });

  $('.iphone-slider').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true
  });

  // Action
  $('.iphone-slider-prev').on('click', function(e) {
    e.preventDefault();

    $('.iphone-slider').slick('slickPrev');
  });
  $('.iphone-slider-next').on('click', function(e) {
    e.preventDefault();

    $('.iphone-slider').slick('slickNext');
  });

  $('.features-slider').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '10px',
    prevArrow: prevArrow,
    nextArrow: nextArrow,
    responsive: [{
      breakpoint: 576,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }, {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }]
  });

  $('.partners-slider').slick({
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: prevArrow,
    nextArrow: nextArrow
  });
});