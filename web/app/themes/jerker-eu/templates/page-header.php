<?php use Roots\Sage\Titles; ?>

<div class="page-header">
  <?php
  if (have_rows('hero')) :
    while (have_rows('hero')) : the_row();
      get_template_part('templates/hero', get_row_layout());
    endwhile;
  else : ?>
  <?php if ( has_post_thumbnail() ) the_post_thumbnail(); ?>
  <div class="page-title">
    <div class="container">
      <h1 class="font-serif-xxlarge">
        <?= Titles\title(); ?>
      </h1>
    </div>
  </div>
  <?php endif; ?>
</div>
