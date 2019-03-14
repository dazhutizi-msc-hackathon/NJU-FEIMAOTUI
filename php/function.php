<?php
    function isPostParaMissing($str){
        return !isset($_POST[$str]);
    }
    function isLogin(){
        return isset($_SESSION['uid']) && $_SESSION['uid'] != 0;
    }
    function json(){
        $arr = array();
        $cnt = func_num_args();
        for($i = 0; $i < $cnt; $i += 2){
            $arr[] = func_get_arg($i) => func_get_arg($i + 1));
        }
        return json_encode($arr);
    }
    function postVal($str){
        return intval(trim($_POST[$str]));
    }
?>