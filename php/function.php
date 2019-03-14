<?php
    function isPostParaMissing($str){
        return !isset($_POST[$str]);
    }
?>