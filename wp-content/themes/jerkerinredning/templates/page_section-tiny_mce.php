<?php

$tinymce = get_sub_field('tinymce');

?>

<section class="page-section page-section-tiny_mce">
  <?php if ( get_sub_field('id')): echo '<a name="'.get_sub_field('id').'"></a>'; endif; ?>

  <?php if ( get_sub_field('headline') ): ?>
  <h2 class="page-section-headline font-serif-xlarge"><span class="magic-underline"><?php the_sub_field('headline'); ?></span></h2>
  <?php endif; ?>

  <div class="container">
    <div class="row">
      <div class="col-xs-12 col-sm-8 col-md-6">
        <div class="page-section-tiny_mce-content"><?= $tinymce ?></div>
      </div>
    </div>
  </div>
</section>
