<?php 
	
	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exception;

	require 'PHPMailer/src/Exception.php';
	require 'PHPMailer/src/PHPMailer.php';

	$mail = new PHPMailer;
	$mail->CharSet = 'UTF-8';
	$mail->IsHTML(true);

	// от кого письмо
	$mail->setFrom('info@' . $_SERVER['HTTP_HOST'], 'Альтернатива');
	// кому отправить
	// $admin_email  = ['quiz24-job@yandex.ru'];
	$admin_email  = ['alt-mf@yandex.ru', 'alt-mf@yandex.ru', 'alt-mf@yandex.ru', 'alt-mf@yandex.ru'];
	foreach ( $admin_email as $key => $value ) {
		$mail->addAddress($value);
	}
	$form_subject = 'Заявка с сайта Альтернатива';
	$mail->Subject = $form_subject;

	$c = true;
	$message = '';
	// $message2 = '';
	foreach ( $_POST as $key => $value ) {
		if ( $value != ""  && $key != "admin_email" && $key != "form_subject" ) {
			if (is_array($value)) {
				$val_text = '';
				foreach ($value as $val) {
					if ($val && $val != '') {
						$val_text .= ($val_text==''?'':', ').$val;
					}
				}
				$value = $val_text;
			}
			// $message2 .= "{$key}: {$value} \n";

			$message .= "
			" . ( ($c = !$c) ? '<tr>':'<tr style="background-color: #f8f8f8;">' ) . "
			<td style='padding: 10px; width: auto;'><b>$key:</b></td>
			<td style='padding: 10px;width: 100%;'>$value</td>
			</tr>
			";

		}
	}

	$message = "<table style='width: 50%;'>$message</table>";

	// if(!empty($_FILES['file']['tmp_name'])){
	// 	$filePath = __DIR__ . "/upload/" . $_FILES['file']['name'];
	// 	if(copy($_FILES['file']['tmp_name'], $filePath)){
	// 		$fileAttach = $filePath;
	// 		$message .= '<p><b>Файл в приложении:</b></p>';
	// 		$mail->addAttachment($fileAttach);
	// 	}
	// }

	# не отправлять если есть чужая ссылка
	if(stristr($message, "http") || stristr($message, "www") || stristr($message, "@")) exit();
	
	$body = $message;
	// $mail->isHTML(true);  это если прям верстка
	$mail->msgHTML($body);

	$mail->send();

	$response = ['message' => $message];
	echo json_encode($response);

	//require_once ('query/index.php');

	//Добавляем лид  
    $srm_lead_url = "https://eurokappa.bitrix24.ru/rest/5274/ocqpp8glkn36y0l1/crm.lead.add";
    $srm_lead_add = http_build_query(array(
      'fields' => array(
        "TITLE" => $title,
        "NAME" => $name,
        "OPENED" => "Y",
        "PHONE" => array(
          array("VALUE" => $phone, "VALUE_TYPE" => "WORK")
        ),
      ),
      'params' => array("REGISTER_SONET_EVENT" => "Y")
    ));

    $curl_lead_add = curl_init();
    curl_setopt_array($curl_lead_add, array(
      CURLOPT_SSL_VERIFYPEER => 0,
      CURLOPT_POST => 1,
      CURLOPT_HEADER => 0,
      CURLOPT_RETURNTRANSFER => 1,
      CURLOPT_URL => $srm_lead_url,
      CURLOPT_POSTFIELDS => $srm_lead_add,
    ));
    $new_lead = curl_exec($curl_lead_add);
    curl_close($curl_lead_add);

    $new_lead = json_decode($new_lead, 1);

    $leadID = isset($new_lead['result']) ? $new_lead['result'] : 0;
    echo '$leadID = ' . $leadID;