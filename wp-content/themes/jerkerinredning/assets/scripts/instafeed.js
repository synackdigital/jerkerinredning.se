function initializeInstafeed($canvas) {

  // Assign a unique ID for this container
  uniqid = Date.now();
  $canvas.attr('id', 'instafeed-canvas-'+uniqid);

  // Retrieve data from the data-instafeed attribute
  $canvas_data = $canvas.data('instafeed');

  var columns_class = 'col-md-3';
  if ($canvas_data.resolution === 'standard_resolution') {
    columns_class = 'col-md-4';
  }

  // Create the Instafeed
  var instafeed = new Instafeed({

    // Fetch credentials from PHPVAR
    clientId: PHPVAR.instagram_client_id,
    userId: parseInt(PHPVAR.instagram_user_id),
    accessToken: PHPVAR.instagram_access_token,

    // Create attribues
    target: $canvas.attr('id'),
    get: $canvas_data.get,
    limit: parseInt($canvas_data.limit),
    resolution: $canvas_data.resolution,
    links: $canvas_data.links,

    // HTML Template
    template: '<div class="col-xs-12 ' + columns_class + '"><div class="thumbnail"><a href="{{link}}"><img src="{{image}}" alt="{{caption}}"></a></div></div>',

    // Handle callbacks
    before: function() {},
    success: function() {},
    after: function() {},
    error: function() {}
  });
  instafeed.run();
}
