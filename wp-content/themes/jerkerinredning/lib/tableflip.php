<?php

namespace Jerker\Tableflip;

// Enable email through AJAX
add_action( 'wp_ajax_mail_tableflip_order', __NAMESPACE__.'\\mail_tableflip_order' );
add_action( 'wp_ajax_nopriv_mail_tableflip_order', __NAMESPACE__.'\\mail_tableflip_order' );

function mail_tableflip_order() {

  // Continue only if data is recieved
  if (isset($_POST['data'])) {

    // Turn recieved data into JSON
    $data = json_decode(stripslashes($_POST['data']), true);

    // Get recipient email address from ACF options page, or fallback to admin email
    $to = array();
    if (function_exists('get_field') && get_field('order_recipient_email', 'option')):
      $to[] = get_field('order_recipient_email', 'option');
    else:
      $to[] = get_option('admin_email');
    endif;

    // Create email subject and body
    $subject = 'En offertförfrågan från jerkerinredning.se';

    $message = array();
    $message[] = 'En offertförfrågan skickades från <strong>'.$data['customer']['name'].'</strong> till '.$to.'.';

    if ($data['customer']['email'])
      $message[] = 'E-post: '.$data['customer']['email'];

    if ($data['customer']['phone'])
      $message[] = 'Telefon: '.$data['customer']['phone'];

    $message[] = '<strong>'.$data['order']['model']['name'].', '
                  . strtolower($data['order']['material']['name']).' med '
                  . strtolower($data['order']['finish']['name']).'</strong><br /><br />'
                  . 'Bredd/längd: '.$data['order']['width'].'/'.$data['order']['length'].'<br /><br />'
                  . 'Uppskattat pris: '.$data['order']['price'].' '.$data['order']['currency'];

    if ($data['customer']['message'])
      $message[] = 'Meddelande: "'.$data['customer']['message'].'"';

    // Add customer to send list
    if ($data['customer']['email'])
      $to[] = $data['customer']['email'];

    // Switch to HTML content type for wp_mail()
    add_filter('wp_mail_content_type', 'set_html_content_type');

    // Send order through wp_mail()
    $mail = wp_mail($to, $subject, implode('<br /><br />', $message));

    // Switch back to default content type
    remove_filter('wp_mail_content_type', 'set_html_content_type');

    echo $_POST['data'];
  }

  // Return an error if no data was recieved
  else {
    echo '$_POST is not set';
  }

  exit;
}
