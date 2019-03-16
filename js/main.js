$(function(){
    send({'op': 'check'}, function(data){
        if(data['code'] == 0){
            showInfoList();
            showOrderList();
        }
        else{
            showLogin();
        }
    });
    
    $('#btnLogin').click(function(){
        Login();
    });
    
    $('#exitUser').click(function(){
        hideUserInfo();
    });
    
    $('#myTab').click(function(){
        showUserInfo();
    });
    
    $('#btnLogout').click(function(){
        send({'op': 'logout'}, function(){
            refresh();
        });
    });
});

function send(dat, succ){
    showProgress();
    $.ajax({
        url: '../deal.php',
        type: 'post',
        datatype: 'json',
        data: dat,
        success: function(data){
            succ(JSON.parse(data));
            hideProgress();
        },
        error: function(){
            displayError();
            hideProgress();
        }
    });
}

function showProgress(){
    //显示中间一个进度条，等待
}

function hideProgress(){
    //隐藏中间进度条
}

function displayError(){
    alert("Something wrong happened.");
}

function showInfoList(){
    //获取信息列表并显示

    $.ajax({
        url:"deal.php",
        type:"POST",
        dataType:"JSON",
        data:{"op":"getInfoList" },
        success:function(data){
            var info=data.infos;
            for(var i=0;i<info.length;i++){
                var adding=$('<div class="list-group" id=info[i].id></div>');
                adding.innerHTML="<a class=\"list-group-item active\" >"+
                    "<h4 class=\"list-group-item-heading\">"+
                        info[i].title+" &yen;"+info[i].gift+"<span style=\"float:right\">"+info[i].type+"</span>"+
                        "</h4><span class=\"list-group-item\">"+
                            "<h4 class=\"list-group-item-heading\">"+info[i].name+"<span style=\"float:right\">发布人评分:"+info[i].score+"</span></h4>"+
                            "<p class=\"list-group-item-text\">"+
                                "<div style=\"float:right\">预计耗时:"+info[i].lasting+"</div><br>"+
                                "送达截止时间:"+info[i].deadline+"<br><br></p></span></a>";
                document.write(adding);
            }
        },
        error:function(Error){
            alert(Error);
        }});
}

function showOrderList(){
    //获取我发布的/接取的订单列表并显示

}

function showLogin(){
    //显示登录界面
    $(".mActive").removeClass('mActive');
    $("#signIn").addClass('mActive');
    $("#myPage").css('display', 'block');
}

function hideLogin(){
    //隐藏登录界面
    $(".mActive").removeClass('mActive');
    $("#myPage").css('display', 'none');
}

function Login(){
    //点击登录按钮
    send({'op': 'login', 'number': $('#number').val(), 'password': $('#password').val()}, function(data){
        if(data["code"] == 0){
            showInfoList();
            showOrderList();
            hideLogin();
        }
        else{
            alert('学号或密码错误！');
        }
    });
    $('#number').val("");
    $('#password').val("");
}

function showInfo(){
    //显示信息详情

}

function showOrder(){
    //显示订单详情

}

function showUserInfo(){
    //显示个人信息
    send({'op': 'whoami'}, function(data){
        $('#myinfos').html('学号：' + data['number'] + '<br>姓名：' + data['name'] + '<br>手机：' + data['phone'] + '<br>年级：' + data['grade'] + '<br>专业：' + data['major'] + '<br>钱包余额：' + data['money'] / 100 + '元');
        $("#myInfo").addClass('mActive');
        $("#myPage").css('display', 'block');
    });
}

function hideUserInfo(){
    //隐藏个人信息
    $(".mActive").removeClass('mActive');
    $("#myPage").css('display', 'none');
}

function publishInfo(){
    //发布信息

}

function cancelInfo(){
    //取消信息

}

function finisiInfo(){
    //完成订单
}

function refresh(){
    window.location = 'http://h.chper.cn';
}