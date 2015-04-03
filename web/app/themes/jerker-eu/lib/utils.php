<?php

namespace Roots\Sage\Utils;

/**
 * Tell WordPress to use searchform.php from the templates/ directory
 */
function get_search_form() {
  $form = '';
  locate_template('/templates/searchform.php', true, false);
  return $form;
}
add_filter('get_search_form', __NAMESPACE__ . '\\get_search_form');

/**
 * Make a URL relative
 */
function root_relative_url($input) {
  preg_match('|https?://([^/]+)(/.*)|i', $input, $matches);
  if (!isset($matches[1]) || !isset($matches[2])) {
    return $input;
  } elseif (($matches[1] === $_SERVER['SERVER_NAME']) || $matches[1] === $_SERVER['SERVER_NAME'] . ':' . $_SERVER['SERVER_PORT']) {
    return wp_make_link_relative($input);
  } else {
    return $input;
  }
}

/**
 * Compare URL against relative URL
 */
function url_compare($url, $rel) {
  $url = trailingslashit($url);
  $rel = trailingslashit($rel);
  if ((strcasecmp($url, $rel) === 0) || root_relative_url($url) == $rel) {
    return true;
  } else {
    return false;
  }
}

/**
 * Check if element is empty
 */
function is_element_empty($element) {
  $element = trim($element);
  return !empty($element);
}

/**
 * Append youtube oembed params
 */
function youtube_embed_params($iframe, $params) {

  // Save the URL from the iframe html
  preg_match('/src="(.+?)"/', $iframe, $iframe_matches);
  $src = $iframe_matches[1];

  // Separate video ID from the URL and add to params
  preg_match('%(?:youtube(?:-nocookie)?\.com/(?:[^/]+/.+/|(?:v|e(?:mbed)?)/|.*[?&]v=)|youtu\.be/)([^"&?/ ]{11})%i', $src, $src_matches);
  $params['playlist'] = $src_matches[1];

  // Append params to URL
  $new_src = add_query_arg($params, $src);

  // replace the old iframe URL with the new
  $iframe = str_replace($src, $new_src, $iframe);

  // Add iframe attributes
  $attributes = 'frameborder="0"';
  $iframe = str_replace('></iframe>', ' ' . $attributes . '></iframe>', $iframe);

  return $iframe;
}
