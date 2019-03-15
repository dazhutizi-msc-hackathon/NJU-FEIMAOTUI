<?php
    class ErrorMessage{
        var $OP_REQUIRED;
        var $OP_ERROR;
        var $PARA_REQUIRED;
        var $MYSQL_CONNECT_ERROR;
        var $LOGIN_ERROR;
        var $NOT_LOGIN;
        var $NO_AUTHORIZATION;
        function __construct(){
            $this->OP_REQUIRED = json_encode(array('code' => -1, "info" => "You should choose one operation."));
            $this->OP_ERROR = json_encode(array('code' => -1, "info" => "Your operation is not defined."));
            $this->PARA_REQUIRED = json_encode(array('code' => -1, "info" => "Your parameters are too less."));
            $this->MYSQL_CONNECT_ERROR = json_encode(array('code' => -1, "info" => "Connect database error."));
            $this->LOGIN_ERROR = json_encode(array('code' => 1));
            $this->NOT_LOGIN = json('code', 2);
            $this->NO_AUTHORIZATION = json('code', 4);
        }
    }
    $error = new ErrorMessage();
?>