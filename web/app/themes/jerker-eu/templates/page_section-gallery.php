<?php

// Get number of imaged in gallery
$image_ids = get_sub_field('images', false, false);

// Loop images
if ( count( $image_ids ) > 0 ) : ?>

<section class="page-section page-section-gallery">
  <div class="container">
    <?php
      // Generate gallery shortcode
      $shortcode = '[gallery ids="' . implode(',', $image_ids) . '"]';
      echo do_shortcode( $shortcode );
    ?>
  </div>
</section>

<?php endif; ?>