<?php

//Get 4 digit code as post variable
//If code exists in db continue, else return
//If active == 0, continue, else return
//Get array of fields booleans [0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0] and return it

/*On bot page*/
//Assign roles of the 1 fields (Make an array or enumerated constant in the order of fields)
//Add role 'Member'
    require 'db.php';

    $code = $_POST['code'];

    $sql = "SELECT * FROM elements where code = '$code'";
    $result = $mysqli->query($sql) or die($mysqli->error());

    if ($result->num_rows > 0) {
        $element = $result->fetch_assoc();
        if ($element['active'] == 0) {
            $nodes = $element['webdesign'].$element['3dblender'].$element['3dsketchup'].$element['android'].$element['webdev'].$element['soundmixing'].$element['videoediting'].$element['java'].$element['c++'].$element['hardware'].$element['lego'];
            echo $nodes;
        }
        else {
            echo "Member with that code is already in";
        }
    }
    else {
        echo "Member with that code does not exist buddy";
    }