<?php
  $models = get_sub_field( 'models' );
  $materials = get_sub_field( 'materials' );
  $finishes = get_sub_field( 'finishes' );
?>

<section class="page-section page-section_tableflip">

  <?php if ( get_sub_field('headline') ): ?>
  <h2 class="page-section-headline font-serif-xlarge"><span class="magic-underline"><?php the_sub_field('headline'); ?></span></h2>
  <?php endif; ?>

  <div class="tableflip">

    <div class="tableflip__models">
      <div class="tableflip__slides" style="width:<?php echo (100 * count($models)).'%'; ?>;">
        <?php foreach ( $models as $key => $model ) : ?>
        <?php unset($models[$key]['image']); $json_model = $models[$key]; ?>
        <div class="tableflip__model tableflip__slide" data-tableflip-model="<?php echo htmlspecialchars(json_encode($json_model)); ?>" style="width:<?php echo (100 / count($models)).'%'; ?>;">
          <?php echo sprintf('<img src="%s" alt="%s" width="%d" height="%d">', $model['image']['url'], $model['name'], $model['image']['width'], $model['image']['height']); ?>
        </div>
        <?php endforeach; ?>
      </div>
      <div class="tableflip__controls">
        <span class="tableflip__control tableflip__control--prev">&lsaquo;</span>
        <span class="tableflip__label tableflip__label--model">&nbsp;</span>
        <span class="tableflip__control tableflip__control--next">&rsaquo;</span>
      </div>
    </div>

    <div class="tableflip__materials">
      <?php foreach ( $materials as $key => $material ) : ?>
        <?php unset($materials[$key]['image']); $json_material = $materials[$key]; ?>
      <div class="tableflip__material tableflip__control" data-tableflip-material="<?php echo htmlspecialchars(json_encode($json_material)); ?>">
        <?php echo sprintf('<img src="%s" alt="%s" width="%d" height="%d">', $material['image']['url'], $material['name'], $material['image']['width'], $material['image']['height']); ?>
        <?php echo $material['name']; ?>
      </div>
      <?php endforeach; ?>
    </div>

    <div class="tableflip__finishes">
      <?php foreach ( $finishes as $key => $finish ) : ?>
      <div class="tableflip__finish tableflip__control" data-tableflip-finish="<?php echo htmlspecialchars(json_encode($finish)); ?>">
        <?php echo $finish['name']; ?>
      </div>
      <?php endforeach; ?>
    </div>

    <div class="tableflip__dimensions">
      <div class="range-slider">
        <span class="font-serif-large">Bredd</span>
        <input class="tableflip__control tableflip__control--width range-input" type="range" value="0" min="0" max="0" step="10">
        <span class="tableflip__label tableflip__label--width range-label">&nbsp;</span>
      </div>
      <div class="range-slider">
        <span class="font-serif-large">Längd</span>
        <input class="tableflip__control tableflip__control--length range-input" type="range" value="0" min="0" max="0" step="10">
        <span class="tableflip__label tableflip__label--length range-label">&nbsp;</span>
      </div>
    </div>

    <div class="tableflip__order">
      <span class="tableflip__label tableflip__label--price font-serif-xlarge">&nbsp;</span>
    </div>

  </div>
</section>
