<?php
    class ErrorMessage{
        var $OP_REQUIRED;
        var $OP_ERROR;
        var $PARA_REQUIRED;
        var $MYSQL_CONNECT_ERROR;
        var $LOGIN_ERROR;
        var $NOT_LOGIN;
        var $NO_AUTHORIZATION;
        var $ACCEPT_INFO_ERROR;
        var $CANCEL_INFO_ERROR;
        var $BALANCE_TOO_LESS;
        var $FINISH_ORDER_ERROR;
        function __construct(){
            $this->OP_REQUIRED = json_encode(array('code' => -1, "info" => "You should choose one operation."));
            $this->OP_ERROR = json_encode(array('code' => -1, "info" => "Your operation is not defined."));
            $this->PARA_REQUIRED = json_encode(array('code' => -1, "info" => "Your parameters are too less."));
            $this->MYSQL_CONNECT_ERROR = json_encode(array('code' => -1, "info" => "Connect database error."));
            $this->LOGIN_ERROR = json_encode(array('code' => 1));
            $this->NOT_LOGIN = json('code', 2);
            $this->NO_AUTHORIZATION = json('code', 4);
            $this->ACCEPT_INFO_ERROR = json('code', 3);
            $this->CANCEL_INFO_ERROR = json('code', 3);
            $this->BALANCE_TOO_LESS = json('code', 6);
            $this->FINISH_ORDER_ERROR = json('code', 3);
        }
    }
    $error = new ErrorMessage();
?>