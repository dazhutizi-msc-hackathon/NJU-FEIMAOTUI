<?php
    require('mysqlcfg.php');

    class Mysql{
        var $conn;
        var $connected = false;
        function connect(){
            $this->close();
            if(!($this->conn = mysqli_connect("localhost", $GLOBALS['DATABASE_USERNAME'], $GLOBALS['DATABASE_PASSWORD'], $GLOBALS['DATABASE_NAME']))){
                return false;
            }
            mysqli_query($this->conn, "set names utf8");
            return $this->connected = true;
        }
        function close(){
            if(!$this->connected){
                return true;
            }
            if(mysqli_close($this->conn)){
                $this->conn = 0;
                $this->connected = false;
                return true;
            }
            else{
                return false;
            }
        }
        function query(&$result, $select, $from, $where, $limit = 0){
            $result = array();
            if(!$this->connected){
                return 0;
            }
            $queryString = "select " . $select . " from " . $from . " where " . $where[0] . "=" . $where[1];
            for($i = 2; $i < count($where); $i += 2){
                $queryString .= " and " . $where[$i] . "=" . $where[$i + 1];
            }
            if($limit > 0){
                $queryString .= " limit " . $limit;
            }
            $query = mysqli_query($this->conn, $queryString);
            if(!$query){
                return 0;
            }
            $count = 0;
            while($row = mysqli_fetch_array($query, MYSQLI_ASSOC)){
                array_push($result, $row);
                $count++;
            }
            return $count;
        }
        function insert($table, $key, $value){
            if(!$this->connected){
                return 0;
            }
            if(count($key) != count($value) || count($value) == 0){
                return 0;
            }
            $keys = implode(", ", $key);
            $values = implode(", ", $value);
            $queryString = "insert into $table ($keys) VALUES($values)"
            $query = mysqli_query($this->conn, $queryString);
            return $query ? 1 : 0;
        }
        function update($table, $set, $where){
            if(!$this->connected){
                return 0;
            }
            $queryString = "update $table set " . $set[0] . "=" . $set[1];
            for($i = 2; $i < count($set); $i += 2){
                $queryString .= ", " . $set[$i] . "=" . $set[$i + 1];
            }
            if(isset($where)){
                $queryString .= " where " . $where[0] . "=" . $where[1];
                for($i = 2; $i < count($where); $i += 2){
                    $queryString .= " and " . $where[$i] . "=" . $where[$i + 1];
                }
            }
            $query = mysqli_query($this->conn, $queryString);
            return $query ? 1 : 0;
        }
        function cmd($str){
            return mysqli_query($this->conn, $str) ? 1 : 0;
        }
    }
?>