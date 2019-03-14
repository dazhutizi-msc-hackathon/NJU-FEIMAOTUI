<?php
    session_start();

    require("php/function.php");
    require("php/error.php");
    require("php/main.php");
    require("php/mysql.php");

    if(isPostParaMissing("op")){
        exit($OP_REQUIRED);
    }

    if(function_exists('op_'.$_POST["op"])){
        exit(('op_'.$_POST["op"])());
    }
    else{
        exit($OP_ERROR);
    }
?>