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

    this.$widthControl = $('.tableflip__control--width', this.$element);
    this.$widthLabel = $('.tableflip__label--width', this.$element);
    this.$lengthControl = $('.tableflip__control--length', this.$element);
    this.$lengthLabel = $('.tableflip__label--length', this.$element);

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
      this.setWidth(1100);
      this.setLength(2200);
      this.setMaterial(0, true);

      // Setup controls
      this.$modelsNextControl.on('click', $.proxy(function(event) {
        event.preventDefault();
        this.setModel('next', true);
      }, this));

      this.$modelsPrevControl.on('click', $.proxy(function(event) {
        event.preventDefault();
        this.setModel('prev', true);
      }, this));

      this.$widthControl.on('input', $.proxy(function(event) {
        event.preventDefault();
        this.setWidth(event.currentTarget.value, true);
      }, this));

      this.$lengthControl.on('input', $.proxy(function(event) {
        event.preventDefault();
        this.setLength(event.currentTarget.value, true);
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

      // Update dimensions to fit the new model's max/min
      this.setWidth(this.options.order.width);
      this.setLength(this.options.order.length);

      if (refresh) {
        this.refresh();
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
        this.refresh();
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
     * setWidth method
     * @api public
     */
    setWidth: function(width, refresh) {
      width = (width > this.options.order.model.max_width) ? this.options.order.model.max_width : width;
      width = (width < this.options.order.model.min_width) ? this.options.order.model.min_width : width;
      this.options.order.width = width;

      if (refresh) {
        this.refresh();
      }
    },

    /**
     * getWidth method
     * @api public
     */
    getWidth: function() {
      return this.options.order.width;
    },

    /**
     * setLength method
     * @api public
     */
    setLength: function(length, refresh) {
      length = (length > this.options.order.model.max_length) ? this.options.order.model.max_length : length;
      length = (length < this.options.order.model.min_length) ? this.options.order.model.min_length : length;
      this.options.order.length = length;

      if (refresh) {
        this.refresh();
      }
    },

    /**
     * getLength method
     * @api public
     */
    getLength: function() {
      return this.options.order.length;
    },

    /**
     * setPrice method
     * @api public
     */
    setPrice: function() {
      var model = this.options.order.model;
      var material = this.options.order.material;

      this.options.order.price = Math.ceil(Math.floor((model.base_price + (model.sqm_price * this.getSqm())) * material.price_modifier)/100) * 100;
    },

    /**
     * getPrice method
     * @api public
     */
    getPrice: function() {
      // Re-calculate price before return
      this.setPrice();

      return this.options.order.price;
    },

    /**
     * getSqm method
     * @api public
     */
    getSqm: function() {
      return this.getLength() * this.getWidth() / 1000000; // convert mm to m
    },

    /**
     * refresh method
     * @api public
     */
    refresh: function() {

      // Format price into a nice string
      var formattedPrice = this.getPrice().toString().split('').reverse();
      $.each(formattedPrice, function(i, str) {
        if (i !== 0 && i % 3 === 0) {
          formattedPrice[i] = str + '&thinsp;';
        }
      });
      formattedPrice = formattedPrice.reverse().join('');

      // Slide model image into view
      var position = $(this.options.order.model.$element).position();
      this.$modelsSlides.css('left', (position.left * -1));

      // Set slides height to match current model's image
      this.$modelsSlides.css('height', $(this.options.order.model.$element).outerHeight());

      // Set "selected" class
      $('.tableflip__material', this.$materialsContainer).removeClass('selected');
      $(this.options.order.material.$element).addClass('selected');

      // Update controls
      this.$widthControl.attr('min', this.options.order.model.min_width).attr('max', this.options.order.model.max_width).attr('value', this.options.order.width);
      this.$lengthControl.attr('min', this.options.order.model.min_length).attr('max', this.options.order.model.max_length).attr('value', this.options.order.length);

      // Update labels
      this.$modelLabel.html(this.options.order.model.name);
      this.$widthLabel.html((this.options.order.width / 10) + " cm");
      this.$lengthLabel.html((this.options.order.length / 10) + " cm");
      this.$priceLabel.html("Beställ nu för " + formattedPrice + " SEK");

      console.log(JSON.stringify(this.options.order));
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
      width: 0,
      length: 0,
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
