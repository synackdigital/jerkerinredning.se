/**
 * (╯°□°）╯︵ ┻━┻
 *
 * @library tableflip
 * @description A (physical) table configurator jQuery plugin
 * @author Fredrik Broman <frebro@gmail.com>
 * @license ISC
 */

;(function(window, document, $, undefined) {

  'use strict';

  /**
   * Plugin NAMESPACE
   * @type {String}
   * @api private
   */
  var NAMESPACE = 'tableflip';

  /**
   * Plugin constructor
   * @param {Node} element
   * @param {Object} [options]
   * @api public
   */
  function Plugin (element, options) {
    this.options = $.extend(true, $.fn[NAMESPACE].defaults, options);
    this.$element = $(element);

    this.$modelsContainer = $('[data-tableflip-models]', this.$element);
    this.$modelsNextBtn = $('[data-tableflip-control="next"]', this.$modelsContainer);
    this.$modelsPrevBtn = $('[data-tableflip-control="prev"]', this.$modelsContainer);
    this.$modelsLabel = $('[data-tableflip-control="label"]', this.$modelsContainer);

    // Fetch models from data-attribute
    $.each($('[data-tableflip-model]', this.$modelsContainer), $.proxy(function(index, el) {
      var model = $(el).data('tableflip-model');
      this.options.models.push(model);
    }, this));

    this.options.order.model = this.options.models[0];
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
      console.log('(╯°□°）╯︵ ┻━┻');

      this.$modelsNextBtn.on('click', $.proxy(function(event) {
        event.preventDefault();
        this.setModel('next');
      }, this));

      this.$modelsPrevBtn.on('click', $.proxy(function(event) {
        event.preventDefault();
        this.setModel('prev');
      }, this));
    },

    setModel: function(keyword) {
      switch (keyword) {
        case 'next':
          console.log('next');
          break;
        case 'prev':
          console.log('prev');
          break;
      }
    },

    getModel: function() {
      return this.options.order.model;
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
  $.fn[NAMESPACE].defaults = {
    models: [],
    materials: [],
    finishes: [],
    order: {
      model: null,
      material: null,
      finish: null,
      price: 0
    }
  };

  /**
   * jQuery plugin data api
   * @api public
   */
  $(window).on('load', function (event) {
    $('[data-' + NAMESPACE + ']').each(function () {
      $(this)[NAMESPACE]();
    });
  });

}(this, this.document, this.jQuery));
