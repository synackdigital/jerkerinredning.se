<?php

namespace Roots\Sage;

if (have_rows('hero')) :
  while (have_rows('hero')) : the_row();
    get_template_part('templates/acf', get_row_layout());
  endwhile;
endif;
