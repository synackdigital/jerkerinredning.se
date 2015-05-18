<?php

$instafeed_data = [
  'get' => 'user',
  'limit' => get_sub_field('limit'),
  'resolution' => get_sub_field('resolution'),
  'links' => get_sub_field('links')
];

?>

<section class="page-section page-section-instagram">
  <div class="container">
    <div class="instafeed-canvas" data-instafeed="<?= htmlentities(json_encode($instafeed_data), ENT_QUOTES); ?>"></div>
  </div>
</section>
