<?php
    function refreshDatabase(){
        $mysql = new Mysql();
        $mysql->connect() or exit($error->MYSQL_CONNECT_ERROR);
        $mysql->cmd('update '.$GLOBALS['DATABASE_INFO'].' set status=3 where status=0 and deadline<'.time());
        $mysql->close();
    }
    function op_login(){
        global $error;
        if(isPostParaMissing("number") || isPostParaMissing("password")){
            return $error->PARA_REQUIRED;
        }
        $number = $_POST['number'];
        $password = $_POST['password'];
        $mysql = new Mysql();
        $mysql->connect() or exit($error->MYSQL_CONNECT_ERROR);
        if($mysql->query($res, '*', $GLOBALS['DATABASE_USER'], array('number', "'$number'", 'password', "'$password'"), 1) == 0){
            return $error->LOGIN_ERROR;
        }
        $_SESSION['id'] = $res[0]['id'];
        $_SESSION['name'] = $res[0]['name'];
        $_SESSION['number'] = $res[0]['number'];
        $_SESSION['score'] = $res[0]['score'];
        $_SESSION['phone'] = $res[0]['phone'];
        $mysql->close();
        return json('code', 0, 'id', $res[0]['id']);
    }
    function op_check(){
        global $error;
        if(isLogin()){
            return json('code', 0);
        }
        else{
            return $error->NOT_LOGIN;
        }
    }
    function op_logout(){
        global $error;
        if(isLogin()){
            unset($_SESSION['id']);
            unset($_SESSION['name']);
            unset($_SESSION['number']);
            unset($_SESSION['score']);
            unset($_SESSION['phone']);
            return json('code', 0);
        }
        else{
            return $error->NOT_LOGIN;
        }
    }
    function op_whoami(){
        global $error;
        if(!isLogin()){
            return $error->NOT_LOGIN;
        }
        $mysql = new Mysql();
        $mysql->connect() or exit($error->MYSQL_CONNECT_ERROR);
        $mysql->query($res, '*', $GLOBALS['DATABASE_USER'], array('id', $_SESSION['id']), 1);
        $mysql->close();
        return json('code', 0, 'number', $res[0]['number'], 'phone', $res[0]['phone'], 'name', $res[0]['name'], 'grade', $res[0]['grade'], 'major', $res[0]['major'], 'money', $res[0]['money'], 'score', $res[0]['score']);
    }
    function op_getInfoList(){
        global $error;
        if(!isLogin()){
            return $error->NOT_LOGIN;
        }
        $mysql = new Mysql();
        $mysql->connect() or exit($MYSQL_CONNECT_ERROR);
        $mysql->query($res, '*', $GLOBALS['DATABASE_INFO'], array('status', 0));
        $mysql->close();
        $arr = array();
        foreach ($res as $r){
            $arr[] = array(
                            'id' => $r['id'],
                            'title' => $r['title'],
                            'name' => $r['name'],
                            'score' => $r['score'],
                            'deadline' => $r['deadline'],
                            'lasting' => $r['lasting'],
                            'gift' => $r['gift'],
                            'type' => $r['type']
                        );
        }
        return json('code', 0, 'infos', $arr);
    }
    function op_getInfoById(){
        global $error;
        if(isPostParaMissing('id')){
            return $error->PARA_REQUIRED;
        }
        if(!isLogin()){
            return $error->NOT_LOGIN;
        }
        $id = postVal('id');
        $mysql = new Mysql();
        $mysql->connect() or exit($error->MYSQL_CONNECT_ERROR);
        $found = $mysql->query($res, '*', $GLOBALS['DATABASE_INFO'], array('id', $id, 'status', 0), 1);
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
                            'money' => $r['money'],
                            'time' => $r['time'],
                            'content' => $r['content']
                        );
            return json('code', 0, 'info', $arr);
        }
        else{
            return $error->NO_AUTHORIZATION;
        }
    }
    function op_getOrderList(){
        global $error;
        if(isPostParaMissing('acceptbyme')){
            return $error->PARA_REQUIRED;
        }
        if(!isLogin()){
            return $error->NOT_LOGIN;
        }
        $acceptbyme = postVal('acceptbyme');
        $mysql = new Mysql();
        $mysql->connect() or exit($error->MYSQL_CONNECT_ERROR);
        if($acceptbyme == 0){
            $mysql->query($res, '*', $GLOBALS['DATABASE_INFO'], array('userid', $_SESSION['id']));
        }
        else{
            $mysql->query($res, '*', $GLOBALS['DATABASE_INFO'], array('userid2', $_SESSION['id']));
        }
        $mysql->close();
        $arr = array();
        foreach ($res as $r){
            $arr[] = array(
                            'id' => $r['id'],
                            'title' => $r['title'],
                            'name' => $r['name'],
                            'name2' => $r['name2'],
                            'gift' => $r['gift'],
                            'type' => $r['type'],
                            'status' => $r['status'],
                            'time' => $r['time'],
                            'accepttime' => $r['accepttime'],
                            'deadline' => $r['deadline'],
                            'finishtime' => $r['finishtime']
                        );
        }
        return json('code', 0, 'orders', $arr);
    }
    function op_getOrderById(){
        global $error;
        if(isPostParaMissing('id') || isPostParaMissing('acceptbyme')){
            return $error->PARA_REQUIRED;
        }
        if(!isLogin()){
            return $error->NOT_LOGIN;
        }
        $id = postVal('id');
        $acceptbyme = postVal('acceptbyme');
        $mysql = new Mysql();
        $mysql->connect() or exit($error->MYSQL_CONNECT_ERROR);
        $found = $mysql->query($res, '*', $GLOBALS['DATABASE_INFO'], array('id', $id, 'userid'.($acceptbyme ? '2' : ''), $_SESSION['id']), 1);
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
                            'finishtime' => $r['finishtime']
                        );
            return json('code', 0, 'order', $arr);
        }
        else{
            return $error->NO_AUTHORIZATION;
        }
    }
    function op_acceptInfo(){
        global $error;
        if(isPostParaMissing('id')){
            return $error->PARA_REQUIRED;
        }
        if(!isLogin()){
            return $error->NOT_LOGIN;
        }
        $id = postVal('id');
        $mysql = new Mysql();
        $mysql->connect() or exit($error->MYSQL_CONNECT_ERROR);
        $found = $mysql->query($res, '*', $GLOBALS['DATABASE_INFO'], array('id', $id, 'status', 0), 1);
        if($found == 1){
            if($res[0]['userid'] == $_SESSION['id']){
                $mysql->close();
                return $error->NO_AUTHORIZATION;
            }
            $res = $mysql->update($GLOBALS['DATABASE_INFO'],
                array('accepttime', time(), 'finishtime', -1, 'status', 1, 'userid2', $_SESSION['id'], 'name2', toMysqlStr($_SESSION['name']), 'phone2', toMysqlStr($_SESSION['phone']), 'score2', $_SESSION['score']),
                array('id', $id, 'status', 0));
            $mysql->close();
            if($res){
                return json('code', 0);
            }
            else{
                return $error->ACCEPT_INFO_ERROR;
            }
        }
        else{
            return $error->ACCEPT_INFO_ERROR;
        }
    }
    function op_publishInfo(){
        global $error;
        if(isPostParaMissing('title', 'type', 'content', 'money', 'gift', 'lasting', 'deadline')){
            return $error->PARA_REQUIRED;
        }
        if(!isLogin()){
            return $error->NOT_LOGIN;
        }
        $title = toMysqlStr($_POST['title']);
        $type = toMysqlStr($_POST['type']);
        $content = toMysqlStr($_POST['content']);
        $money = postVal('money');
        $gift = postVal('gift');
        $lasting = postVal('lasting');
        $deadline = postVal('deadline');
        $mysql = new Mysql();
        $mysql->connect() or exit($error->MYSQL_CONNECT_ERROR);
        $mysql->query($user, 'money', $GLOBALS['DATABASE_USER'], array('id', $_SESSION['id']), 1);
        if(intval($user[0]['money']) < $money + $gift){
            $mysql->close();
            return $error->BALANCE_TOO_LESS;
        }
        $res = $mysql->insert($GLOBALS['DATABASE_INFO'],
            array('title', 'type', 'content', 'money', 'gift', 'lasting', 'deadline', 'time', 'status', 'userid', 'name', 'phone', 'score'),
            array($title, $type, $content, $money, $gift, $lasting, $deadline, time(), 0, $_SESSION['id'], toMysqlStr($_SESSION['name']), toMysqlStr($_SESSION['phone']), $_SESSION['score']));
        if($res){
            $id = $mysql->cmd("select LAST_INSERT_ID");
            $mysql->cmd('update ' . $GLOBALS['DATABASE_USER'] . ' set money=money-'. ($money + $gift) . ' where id=' . $_SESSION['id']);
            $mysql->close();
            return json('code', 0, 'id', $id);
        }
        else{
            $mysql->close();
            return $error->MYSQL_CONNECT_ERROR;
        }
    }
    function op_cancelOrder(){
        global $error;
        if(isPostParaMissing('id')){
            return $error->PARA_REQUIRED;
        }
        if(!isLogin()){
            return $error->NOT_LOGIN;
        }
        $id = postVal('id');
        $mysql = new Mysql();
        $mysql->connect() or exit($error->MYSQL_CONNECT_ERROR);
        $found = $mysql->query($res, '*', $GLOBALS['DATABASE_INFO'], array('id', $id), 1);
        $money = intval($res[0]['money']);
        $gift = intval($res[0]['gift']);
        $userid = intval($res[0]['userid']);
        if($found == 0){
            $mysql->close();
            return $error->NO_AUTHORIZATION;
        }
        if($res[0]['userid'] != $_SESSION['id'] && $res[0]['userid2'] != $_SESSION['id']){
            $mysql->close();
            return $error->NO_AUTHORIZATION;
        }
        if(intval($res[0]['status']) >= 2){
            $mysql->close();
            return $error->CANCEL_INFO_ERROR;
        }
        if(intval($res[0]['status']) == 0 && $res[0]['userid'] != $_SESSION['id']){
            $mysql->close();
            return $error->NO_AUTHORIZATION;
        }
        $res = $mysql->update($GLOBALS['DATABASE_INFO'], array('status', 3, 'finishtime', time()), array('id', $id));
        if($res){
            $res = $mysql->cmd('update ' . $GLOBALS['DATABASE_USER'] . ' set money=money+'. ($money + $gift) . ' where id=' . $userid);
            $mysql->close();
            declineUserScore(intval($_SESSION['id']), $id);
            return json('code', 0);
        }
        else{
            $mysql->close();
            return $error->MYSQL_CONNECT_ERROR; 
        }
    }
    function op_finishOrder(){
        global $error;
        if(isPostParaMissing('id')){
            return $error->PARA_REQUIRED;
        }
        if(!isLogin()){
            return $error->NOT_LOGIN;
        }
        $id = postVal('id');
        $mysql = new Mysql();
        $mysql->connect() or exit($error->MYSQL_CONNECT_ERROR);
        $found = $mysql->query($res, '*', $GLOBALS['DATABASE_INFO'], array('id', $id), 1);
        if($found == 0){
            $mysql->close();
            return $error->NO_AUTHORIZATION;
        }
        if($res[0]['userid'] != $_SESSION['id']){
            $mysql->close();
            return $error->NO_AUTHORIZATION;
        }
        if(intval($res[0]['status']) == 0){
            $mysql->close();
            return $error->NO_AUTHORIZATION;
        }
        if(intval($res[0]['status']) != 1){
            $mysql->close();
            return $error->FINISH_ORDER_ERROR;
        }
        $money = intval($res[0]['money']);
        $gift = intval($res[0]['gift']);
        $userid2 = intval($res[0]['userid2']);
        $res = $mysql->update($GLOBALS['DATABASE_INFO'], array('status', 2, 'finishtime', time()), array('id', $id));
        if(!$res){
            $mysql->close();
            return $error->MYSQL_CONNECT_ERROR;
        }
        $res = $mysql->cmd('update ' . $GLOBALS['DATABASE_USER'] . ' set money=money+'. ($money + $gift) . ' where id=' . $userid2);
        $mysql->close();
        if(!$res){
            return $error->MYSQL_CONNECT_ERROR;
        }
        increseUserScore(intval($_SESSION['id']), $id);
        increseUserScore($userid2, $id);
        return json('code', 0);
    }
?>