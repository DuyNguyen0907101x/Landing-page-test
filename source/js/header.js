$(function() {
  $(window).on('scroll', function() {
    if ($(this).width() < 768) {
      return;
    }

    var $navbar = $('.main-header').find('.navbar');
    if ($(this).scrollTop() > 100) {
      $navbar.addClass('scrolling');
    } else {
      $navbar.removeClass('scrolling');
    }
  });
});