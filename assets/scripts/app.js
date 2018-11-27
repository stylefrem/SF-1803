'use strict';

(function ($, window, document) {

  $(window).on("load", function () {
    /* Loaded */
    $('#status').fadeOut(); // will first fade out the loading animation
    $('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
    $('body').delay(350).css({ 'overflow': 'visible' });

    /* Scrolling Animate */
    $(".navbar-nav a.nav-link, a[href='#top'], .anchor").mPageScroll2id({
      offset: 60,
      scrollSpeed: 800
    });
  });

  /* Shuffle filter */
  var TS_shuffle = [];

  function init() {
    $('.init-filter').each(function (i) {
      var elm = $(this).data('shuffle-id', i);
      TS_shuffle[i] = new Shuffle(elm.find('.js-shuffle').get(0), {
        itemSelector: '.masonry-item',
        sizer: '.masonry-item',
        speed: 650,
        staggerAmount: 50,
        staggerAmountMax: 250
      });
    });
  }

  $(document).on('click', '.filters-button-group button', function (e) {
    e.preventDefault();
    var button = $(this).closest('button'),
        groups = void 0,
        i = void 0;
    if (!button.hasClass('active')) {
      button.addClass('active').siblings().removeClass('active');
      groups = button.data('target');

      i = button.closest('.init-filter').data('shuffle-id');

      if (typeof TS_shuffle[i] !== 'undefined') {
        TS_shuffle[i].filter(function (element) {
          if (groups === '*') {
            return true;
          } else {
            return $(element).hasClass(groups);
          }
        });
      }
    }
    return false;
  });

  $(document).ready(init);

  $(window).scroll(function () {
    /* Sticky */
    var topBar = $('.navbar');
    if ($(this).scrollTop() > 0) {
      topBar.addClass('sticky');
    } else {
      topBar.removeClass('sticky');
    }

    /* Scroll Top */
    var offset = 500;
    var duration = 400;
    if ($(this).scrollTop() > offset) {
      $('.scroll-to-top').fadeIn(duration);
    } else {
      $('.scroll-to-top').fadeOut(duration);
    }
  });

  /* Tooltip */
  $(function () {
    $('[data-toggle="tooltip"]').tooltip();
  });

  /* PhotoSwipe */
  $('.ps-gallery').each(function () {
    var $pswp = $('.pswp')[0];
    var image = [];
    var $pic = $(this),
        getItems = function getItems() {
      var items = [];
      $pic.find('a').each(function () {

        var $href = $(this).attr('data-src'),
            $size = $(this).data('size').split('x'),
            $width = $size[0],
            $height = $size[1];

        var item = {
          src: $href,
          w: $width,
          h: $height,
          el: $(this),
          msrc: $(this).find('img').attr('src'),
          title: $(this).attr('data-caption')
        };
        items.push(item);
      });
      return items;
    };

    var items = getItems();

    $.each(items, function (index, value) {
      image[index] = new Image();
      image[index].src = value['src'];
    });

    $pic.on('click', 'div', function (event) {

      event.preventDefault();
      var $index = $(this).index();

      var options = {
        index: $index,
        bgOpacity: 0.9,
        showHideOpacity: false,
        galleryUID: $(this).parents('.psgal').attr('id'),
        getThumbBoundsFn: function getThumbBoundsFn(index) {
          var image = items[index].el.find('img'),
              offset = image.offset();
          return { x: offset.left, y: offset.top, w: image.width() };
        }
      };

      var lightBox = new PhotoSwipe($pswp, PhotoSwipeUI_Default, items, options);
      lightBox.init();
    });
  });

  /* Slick Carousel */
  $('.slick-carousel').slick();

  /* Form Control */
  $('.g-form .form-control').focusout(function () {
    var any_input = $(this).val();
    if (any_input === "") {
      $(this).removeClass('has-value');
    } else {
      $(this).addClass('has-value');
    }
  });

  /* Copiright Get Full Year */
  $(function () {
    var temp_date = new Date();
    var year = temp_date.getFullYear();
    $('.temp-date').html(year + "&nbsp");
  });
})(jQuery, window, document);
//# sourceMappingURL=app.js.map
