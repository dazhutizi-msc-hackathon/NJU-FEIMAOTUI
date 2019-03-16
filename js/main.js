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