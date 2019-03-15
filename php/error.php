<?php
    class ErrorMessage{
        var $OP_REQUIRED = json_encode(array('code' => -1, "info" => "You should choose one operation."));
        var $OP_ERROR = json_encode(array('code' => -1, "info" => "Your operation is not defined."));
        var $PARA_REQUIRED = json_encode(array('code' => -1, "info" => "Your parameters are too less."));
        var $MYSQL_CONNECT_ERROR = json_encode(array('code' => -1, "info" => "Connect database error."));
        var $LOGIN_ERROR = json_encode(array('code' => 1));
        var $NOT_LOGIN = json('code', 2);
        var $NO_AUTHORIZATION = json('code', 4);
    }
    $error = new ErrorMessage();
?>