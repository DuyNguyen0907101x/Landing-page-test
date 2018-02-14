$(function() {
  $('.partners-slider').slick({
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: '<button class="slick-prev slick-arrow" aria-label="Previous"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
    nextArrow: '<button class="slick-next slick-arrow" aria-label="Next"><i class="fa fa-angle-right" aria-hidden="true"></i></button>'
  });

  $('.features-slider').slick({
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '10px'
  });
});