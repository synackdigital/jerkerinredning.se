<?php

while (have_posts()) : the_post();

  if (get_field('title_visibility') !== 'hidden')
    get_template_part('templates/page', 'header');

  if (get_the_content())
    get_template_part('templates/content', 'page');

  if (have_rows('layouts')) :
    while (have_rows('layouts')) : the_row();
      get_template_part('templates/acf', get_row_layout());
    endwhile;
  endif;

endwhile;
