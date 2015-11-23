<?php

// Get number of imaged in gallery
$image_ids = get_sub_field('images', false, false);

// Loop images
if ( count( $image_ids ) > 0 ) : ?>

<section class="page-section page-section-gallery">
  <?php if ( get_sub_field('id')): echo '<a name="'.get_sub_field('id').'"></a>'; endif; ?>

  <?php if ( get_sub_field('headline') ): ?>
  <h2 class="page-section-headline font-serif-xlarge"><span class="magic-underline"><?php the_sub_field('headline'); ?></span></h2>
  <?php endif; ?>

  <div class="container-fluid">
    <?php
      // Generate gallery shortcode
      $shortcode = '[gallery ids="' . implode(',', $image_ids) . '"]';
      echo do_shortcode( $shortcode );
    ?>
  </div>
</section>

<?php endif; ?>
