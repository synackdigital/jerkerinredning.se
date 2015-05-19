<?php

// Get number of teasers in repeater (max 4)
$teasers = get_sub_field('teaser');
$teasers_count = count( $teasers );

// Array of responsive column classes
$column_classes = array('col-xs-12');
switch ($teasers_count) :
  case 1 : array_push($column_classes, 'col-sm-8 col-sm-offset-2', 'col-md-6', 'col-md-offset-3', 'col-lg-4', 'col-lg-offset-4'); break;
  case 2 : array_push($column_classes, 'col-sm-6', 'col-md-6', 'col-lg-6'); break;
  case 3 : array_push($column_classes, 'col-sm-4', 'col-md-4', 'col-lg-4'); break;
  case 4 : array_push($column_classes, 'col-sm-6', 'col-md-6', 'col-lg-6', 'col-lg-3'); break;
endswitch;

// Loop teasers
if ( $teasers_count > 0 ) : ?>

<section class="page-section page-section-teasers">
  <div class="container">
    <div class="row">
      <?php
        if ( have_rows('teaser') ) : while ( have_rows('teaser') ) : the_row();
          $image      = get_sub_field('image');
          $headline   = get_sub_field('headline');
          $subhead    = get_sub_field('subhead');
          $text       = get_sub_field('text');
          $link_url   = get_sub_field('link_url');
          $link_label = get_sub_field('link_label');
      ?>
      <div class="<?= implode(' ', $column_classes); ?>">
        <div class="thumbnail">
          <?php if ( !empty( $image ) ) : ?><img src="<?= $image['sizes']['medium']; ?>" alt="<?= $image['alt']; ?>"><?php endif; ?>
          <div class="caption">
            <?php if ( !empty( $headline ) ) : ?><h1><span class="magic-underline"><?= $headline; ?></span></h1><?php endif; ?>
            <?php if ( !empty( $subhead ) ) : ?><h2><?= $subhead; ?></h2><?php endif; ?>
            <?php if ( !empty( $text ) ) : ?><?= $text; ?><?php endif; ?>
            <?php if ( !empty( $link_url ) && !empty( $link_label ) ) : ?><a class="page-section-link" href="<?= $link_url; ?>"><?= $link_label; ?></a><?php endif; ?>
          </div>
        </div>
      </div>
      <?php endwhile; endif; ?>
    </div>
  </div>
</section>

<?php endif; ?>
