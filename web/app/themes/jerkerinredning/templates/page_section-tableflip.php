<?php
  // {"configuration":{"model":"2","length":"1300","width":"900","material":"3","finish":"4"}}

  $models = get_sub_field( 'models' );
  $materials = get_sub_field( 'materials' );
  $finishes = get_sub_field( 'finishes' );
?>

<section class="page-section page-section_tableflip">
  <div class="tableflip" data-tableflip>
    <div class="tableflip__models" data-tableflip-models>
      <div class="tableflip__controls">
        <span data-tableflip-control="prev">&lsaquo;</span>
        <span data-tableflip-control="label"></span>
        <span data-tableflip-control="next">&rsaquo;</span>
      </div>
      <div class="tableflip__slides" style="width:<?php echo (100 * count($models)).'%'; ?>;">
        <?php foreach ( $models as $key => $model ) : ?>
        <?php unset($models[$key]['image']); $json_model = $models[$key]; ?>
        <div class="tableflip__slide" data-tableflip-model="<?php echo htmlspecialchars(json_encode($json_model)); ?>" style="width:<?php echo (100 / count($models)).'%'; ?>;">
          <?php echo sprintf('<img src="%s" alt="%s" width="%d" height="%d">', $model['image']['url'], $model['name'], $model['image']['width'], $model['image']['height']); ?>
        </div>
        <?php endforeach; ?>
      </div>
    </div>
    <pre>
      <?php print_r($models); ?>
      <?php print_r($materials); ?>
      <?php print_r($finishes); ?>
    </pre>
  </div>
</section>
