<?php

$_SESSION['email'] = $_POST['email'];
$_SESSION['first_name'] = $_POST['firstname'];
$_SESSION['last_name'] = $_POST['lastname'];
$_SESSION['username'] = $_POST['username'];

$first_name = $mysqli->escape_string($_POST['firstname']);
$last_name = $mysqli->escape_string($_POST['lastname']);
$username = $mysqli->escape_string($_POST['username']);
$email = $mysqli->escape_string($_POST['email']);
$password = $mysqli->escape_string(password_hash($_POST['password'], PASSWORD_BCRYPT));
$hash = $mysqli->escape_string( md5( rand(0,1000) ) );

$result = $mysqli->query("SELECT * FROM users WHERE email = '$email'") or die($mysqli->error());

if ($result->num_rows > 0) {
    $_SESSION['message'] = "User with email already exists.";
    header("location: error.php");
}

else {
    
    $sample = serialize(array());

    $sql = "INSERT INTO users (username, password, hash, first_name, last_name, email, teams)" . "VALUES ('$username', '$password', '$hash', '$first_name', '$last_name', '$email', '$sample')";

    $sql2 = "INSERT INTO activestatus (username)" . "VALUES ('$username')";

    if ( $mysqli->query($sql) ){
        $_SESSION['active'] = 0;
        $_SESSION['logged_in'] = true;
        
        $_SESSION['message'] = 
                    "Confirmation link has been sent to $email, please verify your account by clicking on the link in the message.";
    
        $to = $email;
        $subject = 'Account Verification (ctrlscollab.co)';
        $message_body = '
        Hello '.$first_name.',
        Thank You for signing up!
        Please click this link to activate your account:

        http://www.ctrlscollab.co/verify.php?email='.$email.'&hash='.$hash;

        mail( $to, $subject, $message_body );

        if ($mysqli->query($sql2)) {
            header("location: success.php");
        }     

    }

    else {
        $_SESSION['message'] = 'Registration Failed.';
        header("location: error.php");
    }
}

?>
