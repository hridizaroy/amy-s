<?php

    require 'db.php';
    session_start();

    require 'functions.php';

    $files = listFiles($_SESSION['teamName'], $_SESSION['projectName']);

    if (isset($_POST['fileName'])) {
        if (in_array($_POST['fileName'].".txt", $files)) {
            echo "0";
        }
        else {
            echo "1";
        }
    }

?>