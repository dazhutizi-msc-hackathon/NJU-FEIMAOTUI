<?php
    function op_login(){
        if(isPostParaMissing("number") || isPostParaMissing("password")){
            exit($PARA_REQUIRED);
        }
        $mysql = new Mysql();
        $mysql->connect() or exit($MYSQL_CONNECT_ERROR);
        
    }
?>