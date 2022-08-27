$(document).ready(function() {
  $('.detail__personalization .bookslider__list').slick({
    dots: false,
    arrows: true,
    prevArrow: '<button class="bookslider__arrow bookslider__arrow_prev"></button>',
    nextArrow: '<button class="bookslider__arrow bookslider__arrow_next"></button>',
    slidesToShow: 5,
    slidesToScroll: 5,
    infinite: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: false,
        }
      }
    ]
  });

  $('.wishmodal__dropdown-select').select2({
    width: '100%',
    placeholder: 'Select wishlist',
    dropdownCssClass: 'dropdown__container dropdown__container_large',
    selectionCssClass: 'dropdown__selection',
    minimumResultsForSearch: -1
  });
});