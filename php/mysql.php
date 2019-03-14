<?php
    class Mysql{
        var $un="",$pw="";
        var $conn;
        var $connected=false;
        function connect(){
            $this->close();
            if(!($this->conn=mysqli_connect("localhost",$this->un,$this->pw,$this->un))){
                return false;
            }
            mysqli_query($this->conn,"set names utf8");
            return $this->connected=true;
        }
        function close(){
            if(!$this->connected){
                return true;
            }
            if(mysqli_close($this->conn)){
                $this->conn=0;
                $this->connected=false;
                return true;
            }
            else{
                return false;
            }
        }
        function query(&$result, $select, $from, $where, $limit=0){
            $result=array();
            if(!$this->connected){
                return 0;
            }
            $queryString="select ".$select." from ".$from." where ".$where[0]."=".$where[1];
            for($i=2; $i<count($where); $i+=2){
                $queryString.=" and ".$where[$i]."=".$where[$i+1];
            }
            if($limit>0){
                $queryString.=" limit ".$limit;
            }
            $query=mysqli_query($this->conn, $queryString);
            $count=0;
            while($row=mysqli_fetch_array($query,MYSQLI_ASSOC)){
                array_push($result,$row);
                $count++;
            }
            return $count;
        }
    }
?>