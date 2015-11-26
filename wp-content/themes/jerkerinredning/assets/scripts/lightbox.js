;(function(window, document, $, undefined) {

  'use strict';

  /**
   * Plugin NAMESPACE
   * @type {String}
   * @api private
   */
  var NAMESPACE = 'jrk.lightbox';

  /**
   * Plugin DATA_ATTRIBUTE
   * @type {String}
   * @api private
   */
  var DATA_ATTRIBUTE = 'lightbox';

  /**
   * Plugin SELECTOR
   * @type {String}
   * @api private
   */
  var SELECTOR = '[data-'+DATA_ATTRIBUTE+']';

  /**
   * Plugin constructor
   * @param {Node} element
   * @param {Object} [options]
   * @api public
   */
  function Plugin (element, options) {
    this.options = $.extend(true, $.fn[NAMESPACE].defaults, options);
    this.$element = $(element);
  }


  /**
   * Plugin prototype
   * @type {Object}
   * @api public
   */
  Plugin.prototype = {
    constructor: Plugin,
    version: '0.1.0',

    /**
     * Init method
     * @api public
     */
    init: function () {
      this.$container = this.$element.wrap('<div class="lightbox">').parent();
      this.$container.on('click', $.proxy(this.create, this));

      this.data = this.$element.data(DATA_ATTRIBUTE);
    },

    /**
     * Create method
     */
    create: function() {
      var elOffset = this.$element.offset();
      var $window = $(window);

      // Lock <body> scrolling
      $('body').addClass('is-locked');

      // Create overlay and append to end of <body>
      this.$overlay = $('<div class="overlay is-hidden">').appendTo('body').css({
        'top': elOffset.top,
        'left': elOffset.left,
        'width': this.$element.outerWidth(),
        'height': this.$element.outerHeight()
      });

      // Modify overlay props inside a timeout to ensure css transitions
      setTimeout($.proxy(function() {
        this.$overlay.removeClass('is-hidden').css({
          'top': '0',
          'left': '0',
          'width': '100%',
          'height': '100%'
        });
      }, this), 1);

      // Destroy slideshow on overlay click
      this.$overlay.on('click', $.proxy(function(e) {
        if (e.target === this.$overlay[0]) {
          this.destroy();
        }
      }, this));

      // Initialise SlickSlider after css transition ends
      setTimeout($.proxy(function() {
        this.initSlickSlider();
      }, this), 1000 /* Must equal or supersede css transition duration */ );
    },

    /**
     * Destroy method
     */
    destroy: function() {

      // Re-enable <body> scrolling
      $('body').removeClass('is-locked');

      // Animate out overlay
      this.$overlay.addClass('is-hidden');
      setTimeout($.proxy(function() {

        // Destroy SlickSlider
        this.$slider.slick('unslick');

        // Remove overlay
        this.$overlay.remove();

      }, this), 1000 /* Must equal or supersede css transition duration */ );
    },

    /**
     * InitSlickSlider method
     */
    initSlickSlider: function() {
      var windowHeight = $(window).outerHeight();

      // Create slider container and append images
      this.$slider = $('<div>').appendTo(this.$overlay);
      $.each(this.data, $.proxy(function(i, el) {
        $('<div><img src="'+el.url+'"></div>').appendTo(this.$slider);
      }, this));
      $.each($('>div', this.$slider), function(i, el) {
        $(el).css('height', windowHeight);
      });

      // Initialise SlickSlider on overlay
      this.$slider.slick({
        slidesToShow: 1
      });
    },

    stopEventPropagation: function(e) {
      e.stopPropagation();
    }
  };

  /**
   * jQuery plugin definition
   * @param  {String} [method]
   * @param  {Object} [options]
   * @return {Object}
   * @api public
   */
  $.fn[NAMESPACE] = function (method, options) {
    return this.each(function () {
      var $this = $(this),
      data = $this.data(NAMESPACE);
      options = (typeof method === 'object') ? method : options;
      if (!data) {
        $this.data(NAMESPACE, (data = new Plugin(this, options)));
      }
      data[(typeof method === 'string') ? method : 'init']();
    });
  };

  /**
   * jQuery plugin defaults
   * @type {Object}
   * @api public
   */
  $.fn[NAMESPACE].defaults = {};

  /**
   * jQuery plugin data api
   * @api public
   */
  $(window).on('load', function (event) {
    $(SELECTOR).each(function () {
      $(this)[NAMESPACE]();
    });
  });

}(this, this.document, this.jQuery));
