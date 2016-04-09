<?php
	
	if ($_SERVER['REQUEST_METHOD'] !== 'POST'){http_response_code(404); exit;}
	
	$name = $_POST['name'];
	$email = $_POST['email'];
	$phone = $_POST['phone'];
	$subject = $_POST['subject'];
	$message = $_POST['message'];
    
	if(!isValid($name, $email, $subject, $message)){http_response_code(400); exit;}
    
	sendEmail($name, $email, $phone, $subject, $message);
    
	function sendEmail($name, $email, $phone, $subject, $message){
	    $body = "Name: ".$name."";
	    $body .= "\r\nEmail: ".$email;
	    $body .= "\r\nPhone: ".$phone;
	    $body .= "\r\n\r\n\r\nSubject: ".$subject;
	    $body .= "\r\n\r\nMessage:\r\n".$message;
        
	    $body = wordwrap($body, 70, "\r\n");
		
	    mail('hbhclydesdales@aol.com', 'HBH Contact Form - '.$name, $body);
	}
    
	function isValid($name, $email, $subject, $message){
	    $errors = [];
		
	    //name
	    if($name == '') array_push($errors, 'name');
        
	    //email
	    if($email == '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) array_push($errors, 'email');
                
        //subject
	    if($subject == '') array_push($errors, 'subject');
        
        //message
	    if($message == '') array_push($errors, 'message');
        
        
	    if(count($errors) > 0){
	        echo json_encode($errors);
	        return false;
	    }
	    return true;
	}
    
?>