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
    <div class="row row-nogutters instafeed-canvas instafeed-canvas-<?= $instafeed_data['resolution'] ?>" data-instafeed="<?= htmlentities(json_encode($instafeed_data), ENT_QUOTES); ?>"></div>
  </div>
</section>
