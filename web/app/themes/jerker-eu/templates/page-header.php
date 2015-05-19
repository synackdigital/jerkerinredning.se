<?php use Roots\Sage\Titles; ?>

<div class="page-header">
  <?php
  if (have_rows('hero')) :
    while (have_rows('hero')) : the_row();
      get_template_part('templates/hero', get_row_layout());
    endwhile;
  else : ?>
  <div class="container">
    <h1>
      <?= Titles\title(); ?>
    </h1>
  </div>
  <?php endif; ?>
</div>
