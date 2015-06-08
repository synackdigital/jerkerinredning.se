
function initializeInstafeed() {
  // Find and initialize Instafeed canvases
  $('.instafeed-canvas').each(function(i) {
    $this = $(this);

    // Assign a unique ID for this container
    uniqid = Date.now();
    $this.attr('id', 'instafeed-canvas-'+uniqid);

    // Retrieve data from the data-instafeed attribute
    $instafeed_data = $this.data('instafeed');

    // Create the Instafeed
    var instafeed = new Instafeed({

      // Fetch credentials from PHPVAR
      clientId: PHPVAR.instagram_client_id,
      userId: parseInt(PHPVAR.instagram_user_id),
      accessToken: PHPVAR.instagram_access_token,

      // Create attribues
      target: $this.attr('id'),
      get: $instafeed_data.get,
      limit: parseInt($instafeed_data.limit),
      resolution: $instafeed_data.resolution,
      links: $instafeed_data.links,

      // HTML Template
      template: '<div class="col-xs-12 col-sm-4 col-lg-3"><div class="thumbnail"><a href="{{link}}"><img src="{{image}}" alt="{{caption}}"></a></div></div>',

      // Handle callbacks
      before: function() {},
      success: function() {},
      after: function() {},
      error: function() {}
    });
    instafeed.run();
  });
}
