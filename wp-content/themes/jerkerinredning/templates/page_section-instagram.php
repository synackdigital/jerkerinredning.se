<?php

$instafeed_data = [
  'get' => 'user',
  'limit' => get_sub_field('limit'),
  'resolution' => get_sub_field('resolution'),
  'links' => get_sub_field('links')
];

$container_width_class = '';
switch (get_sub_field('resolution')) :
  case 'thumbnail':
    $container_width_class = 'container-fluid--narrow';
  break;
  case 'standard_resolution':
    $container_width_class = 'container-fluid--wide';
  break;
endswitch;

?>

<section class="page-section page-section-instagram">
  <?php if ( get_sub_field('id')): echo '<a name="'.get_sub_field('id').'"></a>'; endif; ?>

  <?php if ( get_sub_field('headline') ): ?>
  <h2 class="page-section-headline"><?php the_sub_field('headline'); ?></h2>
  <?php endif; ?>

  <div class="container-fluid <?php print (!empty($container_width_class)) ? $container_width_class : ''; ?>">
    <div class="row row-nogutters instafeed-canvas instafeed-canvas-<?= $instafeed_data['resolution'] ?>" data-instafeed="<?= htmlentities(json_encode($instafeed_data), ENT_QUOTES); ?>"></div>
  </div>
</section>
