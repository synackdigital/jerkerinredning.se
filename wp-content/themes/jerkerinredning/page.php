<?php

while (have_posts()) : the_post();
  do_action('get_header');
  if (has_post_thumbnail()) get_template_part('templates/post-thumbnail');
  get_template_part('templates/header');
?>
<main class="main" role="main">
<?php
  if (get_the_content())
    get_template_part('templates/content', 'page');

  if (function_exists('have_rows') && have_rows('page_sections')) :
    while (have_rows('page_sections')) : the_row();
      get_template_part('templates/page_section', get_row_layout());
    endwhile;
  endif;
?>
</main><!-- /.main -->
<?php
endwhile;
