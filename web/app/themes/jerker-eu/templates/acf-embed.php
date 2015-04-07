<?php

namespace Roots\Sage;

$headline = get_sub_field('headline');
$description = get_sub_field('description');
$text_color = get_sub_field('text_color');

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

?>

<section class="acf acf-embed">

  <div class="embed-container"><?php echo $oembed; ?></div>

  <div class="content" style="color:<?php echo $text_color; ?>">
    <div class="container">

      <?php if ($headline) : ?>
      <div class="row">
        <div class="col-xs-12 col-sm-10 col-lg-8">
          <h1 class="headline"><?php echo $headline; ?></h1>
        </div>
      </div>
      <?php endif; ?>

      <?php if ($description) : ?>
      <div class="row">
        <div class="col-xs-12 col-sm-10 col-lg-8">
          <?php echo $description; ?>
        </div>
      </div>
      <?php endif; ?>

    </div>
  </div>

</section>
