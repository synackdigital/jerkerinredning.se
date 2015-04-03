<?php

namespace Roots\Sage;

$headline = get_sub_field('headline');
$oembed = Utils\youtube_embed_params(get_sub_field('oembed'), array(
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
$description = get_sub_field('description');
$link = array(
  'url' => get_sub_field('link_url'),
  'label' => get_sub_field('link_label')
);

?>

<section class="acf acf-embed">

  <div class="embed-container"><?php echo $oembed; ?></div>

  <div class="container">
    <?php if ($headline) : ?>
    <h1 class="headline"><?php echo $headline; ?></h1>
    <?php endif; ?>
  </div>

</section>
