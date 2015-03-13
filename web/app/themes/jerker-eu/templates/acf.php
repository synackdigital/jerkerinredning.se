<?php

$headline = get_sub_field('headline');
$content = get_sub_field('content');
$layout = get_sub_field('layout');

?>

<section class="acf">

  <?php if ($headline) : ?>
  <h1 class="headline"><?php echo $headline; ?></h1>
  <?php endif; ?>

  <?php if ($layout && $content) : ?>
  <div class="layout layout-<?php echo $layout ?>">
    <div class="content">
      <?php print_r($content); ?>
    </div>
  </div>
  <?php endif; ?>

</section>
