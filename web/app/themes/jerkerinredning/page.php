<?php

while (have_posts()) : the_post();

  if (get_field('title_visibility') !== 'hidden')
    get_template_part('templates/page', 'header');

  do_action('get_header');
  get_template_part('templates/header');
?>
<main class="main" role="main">
<?php
  if (get_the_content())
    get_template_part('templates/content', 'page');

  if (have_rows('page_sections')) :
    while (have_rows('page_sections')) : the_row();
      get_template_part('templates/page_section', get_row_layout());
    endwhile;
  endif;
?>
</main><!-- /.main -->
<?php
endwhile;
