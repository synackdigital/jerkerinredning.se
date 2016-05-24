<?php $post_thumbnail = wp_get_attachment_image_src(get_post_thumbnail_id(), 1920); ?>
<div class="post-thumbnail" style="background-image:url('<?php echo $post_thumbnail[0]; ?>');">&nbsp;</div>
