<footer class="content-info" role="contentinfo">
  <div class="container">

    <?php if ( get_field('footer_text', 'option') ): ?>
    <div class="row">
      <div class="col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
        <div class="footer__text">
          <a name="kontakt"></a>
          <?php the_field('footer_text', 'option'); ?>
        </div>
      </div>
    </div>
    <?php endif; ?>

    <?php if( have_rows('footer_links', 'option') ): ?>
    <div class="row">
      <div class="col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
        <div class="footer__links">
          <?php while( have_rows('footer_links', 'option') ): the_row(); ?>
          <a href="<?php the_sub_field('link_url'); ?>" class="footer__link" target="_blank"><?php the_sub_field('link_label'); ?></a>
          <?php endwhile; ?>
        </div>
      </div>
    </div>
    <?php endif; ?>
  </div>
</footer>
