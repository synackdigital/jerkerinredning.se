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
    this.$modelsSlides = $('.tableflip__slides', this.$modelsContainer);
    this.$modelsNextControl = $('.tableflip__control--next', this.$modelsContainer);
    this.$modelsPrevControl = $('.tableflip__control--prev', this.$modelsContainer);
    this.$modelLabel = $('.tableflip__label--model', this.$modelsContainer);

    this.$materialsContainer = $('.tableflip__materials', this.$element);

    this.$priceLabel = $('.tableflip__label--price', this.$element);

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

    // Fetch models from data-attribute
    $.each($('.tableflip__material', this.$materialsContainer), $.proxy(function(index, el) {
      var material = $(el).data('tableflip-material');
      material.price_modifier = parseFloat(material.price_modifier, 10);
      material.$element = el;
      this.options.materials.push(material);
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
      this.setMaterial(0, true);

      console.log(this.options.models);
      console.log(this.options.materials);

      // Setup controls
      this.$modelsNextControl.on('click', $.proxy(function(event) {
        event.preventDefault();
        this.setModel('next', true);
      }, this));
      this.$modelsPrevControl.on('click', $.proxy(function(event) {
        event.preventDefault();
        this.setModel('prev', true);
      }, this));
      $('.tableflip__material', this.$materialsContainer).on('click', $.proxy(function(event){
        this.setMaterial($('.tableflip__material', this.$materialsContainer).index(event.currentTarget), true);
      }, this));
    },

    /**
     * setModel method
     * @api public
     */
    setModel: function(index, refresh) {

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

      if (refresh) {
        this.refreshUI();
      }
    },

    /**
     * getModel method
     * @api public
     */
    getModel: function() {
      return this.options.order.model;
    },

    /**
     * setMaterial method
     * @api public
     */
    setMaterial: function(index, refresh) {
      this.options.order.material = this.options.materials[index];

      if (refresh) {
        this.refreshUI();
      }
    },

    /**
     * getMaterial method
     * @api public
     */
    getMaterial: function() {
      return this.options.order.material;
    },

    /**
     * getPrice method
     * @api public
     */
    getPrice: function() {
      var model = this.options.order.model;
      var material = this.options.order.material;
      return (model.base_price + (model.sqm_price * this.getSqm())) * material.price_modifier;
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
      console.log(this.getMaterial());

      this.$modelsSlides.css('height', $(this.options.order.model.$element).outerHeight());

      // Update labels
      this.$modelLabel.html(this.options.order.model.name);
      this.$priceLabel.html(this.getPrice());

      // Set selected class
      $('.tableflip__material', this.$materialsContainer).removeClass('selected');
      $(this.options.order.material.$element).addClass('selected');

      // Slide model image into view
      var position = $(this.options.order.model.$element).position();
      this.$modelsSlides.css('left', (position.left * -1));
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
