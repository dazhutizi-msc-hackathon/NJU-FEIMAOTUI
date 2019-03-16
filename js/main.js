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
    
    $('#submitBillBtn').click(function(){
        publishInfo();
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
    send({'op': 'getOrderList', 'acceptbyme': '0'}, function(data){
        par = $('#publishedList');
        par.html("");
        dat = data['orders'];
        str = '';
        for(i=0; i<dat.length; ++i){
            str = str + '<div class="list-group"><a href="#" class="list-group-item active"><h4 class="list-group-item-heading">';
            str = str + dat[i]['title'];
            str = str + '</h4></a><a href="#" class="list-group-item"><h4 class="list-group-item-heading">';
            str = str + changeStatus(dat[i]['status']) + '</h4>';
            str = str + '<div style="float:left">发布时间：' + getLocalTime(dat[i]['time']) + '</div><br>';
            str = str + '<div style="float:left">赏金：' + dat[i]['gift'] / 100 + '</div><br>';
            str = str + '<div style="float:left">跑腿类型：' + dat[i]['type'] + '</div><br>';
            if(dat[i]['name2'])str = str + '<div style="float:left">接取人姓名：' + dat[i]['name2'] + '</div><br>';
            if(dat[i]['accepttime']>0)str = str + '<div style="float:left">接取时间：' + getLocalTime(dat[i]['accepttime']) + '</div><br>';
            str = str + '<div style="float:left">截止时间：' + getLocalTime(dat[i]['deadline']) + '</div><br>';
            if(dat[i]['finishtime']>0)str = str + '<div style="float:left">完成时间：' + getLocalTime(dat[i]['finishtime']) + '</div><br>';
            str = str + '<div class="btn-group" style="float: right"><button type="button" class="btn btn-default" onclick="showOrder(this.parentNode,' + dat[i]['id'] + ')">订单详情</button>';
            if(dat[i]['status']<=1)str = str + ' <button type="button" class="btn btn-success" onclick="cancelInfo(' + dat[i]['id'] + ')">取消</button>';
            if(dat[i]['status']==1)str = str + ' <button type="button" class="btn btn-success" onclick="finishOrder(' + dat[i]['id'] + ')">送达</button>';
            str = str + '</div><br><br></a></div>';
        }
        par.html(str);
    });
    send({'op': 'getOrderList', 'acceptbyme': '1'}, function(data){
        par = $('#acceptedList');
        par.html("");
        dat = data['orders'];
        str = '';
        for(i=0; i<dat.length; ++i){
            str = str + '<div class="list-group"><a href="#" class="list-group-item active"><h4 class="list-group-item-heading">';
            str = str + dat[i]['title'];
            str = str + '</h4></a><a href="#" class="list-group-item"><h4 class="list-group-item-heading">';
            str = str + changeStatus(dat[i]['status']) + '</h4>';
            str = str + '<div style="float:left">发布时间：' + getLocalTime(dat[i]['time']) + '</div><br>';
            str = str + '<div style="float:left">赏金：' + dat[i]['gift'] / 100 + '</div><br>';
            str = str + '<div style="float:left">跑腿类型：' + dat[i]['type'] + '</div><br>';
            str = str + '<div style="float:left">发布人姓名：' + dat[i]['name'] + '</div><br>';
            str = str + '<div style="float:left">接取时间：' + getLocalTime(dat[i]['accepttime']) + '</div><br>';
            str = str + '<div style="float:left">截止时间：' + getLocalTime(dat[i]['deadline']) + '</div><br>';
            if(dat[i]['finishtime']>0)str = str + '<div style="float:left">完成时间：' + getLocalTime(dat[i]['finishtime']) + '</div><br>';
            str = str + '<div class="btn-group" style="float: right"><button type="button" class="btn btn-default" onclick="displayDetails(this.parentNode,' + dat[i]['id'] + ')">订单详情</button>';
            if(dat[i]['status']==1)str = str + ' <button type="button" class="btn btn-success" onclick="cancelInfo(' + dat[i]['id'] + ')">取消</button>';
            str = str + '</div><br><br></a></div>';
        }
        par.html(str);
    });
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

function showOrder(obj, id){
    //显示订单详情
    /*send({'op': 'getOrderById', 'id': id}, function(data){
        if(data['code'] == 0){
            str = '<div id="myAlert" class="alert alert-success"><a href="#" class="close" data-dismiss="alert">&times;</a>';
            str = str + 
        }
        else{
            displayError();
        }
    });
    var html='<div id="myAlert" class="alert alert-success">\n' +
        '    <a href="#" class="close" data-dismiss="alert">&times;</a>\n' +
        '    <strong>物品</strong><br>可口可乐x1 ￥3.00<br>黄金脆皮鸡x1 ￥996.00<br>'+
        '<strong>赏金</strong><br>￥0.99<br>'+
        '<strong>地址</strong><br>五栋5B666<br>'+
        '<strong>期望时间</strong><br>13:20<br>' +
        '<strong>留言</strong><br>阔落不冰怎么喝' +
    '</div>';
    obj.insertAdjacentHTML('beforeBegin',html);*/
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
    send({'op': 'publishInfo', 'title': $('#runTitle').val(), 'type': $('#runType').val(), 'content': $('#runContent').val(), 'money': $('#expense').val() * 100, 'gift': $('#reward').val() * 100, 'lasting': $('#expectedTimeSpan').val() * 60, 'deadline': Date.parse(new Date()) / 1000 + $('#deadline').val() *60}, function(data){
        if(data['code'] == 0){
            alert('发布成功');
            showInfoList();
            $('#runTitle').val('');
            $('#runType').val('');
            $('#runContent').val('');
            $('#expense').val('');
            $('#reward').val('');
            $('#expectedTimeSpan').val('');
            $('#deadline').val('');
        }
        else{
            displayError();
            alert('发布失败');
        }
    });
}

function cancelInfo(){
    //取消信息

}

function finisiOrder(){
    //完成订单
}

function refresh(){
    window.location = 'http://h.chper.cn';
}

function changeStatus(i){
    if(i==0)return "等待接单";
    if(i==1)return "正在完成中";
    if(i==2)return "已完成";
    if(i==3)return "已取消";
}

function getLocalTime(nS) {     
   return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');     
}