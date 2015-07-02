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
    this.required = [
      this.options.models,
      this.options.materials,
      this.options.finishes
    ];
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
      console.log('(╯°□°）╯︵ ┻━┻');
      console.log(this.options);

      // Continue if required options are not null
      if ( this.required.length === $.grep(this.required, function(option) { return null!==option; }).length ) {
        console.log('not null');
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
    models: null,
    materials: null,
    finishes: null,
    configuration: null
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
