<?php
    function isPostParaMissing(){
        for($i = 0; $i < func_num_args(); $i ++){
            if(!isset($_POST[func_get_arg($i)])){
                return true;
            }
        }
        return false;
    }
    function isLogin(){
        return isset($_SESSION['id']) && $_SESSION['id'] != 0;
    }
    function json(){
        $arr = array();
        $cnt = func_num_args();
        for($i = 0; $i < $cnt; $i += 2){
            $arr[][func_get_arg($i)] = func_get_arg($i + 1);
        }
        return json_encode($arr);
    }
    function postVal($str){
        return intval(trim($_POST[$str]));
    }
    function toMysqlStr($str){
        return "'$str'";
    }
    function declineUserScore($uid, $iid){
        //降低用户评分
    }
    function increseUserScore($uid, $iid){
        //提升用户评分
    }
?>