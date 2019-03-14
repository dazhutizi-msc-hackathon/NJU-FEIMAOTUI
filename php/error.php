<?php
    $OP_REQUIRED = json_encode(array('code' => -1, "info" => "You should choose one operation."));
    $OP_ERROR = json_encode(array('code' => -1, "info" => "Your operation is not defined."));
    $PARA_REQUIRED = json_encode(array('code' => -1, "info" => "Your parameters are too less."));
    $MYSQL_CONNECT_ERROR = json_encode(array('code' => -1, "info" => "Connect database error."));
    $LOGIN_ERROR = json_encode(array('code' => 1));
    $NOT_LOGIN = json('code', 2);
?>