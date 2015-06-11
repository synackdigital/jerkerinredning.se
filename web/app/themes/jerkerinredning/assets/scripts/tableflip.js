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
   * Plugin NAMESPACE and SELECTOR
   * @type {String}
   * @api private
   */
  var NAMESPACE = 'tableflip',
  SELECTOR = '[data-' + NAMESPACE + ']';

  /**
   * Plugin constructor
   * @param {Node} element
   * @param {Object} [options]
   * @api public
   */
  function Plugin (element, options) {
    this.options = $.extend(true, $.fn[NAMESPACE].defaults, options);
    this.$element = $(element);
    this.DOMElementsCreated = false;
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
      this.createDOMElements();
    },

    /**
     * createDOMElements method
     * @api public
     */
    createDOMElements: function () {

      // Add namespaced class to $element
      var elementClass = NAMESPACE;
      this.$element.addClass(elementClass);

      // Create $canvas container inside $element
      var canvasClass = elementClass + '-canvas';
      this.$canvas = $('<div/>').addClass(canvasClass).appendTo($(this.$element));

      // Attach models to $canvas
      $.each(this.options.models, $.proxy(function(index, model) {
        $('<div/>').addClass(canvasClass + '-model' + ' ' + canvasClass + '-model--' + model.slug).appendTo($(this.$canvas));
      }, this));

      // Create $options container inside $element
      var optionsClass = elementClass + '-options';
      this.$options = $('<div/>').addClass(optionsClass).appendTo($(this.$element));

      // Attach options panels to $options
      var optionsPanels = $('<div/>').addClass(optionsClass + '-panels').appendTo($(this.$options));
      this.$modelOptionsPanel = $('<div/>').addClass(optionsClass + '-panel ' + optionsClass + '-panel--models').appendTo(optionsPanels);
      this.$materialOptionsPanel = $('<div/>').addClass(optionsClass + '-panel ' + optionsClass + '-panel--materials').appendTo(optionsPanels);
      this.$finishOptionsPanel = $('<div/>').addClass(optionsClass + '-panel ' + optionsClass + '-panel--finishes').appendTo(optionsPanels);
      this.$priceOptionsPanel = $('<div/>').addClass(optionsClass + '-panel ' + optionsClass + '-panel--price').appendTo(optionsPanels);

      // Create single option inputs in $modelOptionsPanel
      var optionClass = elementClass + '-option';

      // Models
      this.$modelOptionInput = $('<select size="6"/>').addClass(optionClass + '--model').appendTo(this.$modelOptionsPanel);
      $.each(this.options.models, $.proxy(function(index, model) {
        $('<option value="' + model.id + '">' + model.name + '</option>').appendTo($(this.$modelOptionInput));
      }, this));
      this.$modelOptionInput
        .val(this.getOption('model'))
        .on('change', this.setOption('model', this.$modelOptionInput.val()));

      // Materials
      this.$materialOptionInput = $('<select size="6"/>').addClass(optionClass + '--material').appendTo(this.$materialOptionsPanel);
      $.each(this.options.materials, $.proxy(function(index, material) {
        $('<option value="' + material.id + '">' + material.name + '</option>').appendTo($(this.$materialOptionInput));
      }, this));

      // Finishes
      this.$finishOptionInput = $('<select size="6"/>').addClass(optionClass + '--finish').appendTo(this.$finishOptionsPanel);
      $.each(this.options.finishes, $.proxy(function(index, finish) {
        $('<option value="' + finish.id + '">' + finish.name + '</option>').appendTo($(this.$finishOptionInput));
      }, this));

    },

    setOption: function (option, value) {
      console.log('setOption :'+option+' :'+value);
      this.options.configuration[option] = value;
      this.updatePriceTotal();
    },

    getOption: function (option) {
      return this.options.configuration[option];
    },

    updatePriceTotal: function () {

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
      data = $this.data('fn.' + NAMESPACE);
      options = (typeof method === 'object') ? method : options;
      if (!data) {
        $this.data('fn.' + NAMESPACE, (data = new Plugin(this, options)));
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
    models: [
      {
        id: 1,
        name: 'Haväng',
        slug: 'havang',
        baseprice: 14000,
        sqmprice: 3000,
        materials: [0,1,2,3,4,5,6],
        measurements: {
          minWidth: 600,
          maxWidth: 1200,
          minLength: 1200,
          maxLength: 2400
        }
      },
      {
        id: 2,
        name: 'Vik',
        slug: 'vik',
        baseprice: 7000,
        sqmprice: 3000,
        materials: [0,1,2,3,4,5,6],
        measurements: {
          minWidth: 600,
          maxWidth: 2400,
          minLength: 600,
          maxLength: 1200
        }
      },
      {
        id: 3,
        name: 'Ravlunda',
        slug: 'ravlunda',
        baseprice: 9000,
        sqmprice: 3000,
        materials: [0,1,3,5],
        measurements: {
          minWidth: 600,
          maxWidth: 2000,
          minLength: 600,
          maxLength: 3000
        }
      },
    ],
    materials: [
      {
        id: 0,
        name: 'Annat',
        pricefactor: 0
      },
      {
        id: 1,
        name: 'Ek',
        pricefactor: 1.3
      },
      {
        id: 2,
        name: 'Ekfanér',
        pricefactor: 1.1
      },
      {
        id: 3,
        name: 'Ask',
        pricefactor: 1.3
      },
      {
        id: 4,
        name: 'Askfanér',
        pricefactor: 1.1
      },
      {
        id: 5,
        name: 'Björk',
        pricefactor: 1.2
      },
      {
        id: 6,
        name: 'Björkfanér',
        pricefactor: 1
      }
    ],
    finishes: [
      {
        id: 0,
        name: 'Annan',
        pricefactor: 0
      },
      {
        id: 1,
        name: 'Olja',
        pricefactor: 1
      },
      {
        id: 2,
        name: 'Vitpigmenterad olja',
        pricefactor: 1
      },
      {
        id: 3,
        name: 'Oljevax',
        pricefactor: 1
      },
      {
        id: 4,
        name: 'Vitpigmenterat oljevax',
        pricefactor: 1
      },
      {
        id: 5,
        name: 'Vitsåpa',
        pricefactor: 1
      }
    ],
    configuration: {
      model: 2,
      length: 1800,
      width: 800,
      material: 5,
      finish: 4
    }
  };

  /**
   * jQuery plugin data api
   * @api public
   */
  $(window).on('load', function (event) {
    $('[data-' + NAMESPACE + ']').each(function () {
      var $this = $(this);
      var data = $this.data(NAMESPACE);
      $this[NAMESPACE](data);
    });
  });

}(this, this.document, this.jQuery));
