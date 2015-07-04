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

    this.$modelsContainer = $('.tableflip__models', this.$element);
    this.$modelsNextControl = $('.tableflip__control--next', this.$modelsContainer);
    this.$modelsPrevControl = $('.tableflip__control--prev', this.$modelsContainer);
    this.$modelLabel = $('.tableflip__label--model', this.$modelsContainer);

    this.$priceLabel = $('.tableflip__label--price', this.$element);

    this.$slidesContainer = $('.tableflip__slides', this.$element);

    // Fetch models from data-attribute
    $.each($('.tableflip__model', this.$modelsContainer), $.proxy(function(index, el) {
      var model = $(el).data('tableflip-model');
      model.base_price = parseInt(model.base_price, 10);
      model.max_length = parseInt(model.max_length, 10);
      model.max_width = parseInt(model.max_width, 10);
      model.min_length = parseInt(model.min_length, 10);
      model.min_width = parseInt(model.min_width, 10);
      model.sqm_price = parseInt(model.sqm_price, 10);
      model.$element = el;
      this.options.models.push(model);
    }, this));
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

      // Setup order
      this.setModel(0);

      // Setup controls
      this.$modelsNextControl.on('click', $.proxy(function(event) {
        event.preventDefault();
        this.setModel('next');
      }, this));
      this.$modelsPrevControl.on('click', $.proxy(function(event) {
        event.preventDefault();
        this.setModel('prev');
      }, this));
    },

    /**
     * setModel method
     * @api public
     */
    setModel: function(index) {

      // If index is a string, evaluate as keyword
      if ( typeof index === "string" ) {
        var keyword = index;
        index = this.options.models.indexOf(this.options.order.model);

        switch (keyword) {
          case 'next':
            if ( index >= this.options.models.length - 1 ) { index = 0; }
            else { index += 1; }
            break;
          case 'prev':
            if ( index <= 0 ) { index = this.options.models.length - 1; }
            else { index -= 1; }
            break;
        }
      }

      this.options.order.model = this.options.models[index];
      this.refreshUI();
    },

    /**
     * getModel method
     * @api public
     */
    getModel: function() {
      return this.options.order.model;
    },

    /**
     * getPrice method
     * @api public
     */
    getPrice: function() {
      var model = this.options.order.model;
      return model.base_price + (model.sqm_price * this.getSqm());
    },

    /**
     * getSqm method
     * @api public
     */
    getSqm: function() {
      var model = this.options.order.model;
      return model.min_length * model.min_width / 1000000; // convert mm to m
    },

    /**
     * refreshUI method
     * @api public
     */
    refreshUI: function() {
      console.log(this.getModel());
      this.$modelLabel.html(this.options.order.model.name);
      this.$priceLabel.html(this.getPrice());

      var position = $(this.options.order.model.$element).position();
      this.$slidesContainer.css('left', (position.left * -1));
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
    $('.' + NAMESPACE).each(function () {
      $(this)[NAMESPACE]();
    });
  });

}(this, this.document, this.jQuery));
