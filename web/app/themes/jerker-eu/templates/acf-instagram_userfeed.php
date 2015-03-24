<?php

$headline = get_sub_field('headline');

$instafeed_data = [
  'get' => 'user',
  'limit' => get_sub_field('limit'),
  'resolution' => get_sub_field('resolution'),
  'links' => get_sub_field('links')
];

?>

<section class="acf acf-instagram-userfeed">

  <?php if ($headline) : ?>
  <h1 class="acf-headline"><?php echo $headline; ?></h1>
  <?php endif; ?>

  <div class="instafeed-canvas" data-instafeed="<?php echo htmlentities(json_encode($instafeed_data), ENT_QUOTES); ?>"></div>

</section>
