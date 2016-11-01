<?php

namespace Jerker\Tableflip;

add_action( 'wp_ajax_mail_tableflip_order', __NAMESPACE__.'\\mail_tableflip_order' );
add_action( 'wp_ajax_nopriv_mail_tableflip_order', __NAMESPACE__.'\\mail_tableflip_order' );

function mail_tableflip_order() {
  if (isset($_POST['data'])) {

    $data = json_decode(stripslashes($_POST['data']), true);

    $to = array('frebro@gmail.com');
    $subject = 'Beställning från jerkerinredning.se';
    $message = '<p>'
      . 'En beställning skickades från '.$data['customer']['name']
      . '<br>'
      . 'Tel: '.$data['customer']['phone']
      . '<br>'
      . 'Mail: '.$data['customer']['email']
      . '<br><br>'
      . $data['order']['model']['name']
      . ' i '.$data['order']['material']['name']
      . ' med '.$data['order']['finish']['name']
      . '<br>'
      . 'Mått: '.$data['order']['width']
      . '×'.$data['order']['length']
      . '<br>'
      . 'Pris: '.$data['order']['price']
      . ' '.$data['order']['currency']
      . '</p>';

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
