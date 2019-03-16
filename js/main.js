$(function(){
    send({'op': 'check'}, function(data){
        if(data.code == 0){
            showInfoList();
            showOrderList();
        }
        else{
            showLogin();
        }
    });
});

function send(dat, succ){
    showProgress();
    $.ajax({
        url: 'deal.php',
        type: 'post',
        datatype: 'json',
        data: dat,
        success: function(data){
            succ(data);
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

}

function hideLogin(){
    //隐藏登录界面

}

function Login(){
    //点击登录按钮

}

function showInfo(){
    //显示信息详情

}

function showOrder(){
    //显示订单详情

}

function showUserInfo(){
    //显示个人信息

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