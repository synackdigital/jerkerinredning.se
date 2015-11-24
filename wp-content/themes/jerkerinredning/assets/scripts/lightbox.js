;(function(window, document, $, undefined) {

  'use strict';

  /**
   * Plugin NAMESPACE
   * @type {String}
   * @api private
   */
  var NAMESPACE = 'jrk.lightbox';

  /**
   * Plugin SELECTOR
   * @type {String}
   * @api private
   */
  var SELECTOR = '[data-lightbox]';

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
    },

    /**
     * Create method
     */
    create: function() {
      var elOffset = this.$element.offset();
      var $window = $(window);
      this.$overlay = $('<div class="overlay is-hidden">').appendTo('body').css({
        'top': elOffset.top,
        'left': elOffset.left,
        'width': this.$element.outerWidth(),
        'height': this.$element.outerHeight()
      });
      $('body').addClass('is-locked');
      setTimeout($.proxy(function() {
        this.$overlay.removeClass('is-hidden').css({
          'top': '0',
          'left': '0',
          'width': $window.outerWidth(),
          'height': $window.outerHeight()
        });
      }, this), 1);
      this.$overlay.on('click', $.proxy(this.destroy, this));
    },

    /**
     * Destroy method
     */
    destroy: function() {
      this.$overlay.addClass('is-hidden');
      $('body').removeClass('is-locked');
      setTimeout($.proxy(function() {
        this.$overlay.remove();
      }, this), 1000);
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
