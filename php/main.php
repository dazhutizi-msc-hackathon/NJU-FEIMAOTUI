<?php
    function op_login(){
        if(isPostParaMissing("number") || isPostParaMissing("password")){
            return $PARA_REQUIRED;
        }
        $number = $_POST['number'];
        $password = $_POST['password'];
        $mysql = new Mysql();
        $mysql->connect() or exit($MYSQL_CONNECT_ERROR);
        if($mysql->query($res, '*', 'user', array('number', "'$number'", 'password', "'$password'"), 1) == 0){
            return $LOGIN_ERROR;
        }
        $_SESSION['id'] = $res[0]['id'];
        $_SESSION['number'] = $res[0]['number'];
        $mysql->close();
        return json('code', 0, 'id', $res[0]['id']);
    }
    function op_whoami(){
        if(!isLogin()){
            return $NOT_LOGIN;
        }
        $mysql = new Mysql();
        $mysql->connect() or exit($MYSQL_CONNECT_ERROR);
        $mysql->query($res, '*', 'user', array('id', $_SESSION['id']), 1);
        $mysql->close();
        return json('code', 0, 'number', $res[0]['number'], 'phone', $res[0]['phone'], 'name', $res[0]['name'], 'grade', $res[0]['grade'], 'major', $res[0]['major'], 'money', $res[0]['money']);
    }
    function op_getInfoList(){
        if(isPostParaMissing('id')){
            return $PARA_REQUIRED;
        }
        $id = postVal('id');
        $mysql = new Mysql();
        $mysql->connect() or exit($MYSQL_CONNECT_ERROR);
        if($id == 0){
            $mysql->query($res, '*', 'infomation', array('userid', $_SESSION['id']));
        }
        else{
            $mysql->query($res, '*', 'infomation', array('status', 0));
        }
        $mysql->close();
        $arr = array();
        for $r in $res{
            $arr[] = array('id' => $r['id'], 'title' => $r['title', 'name' => $r['name'], 'score' => $r['score'], 'deadline' => $r['deadline'], 'lasting' => $r['lasting'], 'gift' => $r['gift'], 'type' => $r['type'], 'status' => $r['status']]);
        }
        return json('code', 0, 'infos', $arr);
    }
?>