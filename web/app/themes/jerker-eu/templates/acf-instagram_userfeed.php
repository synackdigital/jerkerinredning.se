<?php

$headline = get_sub_field('headline');

$number_of_images = get_sub_field('image_count');
$image_resolution = get_sub_field('image_resolution');
$link_images = get_sub_field('image_links');

?>

<section class="acf acf-instagram-userfeed">

  <?php if ($headline) : ?>
  <h1 class="acf-headline"><?php echo $headline; ?></h1>
  <?php endif; ?>

  <div class="instafeed-canvas"
    data-get="user"
    data-count="<?php echo $number_of_images; ?>"
    data-resolution="<?php echo $image_resolution; ?>"
    data-links="<?php echo $link_images; ?>"
  ></div>

</section>
