<?php

$instafeed_data = [
  'get' => 'user',
  'limit' => get_sub_field('limit'),
  'resolution' => get_sub_field('resolution'),
  'links' => get_sub_field('links')
];

?>

<section class="page-section page-section-instagram">
  <?php if ( get_sub_field('id')): echo '<a name="'.get_sub_field('id').'"></a>'; endif; ?>

  <?php if ( get_sub_field('headline') ): ?>
  <h2 class="page-section-headline font-serif-xlarge"><span class="magic-underline"><?php the_sub_field('headline'); ?></span></h2>
  <?php endif; ?>

  <div class="container-fluid">
    <div class="row row-nogutters instafeed-canvas instafeed-canvas-<?= $instafeed_data['resolution'] ?>" data-instafeed="<?= htmlentities(json_encode($instafeed_data), ENT_QUOTES); ?>"></div>
  </div>
</section>
