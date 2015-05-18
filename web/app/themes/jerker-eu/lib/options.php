<?php

// Register options page(s)
if( function_exists('acf_add_options_page') ) {
  acf_add_options_sub_page(array(
    'page_title'  => 'Theme Options',
    'menu_title'  => 'Options',
    'parent_slug' => 'themes.php',
  ));
}
