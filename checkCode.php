<?php

//Get 4 digit code as post variable
//If code exists in db continue, else return
//If active == 0, continue, else return
//Get array of fields booleans [0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0] and return it

/*On bot page*/
//Assign roles of the 1 fields (Make an array or enumerated constant in the order of fields)
//Add role 'Member'
    require 'db.php';

    $code = $_GET['code'];
    $usertag = $_GET['usertag'];

    //To check if attempts > 3
    $sql = "SELECT attempts from attempts where usertag = '$usertag'";
    $result = $mysqli->query($sql) or die($mysqli->error());

    //If usertag exists
    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        $attempts = $user['attempts'];

        if ($attempts >= 3) {
            echo "err3"; //atttempts > 3
        }
        else {
            $sqlUpdateAttempt = "UPDATE attempts set attempts = attempts + 1 where usertag = '$usertag'";
            $mysqli->query($sqlUpdateAttempt);

            $sql2 = "SELECT * FROM elements where code = '$code'";
            $result2 = $mysqli->query($sql2) or die($mysqli->error());

            if ($result2->num_rows > 0) {
                $element = $result2->fetch_assoc();

                if ($element['active'] == 0) {
                    $sql3 = "UPDATE elements set active = 1 where code = $code";
                    $mysqli->query($sql3);

                    $sql4 = "UPDATE attempts set code = '$code' where usertag = '$usertag'";
                    $mysqli->query($sql4);

                    $nodes = $element['webdesign'].$element['3dblender'].$element['3dsketchup'].$element['android'].$element['webdev'].$element['soundmixing'].$element['videoediting'].$element['java'].$element['c++'].$element['hardware'].$element['lego'];
                    echo $nodes;
                }
                else {
                    echo "err2"; //Member already active
                }
            }
            else {
                echo "err1"; //Code does not exist
            }
        }
    }
    else {
        $sql4 = "INSERT INTO attempts (usertag, attempts) values ('$usertag', '1')";
        $mysqli->query($sql4);

        $sql2 = "SELECT * FROM elements where code = '$code'";
        $result2 = $mysqli->query($sql2) or die($mysqli->error());

        if ($result2->num_rows > 0) {
            $element = $result2->fetch_assoc();
            if ($element['active'] == 0) {
                $sql3 = "UPDATE elements set active = 1 where code = $code";
                $mysqli->query($sql3);

                $sql4 = "UPDATE attempts set code = '$code' where usertag = '$usertag'";
                $mysqli->query($sql4);

                $nodes = $element['webdesign'].$element['3dblender'].$element['3dsketchup'].$element['android'].$element['webdev'].$element['soundmixing'].$element['videoediting'].$element['java'].$element['c++'].$element['hardware'].$element['lego'];
                echo $nodes;
            }
            else {
                echo "err2"; //Member already active
            }
        }
        else {
            echo "err1"; //Code does not exist
        }
    }

?>