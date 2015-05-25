<?php

namespace Roots\Sage;

$iframe_html = get_sub_field('iframe');

// Parse oembed params
if ( !empty( $iframe_html ) ) :
  $iframe_html = Utils\youtube_embed_params($iframe_html, array(
    'modestbranding'  => '1',
    'disablekb'       => '1',
    'autoplay'        => '1',
    'autohide'        => '1',
    'controls'        => '0',
    'showinfo'        => '0',
    'loop'            => '1',
    'rel'             => '0',
    'hd'              => '1'
  ));
endif;

?>

<section class="hero hero-oembed">
  <div class="hero-oembed-container"><?= $iframe_html; ?></div>
  <div class="hero-oembed-overlay"></div>
</section>
