<?php

$headline = get_sub_field('headline');

?>

<section class="page-section page-section-tagline">
  <?php if ( get_sub_field('id')): echo '<a name="'.get_sub_field('id').'"></a>'; endif; ?>

  <?php if ( get_sub_field('headline') ): ?>
  <p class="page-section-headline"><?php the_sub_field('headline'); ?></p>
  <?php endif; ?>

</section>
