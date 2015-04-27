<?php

namespace Roots\Sage;

// Parse oembed params
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

$text = get_sub_field('text');
$text_color = get_sub_field('text_color');

?>

<section class="acf acf-oembed">

  <div class="acf-oembed-container"><?php echo $oembed; ?></div>

  <div class="acf-oembed-content">
    <div class="container-fluid">

      <?php if ($text) : ?>
      <div class="row" style="color:<?php echo $text_color; ?>">
        <div class="col-xs-12 col-sm-10 col-lg-8">
          <p><?php echo $text; ?></p>
        </div>
      </div>
      <?php endif; ?>

    </div>
  </div>

</section>
