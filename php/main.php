<?php
    function op_login(){
        global $error;
        if(isPostParaMissing("number") || isPostParaMissing("password")){
            return $error->$PARA_REQUIRED;
        }
        $number = $_POST['number'];
        $password = $_POST['password'];
        $mysql = new Mysql();
        $mysql->connect() or exit($error->$MYSQL_CONNECT_ERROR);
        if($mysql->query($res, '*', $DATABASE_USER, array('number', "'$number'", 'password', "'$password'"), 1) == 0){
            return $error->$LOGIN_ERROR;
        }
        $_SESSION['id'] = $res[0]['id'];
        $_SESSION['number'] = $res[0]['number'];
        $mysql->close();
        return json('code', 0, 'id', $res[0]['id']);
    }
    function op_whoami(){
        global $error;
        if(!isLogin()){
            return $error->$NOT_LOGIN;
        }
        $mysql = new Mysql();
        $mysql->connect() or exit($error->$MYSQL_CONNECT_ERROR);
        $mysql->query($res, '*', $DATABASE_USER, array('id', $_SESSION['id']), 1);
        $mysql->close();
        return json('code', 0, 'number', $res[0]['number'], 'phone', $res[0]['phone'], 'name', $res[0]['name'], 'grade', $res[0]['grade'], 'major', $res[0]['major'], 'money', $res[0]['money']);
    }
    function op_getInfoList(){
        global $error;
        if(isPostParaMissing('id')){
            return $error->$PARA_REQUIRED;
        }
        $id = postVal('id');
        $mysql = new Mysql();
        $mysql->connect() or exit($MYSQL_CONNECT_ERROR);
        if($id == 0){
            if(isLogin()){
                $mysql->query($res, '*', $DATABASE_INFO, array('userid', $_SESSION['id']));
            }
            else{
                return $error->$NOT_LOGIN;
            }
        }
        else{
            $mysql->query($res, '*', $DATABASE_INFO, array('status', 0));
        }
        $mysql->close();
        $arr = array();
        foreach ($r as $res){
            $arr[] = array(
                            'id' => $r['id'],
                            'title' => $r['title'],
                            'name' => $r['name'],
                            'score' => $r['score'],
                            'deadline' => $r['deadline'],
                            'lasting' => $r['lasting'],
                            'gift' => $r['gift'],
                            'type' => $r['type'],
                            'status' => $r['status']
                        );
        }
        return json('code', 0, 'infos', $arr);
    }
    function op_getInfoById(){
        global $error;
        if(isPostParaMissing('id')){
            return $error->$PARA_REQUIRED;
        }
        if(!isLogin()){
            return $error->$NOT_LOGIN;
        }
        $id = postVal('id');
        $mysql = new Mysql();
        $mysql->connect() or exit($error->$MYSQL_CONNECT_ERROR);
        $found = $mysql->query($res, '*', $DATABASE_INFO, array('id', $id, 'userid', $_SESSION['id']), 1);
        $mysql->close();
        if($found == 1){
            $r = $res[0];
            $arr = array(
                            'id' => $r['id'],
                            'title' => $r['title'],
                            'name' => $r['name'],
                            'score' => $r['score'],
                            'deadline' => $r['deadline'],
                            'lasting' => $r['lasting'],
                            'gift' => $r['gift'],
                            'type' => $r['type'],
                            'status' => $r['status'],
                            'money' => $r['money'],
                            'time' => $r['time'],
                            'content' => $r['content']
                        );
            return json('code', 0, 'info', $arr);
        }
        else{
            return $error->$NO_AUTHORIZATION;
        }
    }
    function op_getOrderById(){
        global $error;
        if(isPostParaMissing('id')){
            return $error->$PARA_REQUIRED;
        }
        if(!isLogin()){
            return $error->$NOT_LOGIN;
        }
        $id = postVal('id');
        $mysql = new Mysql();
        $mysql->connect() or exit($error->$MYSQL_CONNECT_ERROR);
        $found = $mysql->query($res, '*', $DATABASE_INFO, array('id', $id, 'userid', $_SESSION['id']), 1);
        $mysql->close();
        if($found == 1){
            $r = $res[0];
            $arr = array(
                            'id' => $r['id'],
                            'title' => $r['title'],
                            'name' => $r['name'],
                            'phone' => $r['phone'],
                            'score' => $r['score'],
                            'name2' => $r['name2'],
                            'phone2' => $r['phone2'],
                            'score2' => $r['score2'],
                            'deadline' => $r['deadline'],
                            'lasting' => $r['lasting'],
                            'gift' => $r['gift'],
                            'type' => $r['type'],
                            'money' => $r['money'],
                            'time' => $r['time'],
                            'content' => $r['content'],
                            'status' => $r['status'],
                            'accepttime' => $r['accepttime'],
                            'finishtime' => $r['finishtime'],
                            'acceptbyme' => ($_SESSION['id'] == $r['userid2'] ? 1 : 0)
                        );
            return json('code', 0, 'order', $arr);
        }
        else{
            return $error->$NO_AUTHORIZATION;
        }
    }
?>