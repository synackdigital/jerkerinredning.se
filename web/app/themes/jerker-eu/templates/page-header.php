<?php use Roots\Sage\Titles; ?>

<?php

if ( has_post_thumbnail() ) :
  $thumbnail = wp_get_attachment_image_src( get_post_thumbnail_id(), 'full' );
  $background_image = $thumbnail['0'];
else :
  $background_image = 'bar';
endif;

?>

<div class="page-header" style="background-image:url(<?php echo $background_image; ?>);">
  <?php
  if (have_rows('hero')) :
    while (have_rows('hero')) : the_row();
      get_template_part('templates/hero', get_row_layout());
    endwhile;
  else : ?>
  <div class="page-title">
    <div class="container">
      <h1 class="font-serif-xxlarge">
        <span class="magic-underline"><?= Titles\title(); ?></span>
      </h1>
    </div>
  </div>
  <?php endif; ?>
</div>
