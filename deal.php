<?php
    session_start();

    require("php/function.php");
    require("php/error.php");
    require("php/main.php");
    require("php/mysql.php");

    if(isPostParaMissing("op")){
        exit($error->OP_REQUIRED);
    }

    if(function_exists('op_'.$_POST["op"])){
        refreshDatabase();
        $op_function = 'op_'.$_POST["op"];
        exit($op_function());
    }
    else{
        exit($error->OP_ERROR);
    }
?>