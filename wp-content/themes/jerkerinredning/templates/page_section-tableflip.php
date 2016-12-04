<?php
  $models = get_sub_field( 'models' );
  $materials = get_sub_field( 'materials' );
  $finishes = get_sub_field( 'finishes' );
?>

<section class="page-section page-section_tableflip">
  <?php if ( get_sub_field('id')): echo '<a name="'.get_sub_field('id').'"></a>'; endif; ?>

  <?php if ( get_sub_field('headline') ): ?>
  <h2 class="page-section-headline"><?php the_sub_field('headline'); ?></h2>
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
        <button class="tableflip__control tableflip__control--prev">&lsaquo;</button>
        <span class="tableflip__label tableflip__label--model">&nbsp;</span>
        <button class="tableflip__control tableflip__control--next">&rsaquo;</button>
      </div>
    </div>

    <div class="tableflip__materials">
      <?php foreach ( $materials as $key => $material ) : ?>
        <?php unset($materials[$key]['image']); $json_material = $materials[$key]; ?>
      <button class="tableflip__material tableflip__control" data-tableflip-material="<?php echo htmlspecialchars(json_encode($json_material)); ?>">
        <?php echo sprintf('<img src="%s" alt="%s" width="%d" height="%d">', $material['image']['url'], $material['name'], $material['image']['width'], $material['image']['height']); ?>
        <?php echo $material['name']; ?>
      </button>
      <?php endforeach; ?>
    </div>

    <div class="tableflip__finishes">
      <?php foreach ( $finishes as $key => $finish ) : ?>
      <button class="tableflip__finish tableflip__control" data-tableflip-finish="<?php echo htmlspecialchars(json_encode($finish)); ?>">
        <?php echo $finish['name']; ?>
      </button>
      <?php endforeach; ?>
    </div>

    <div class="tableflip__dimensions">
      <div class="range-slider">
        Bredd
        <input class="tableflip__control tableflip__control--width range-input" type="range" value="0" min="0" max="0" step="10">
        <span class="tableflip__label tableflip__label--width range-label">&nbsp;</span>
      </div>
      <div class="range-slider">
        Längd
        <input class="tableflip__control tableflip__control--length range-input" type="range" value="0" min="0" max="0" step="10">
        <span class="tableflip__label tableflip__label--length range-label">&nbsp;</span>
      </div>
    </div>

    <div class="tableflip__order">
      <div class="tableflip__customer">
        <p><strong>Vänligen fyll i dina uppgifter, så kontaktar vi dig.</strong></p>
        <p class="input-group">
          <span class="input-group-addon">Namn</span>
          <input type="text" class="form-control" id="tableflip__control__customer-name" placeholder="Jerker Johansson">
        </p>
        <p class="input-group">
          <span class="input-group-addon">E-post</span>
          <input type="email" class="form-control" id="tableflip__control__customer-email" placeholder="post@jerker.eu">
        </p>
        <p class="input-group">
          <span class="input-group-addon">Telefon</span>
          <input type="email" class="form-control" id="tableflip__control__customer-phone" placeholder="040–493 100">
        </p>
        <p><em>Tryck på knappen igen för att skicka</em></p>
      </div>

      <button class="tableflip__control tableflip__control--order btn btn-lg">&nbsp;</button>

      <div class="tableflip__thankyou">
        <h3>Tack för din beställning</h3>
        <p>Vi återkommer till dig för en bekräftelse inom kort.</p>
      </div>
    </div>

  </div>
</section>
