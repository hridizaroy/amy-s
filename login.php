<?php

$email = $mysqli->escape_string($_POST['email']);
$result = $mysqli->query("SELECT * FROM users WHERE email = '$email'");

if ( $result->num_rows == 0){
    $_SESSION['message'] = "User with that email doesn't exist";
    header("location: error.php");
}

else {
    $user = $result->fetch_assoc();

    if ( password_verify($_POST['password'], $user['password']) ) {

        $_SESSION['email'] = $user['email'];
        $_SESSION['username'] = $user['username'];
        $_SESSION['first-name'] = $user['first_name'];
        $_SESSION['last-name'] = $user['last_name'];
        $_SESSION['active'] = $user['active'];

        $_SESSION['logged_in'] = true;

        header("location: home - loggedIn.php");

    }

    else {
        $_SESSION['message'] = "Wrong Password. Try again.";
        header("location: error.php");
    }
}

?>