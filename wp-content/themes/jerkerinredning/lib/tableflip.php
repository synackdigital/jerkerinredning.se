<?php

namespace Jerker\Tableflip;

add_action( 'wp_ajax_mail_tableflip_order', __NAMESPACE__.'\\mail_tableflip_order' );
add_action( 'wp_ajax_nopriv_mail_tableflip_order', __NAMESPACE__.'\\mail_tableflip_order' );

function mail_tableflip_order() {
  if (isset($_POST['data'])) {

    $data = json_decode(stripslashes($_POST['data']), true);

    // Get recipient email address from ACF options page, or fallback to admin email
    if (function_exists('get_field') && get_field('order_recipient_email', 'option')):
      $to = get_field('order_recipient_email', 'option');
    else:
      $to = get_option('admin_email');
    endif;

    $subject = 'En beställning från jerkerinredning.se';
    $message = ''
      . 'En beställning skickades från <strong>'.$data['customer']['name'].'</strong><br>'
      . 'Telefon: '.$data['customer']['phone'].'<br>'
      . 'E-post: '.$data['customer']['email'].'<br><br>'
      . '<strong>'.$data['order']['model']['name'].'</strong>, '
      . $data['order']['material']['name'].' med '
      . $data['order']['finish']['name'].'<br><br>'
      . 'Kundens meddelande: "' . $data['customer']['message'].'"<br><br>'
      . 'Bredd/längd: '.$data['order']['width'].'/'.$data['order']['length'].'<br>'
      . 'Angivet pris: '.$data['order']['price'].' '.$data['order']['currency'];

    add_filter('wp_mail_content_type', 'set_html_content_type');

    $mail = wp_mail($to, $subject, $message);

    remove_filter('wp_mail_content_type', 'set_html_content_type');

    echo $_POST['data'];
  }
  else {
    echo '$_POST is not set';
  }

  exit;
}
