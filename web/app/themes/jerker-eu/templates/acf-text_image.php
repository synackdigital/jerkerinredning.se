<?php

$repeater_count = count(get_sub_field('repeater'));

$column_classes = array('col-xs-12');

switch ($repeater_count) :
  case 2: array_push($column_classes, 'col-sm-6', 'col-md-6', 'col-lg-6'); break;
  case 3: array_push($column_classes, 'col-sm-4', 'col-md-4', 'col-lg-4'); break;
  case 4: array_push($column_classes, 'col-sm-6', 'col-md-6', 'col-lg-6', 'col-lg-3'); break;
endswitch;

if ( $repeater_count > 0 ): ?>

<section class="<?php the_sub_field('container'); ?> acf acf-text-image">
  <div class="row">
    <?php if ( get_sub_field('headline')) : ?><div class="col-xs-12"><h1 class="acf-section-headline"><?php the_sub_field('headline'); ?></h1></div><?php endif; ?>
    <?php if ( have_rows('repeater') ) : while ( have_rows('repeater') ) : the_row(); ?>
    <div class="<?php echo implode(' ', $column_classes); ?>">
      <?php if ( get_sub_field('image')) : ?><img class="acf-image img-responsive" src="<?php the_sub_field('image'); ?>"><?php endif; ?>
      <?php if ( get_sub_field('headline')) : ?><h2 class="acf-headline"><?php the_sub_field('headline'); ?></h2><?php endif; ?>
      <?php if ( get_sub_field('text')) : ?><div class="acf-text"><?php the_sub_field('text'); ?></div><?php endif; ?>
    </div>
    <?php endwhile; endif; ?>
  </div>
</section>

<?php endif; ?>
