<?php

$repeater_count = count(get_sub_field('repeater'));

$column_classes = ['col-xs-12'];

switch ($repeater_count) :
  case 2: $column_classes[] = 'col-sm-6'; break;
  case 3: $column_classes[] = 'col-sm-4'; break;
  case 4: $column_classes[] = 'col-sm-6 col-lg-3'; break;
endswitch;

if ( have_rows('repeater') ): ?>

<section class="container acf acf-text-image">
  <div class="row">
  <?php while ( have_rows('repeater') ) : the_row(); ?>
    <div class="<?php echo implode(' ', $column_classes); ?>">
      <?php $image = get_sub_field('image'); ?>
      <img class="acf-image img-responsive" src="<?php echo $image['url'] ?>" alt="">
      <h1 class="acf-headline"><?php the_sub_field('headline'); ?></h1>
      <div class="acf-text"><?php the_sub_field('text'); ?></div>
    </div>
  <?php endwhile; ?>
  </div>
</section>

<?php endif; ?>
