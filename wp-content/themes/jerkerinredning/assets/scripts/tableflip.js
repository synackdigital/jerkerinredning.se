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
    this.$finishesContainer = $('.tableflip__finishes', this.$element);
    this.$customerContainer = $('.tableflip__customer', this.$element);
    this.$thankyouContainer = $('.tableflip__thankyou', this.$element);

    this.$orderControl = $('.tableflip__control--order', this.$element);

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

    // Fetch materials from data-attribute
    $.each($('.tableflip__material', this.$materialsContainer), $.proxy(function(index, el) {
      var material = $(el).data('tableflip-material');
      material.price_modifier = parseFloat(material.price_modifier, 10);
      material.$element = el;
      this.options.materials.push(material);
    }, this));

    // Fetch finishes from data-attribute
    $.each($('.tableflip__finish', this.$finishesContainer), $.proxy(function(index, el) {
      var finish = $(el).data('tableflip-finish');
      finish.price_modifier = parseFloat(finish.price_modifier, 10);
      finish.$element = el;
      this.options.finishes.push(finish);
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

      // Hide order containers
      this.$customerContainer.hide();
      this.$thankyouContainer.hide();

      // Setup order
      this.setModel(0);
      this.setWidth(800);
      this.setLength(1850);
      this.setMaterial(1);
      this.setFinish(4, true);

      // Setup controls
      this.$modelsNextControl.on('click', $.proxy(function(event) {
        event.preventDefault();
        this.setModel('next', true);
      }, this));

      this.$modelsPrevControl.on('click', $.proxy(function(event) {
        event.preventDefault();
        this.setModel('prev', true);
      }, this));

      this.$orderControl.on('click', $.proxy(function(event) {
        event.preventDefault();
        this.sendOrder();
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

      $('.tableflip__finish', this.$finishesContainer).on('click', $.proxy(function(event){
        this.setFinish($('.tableflip__finish', this.$finishesContainer).index(event.currentTarget), true);
      }, this));
    },

    /**
     * setModel method
     * @param {Integer|String} [index]
     * @param {Boolean} [refresh]
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
     * @return {Object}
     * @api public
     */
    getModel: function() {
      return this.options.order.model;
    },

    /**
     * setMaterial method
     * @param {Integer} [index]
     * @param {Boolean} [refresh]
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
     * @return {Object}
     * @api public
     */
    getMaterial: function() {
      return this.options.order.material;
    },

    /**
     * verifyMaterialAvailability method
     * @api public
     */
    verifyMaterialAvailability: function() {
      if ( this.options.order.material.disable_for_model === this.options.order.model.name ) {
        this.setMaterial(0, true);
      }
    },

    /**
     * setFinish method
     * @param {Integer} [index]
     * @param {Boolean} [refresh]
     * @api public
     */
    setFinish: function(index, refresh) {
      this.options.order.finish = this.options.finishes[index];

      if (refresh) {
        this.refresh();
      }
    },

    /**
     * getFinish method
     * @return {Object}
     * @api public
     */
    getFinish: function() {
      return this.options.order.finish;
    },

    /**
     * setWidth method
     * @param {Integer} [width]
     * @param {Boolean} [refresh]
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
     * @return {Object}
     * @api public
     */
    getWidth: function() {
      return this.options.order.width;
    },

    /**
     * setLength method
     * @param {Integer} [length]
     * @param {Boolean} [refresh]
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
     * @return {Integer}
     * @api public
     */
    getLength: function() {
      return this.options.order.length;
    },

    /**
     * setPrice method
     * @param {Boolean} [refresh]
     * @api public
     */
    setPrice: function(refresh) {
      var model = this.options.order.model;
      var material = this.options.order.material;
      var finish = this.options.order.finish;

      // Calculate exact price
      var price = model.base_price + (this.getSqm() * model.sqm_price * material.price_modifier * finish.price_modifier);

      // Round up to nearest 100
      var roundPrice = Math.ceil(price / 100) * 100;

      // Save price to order
      this.options.order.price = roundPrice;

      if (refresh) {
        this.refresh();
      }
    },

    /**
     * getPrice method
     * @return {Integer}
     * @api public
     */
    getPrice: function() {
      this.setPrice();
      return this.options.order.price;
    },

    /**
     * getPriceString method
     * @return {String}
     * @api public
     */
    getPriceString: function() {

      if (0 < this.getPrice()) {

        // Insert space every third character from the last
        var priceArray = this.getPrice().toString().split('').reverse();
        $.each(priceArray, function(i, str) {
          if (i !== 0 && i % 3 === 0) {
            priceArray[i] = str + '&thinsp;';
          }
        });

        // Return price and currency as a string
        return 'Beställ nu för ' + priceArray.reverse().join('') + '&thinsp;<abbr>' + this.options.order.currency + '</abbr>';
      }
      else {
        return 'Skicka en offertförfrågan';
      }
    },

    /**
     * getSqm method
     * @return {Integer}
     * @api public
     */
    getSqm: function() {
      return this.getLength() * this.getWidth() / 1000000;
    },

    /**
     * refresh method
     * @api public
     */
    refresh: function() {

      // Verify that current material is available for current model
      if ( this.options.order.material ) {
        this.verifyMaterialAvailability();
      }

      // Slide model image into view
      var position = $(this.options.order.model.$element).position();
      this.$modelsSlides.css('left', (position.left * -1));

      // Set slides height to match current model's image
      this.$modelsSlides.css('height', $(this.options.order.model.$element).outerHeight());

      // Disable materials that are unavailable for the current model
      $.each(this.options.materials, $.proxy(function(i, e) {
        $(e.$element).removeClass('disabled');
        if (e.disable_for_model === this.options.order.model.name) {
          $(e.$element).addClass('disabled');
        }
      }, this));
      this.verifyMaterialAvailability();

      // Set selected elements
      $('.tableflip__material', this.$materialsContainer).removeClass('selected');
      $('.tableflip__finish', this.$finishesContainer).removeClass('selected');
      $(this.options.order.material.$element).addClass('selected');
      $(this.options.order.finish.$element).addClass('selected');

      // Update controls
      this.$widthControl.attr('min', this.options.order.model.min_width).attr('max', this.options.order.model.max_width).attr('value', this.options.order.width);
      this.$lengthControl.attr('min', this.options.order.model.min_length).attr('max', this.options.order.model.max_length).attr('value', this.options.order.length);

      // Update labels
      this.$modelLabel.html(this.options.order.model.name);
      this.$widthLabel.html((this.options.order.width / 10) + " cm");
      this.$lengthLabel.html((this.options.order.length / 10) + " cm");
      this.$orderControl.html(this.getPriceString());
    },

    getOrderJSON: function() {
      var order = this.options.order;
      delete order.model.$element;
      delete order.material.$element;
      delete order.finish.$element;
      return JSON.stringify(order, null, '\t');
    },

    sendOrder: function() {

      // Dirty validation
      var customerJSON = '';
      var customerName = $('#tableflip__control__customer-name').val();
      var customerEmail = $('#tableflip__control__customer-email').val();
      var customerPhone = $('#tableflip__control__customer-phone').val();

      if (customerName && customerEmail && customerPhone) {

        // Create customer JSON
        customerJSON = JSON.stringify({
          name: customerName,
          email: customerEmail,
          phone: customerPhone
        }, null, '\t');
      } else {

        // Show customer container if not already visible
        this.$customerContainer.show('fast');
      }

      if (customerJSON !== '') {

        // Compose order message
        var orderMessage = this.getOrderJSON()+'\n\n'+customerJSON+'\n\n';

        $.getJSON('https://mandrillapp.com/api/1.0/messages/send.json', {
          "key": "Dc-Fq14eZF279Fst3umiOQ",
          "message" : {
            "subject": "Order from jerkerinredning.se",
            "from_email": "post@jerker.eu",
            "from_name": "Jerker Inredning & Form",
            "to": [
              {
                "email": "post@jerker.eu",
                "name": "Jerker Inredning & Form",
                "type": "to"
              }
            ],
            "text": orderMessage,
          }
        }, $.proxy(function(json, textStatus) {
          this.$thankyouContainer.show('fast');
          this.$customerContainer.hide('fast');
          this.$orderControl.hide();
        }, this));
      }
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
      price: 0,
      currency: 'SEK'
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
