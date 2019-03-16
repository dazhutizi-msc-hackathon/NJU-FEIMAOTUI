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
    $.ajax({
        url:"deal.php",
        type:"POST",
        dataType:"JSON",
        data:{"op":"getInfoList" },
        success:function(data){
            if(data['code']==2){
                refresh();
            }
            else{
            var info=data.infos;
            for(var i=0;i<info.length;i++){
                var adding=$('<div class="list-group" id=info[i].id></div>');
                adding.html("<a class=\"list-group-item active\" >"+
                    "<h4 class=\"list-group-item-heading\">"+
                        info[i].title+" &yen;"+info[i].gift / 100+"<span style=\"float:right\">"+info[i].type+"</span>"+
                        "</h4><span class=\"list-group-item\" style=\"color: black;\">"+
                            "<h4 class=\"list-group-item-heading\">"+info[i].name+"<span style=\"float:right\">发布人评分:"+info[i].score+"</span></h4>"+
                            "<p class=\"list-group-item-text\">"+
                                "<div style=\"float:right\">预计耗时:"+info[i].lasting / 60 + "分</div><br>"+
                                "送达截止时间:"+getLocalTime(info[i].deadline)+"<br><br></p></span></a>");
                $('#information').append(adding);
            }}
        },
        error:function(Error){
            alert(Error);
        }});
}

function showOrderList(){
    //获取我发布的/接取的订单列表并显示
    send({'op': 'getOrderList', 'acceptbyme': '0'}, function(data){
        par = $('#publishedList');
        par.html("");
        dat = data['orders'];
        str = '';
        for(i=0; i<dat.length; ++i){
            str = str + '<div class="list-group"><a href="javascript: void(0);" class="list-group-item active"><h4 class="list-group-item-heading">';
            str = str + dat[i]['title'];
            str = str + '</h4></a><a href="javascript: void(0);" class="list-group-item"><h4 class="list-group-item-heading">';
            str = str + changeStatus(dat[i]['status']) + '</h4>';
            str = str + '<div style="float:left">发布时间：' + getLocalTime(dat[i]['time']) + '</div><br>';
            str = str + '<div style="float:left">赏金：' + dat[i]['gift'] / 100 + '</div><br>';
            str = str + '<div style="float:left">跑腿类型：' + dat[i]['type'] + '</div><br>';
            if(dat[i]['name2'])str = str + '<div style="float:left">接取人姓名：' + dat[i]['name2'] + '</div><br>';
            if(dat[i]['accepttime']>0)str = str + '<div style="float:left">接取时间：' + getLocalTime(dat[i]['accepttime']) + '</div><br>';
            str = str + '<div style="float:left">截止时间：' + getLocalTime(dat[i]['deadline']) + '</div><br>';
            if(dat[i]['finishtime']>0)str = str + '<div style="float:left">完成时间：' + getLocalTime(dat[i]['finishtime']) + '</div><br>';
            str = str + '<div class="btn-group" style="float: right"><button type="button" class="btn btn-default" onclick="showOrderInPublishedBill(this.parentNode.parentNode,' + dat[i]['id'] + ')">订单详情</button>';
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
            str = str + '<div class="list-group"><a href="javascript: void(0);" class="list-group-item active"><h4 class="list-group-item-heading">';
            str = str + dat[i]['title'];
            str = str + '</h4></a><a href="javascript: void(0);" class="list-group-item"><h4 class="list-group-item-heading">';
            str = str + changeStatus(dat[i]['status']) + '</h4>';
            str = str + '<div style="float:left">发布时间：' + getLocalTime(dat[i]['time']) + '</div><br>';
            str = str + '<div style="float:left">赏金：' + dat[i]['gift'] / 100 + '</div><br>';
            str = str + '<div style="float:left">跑腿类型：' + dat[i]['type'] + '</div><br>';
            str = str + '<div style="float:left">发布人姓名：' + dat[i]['name'] + '</div><br>';
            str = str + '<div style="float:left">接取时间：' + getLocalTime(dat[i]['accepttime']) + '</div><br>';
            str = str + '<div style="float:left">截止时间：' + getLocalTime(dat[i]['deadline']) + '</div><br>';
            if(dat[i]['finishtime']>0)str = str + '<div style="float:left">完成时间：' + getLocalTime(dat[i]['finishtime']) + '</div><br>';
            str = str + '<div class="btn-group" style="float: right"><button type="button" class="btn btn-default" onclick="showOrderInAcceptedBill(this.parentNode.parentNode,' + dat[i]['id'] + ')">订单详情</button>';
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

function showOrderInPublishedBill(s,id){
    $.ajax({
        url:"deal.php",
        type:"POST",
        dataType:"JSON",
        data:{
            "op":"getOrderById",
            "id":id,
            "acceptbyme":0
        },
        success:function(data){
            if(data['code']==2){
                refresh();

            }else{
            var status;
            var detailedInfo=data['order'];
            if(detailedInfo['status']!=0){
            $('#acceptPerson').html('接取人:'+detailedInfo.name2+'&nbsp;'+detailedInfo.phone2+"<span style=\"float:right\">发布人评分:"+detailedInfo.score2+"</span>");
            
        }
        if(detailedInfo['status']==0){
            status='等待中';
            

        }

        if(detailedInfo['status']==1){
            status='正在配送';

        }

        if(detailedInfo['status']==2){
            status='已送达';


        }

        if(detailedInfo['status']==3){
            status='已取消';

        }

            var infoHtml='<div id="detailedInPublished" class="alert alert-success">'+
            "<a class=\"list-group-item active\" >"+
    "<h4 class=\"list-group-item-heading\">"+
        detailedInfo.title+" &yen;"+detailedInfo.gift+'<span style="color:#808080;font-size:40px;">'+'&nbsp;&nbsp;'+status+'</span>'+"<span style=\"float:right\">"+detailedInfo.type+"</span>"
        "</h4><span class=\"list-group-item\">"+
            "<h4 class=\"list-group-item-heading\" id=\"acceptPerson\"></h4>"+
            +'<p style="float:left" class="list-group-item-text">'+detailedInfo.content+'</p>'+"<p class=\"list-group-item-text\">"
                +"送达截止时间:"+detailedInfo.deadline+"<br></p></span></a></div>";
                $(s).append(infoHtml);
 } }});

}

function showOrderInAcceptedBill(s,id){
    $.ajax({
            url:"deal.php",
            type:"POST",
            dataType:"JSON",
            data:{
                "op":"getOrderById",
                "id":id,
                "acceptbyme":1
            },
            success:function(data){
                if(data['code']==2){
                    refresh();

                }else{
                var status;
                var detailedInfo=data['order'];
                if(detailedInfo['status']==0){
                    status='等待中';
                    
    
                }
    
                if(detailedInfo['status']==1){
                    status='正在配送';
    
                }
    
                if(detailedInfo['status']==2){
                    status='已送达';
    
    
                }
    
                if(detailedInfo['status']==3){
                    status='已取消';
    
                }
    
                
                var infoHtml='<div id="detailedInAccepted" class="alert alert-success">'+
                "<a class=\"list-group-item active\" >"+
        "<h4 class=\"list-group-item-heading\">"+
            detailedInfo.title+" &yen;"+detailedInfo.gift+'<span style="color:#808080;font-size:40px;">'+'&nbsp;&nbsp;'+detailedInfo.time+'</span>'+"<span style=\"float:right\">"+detailedInfo.type+"</span>"
            "</h4><span class=\"list-group-item\">"+
                "<h4 class=\"list-group-item-heading\">发布人:"+detailedInfo.name+'&nbsp;'+status+"<span style=\"float:right\">发布人评分:"+detailedInfo.score+"</span></h4>"+
                +'<p style="float:left" class="list-group-item-text">'+detailedInfo.content+'</p>'+"<p class=\"list-group-item-text\">"+
                    "<div style=\"float:right\">预计耗时:"+detailedInfo.lasting+"</div><br>"+'<div style="float:left">预计花费金额:'+detailedInfo.money+'</div>'
                    +"送达截止时间:"+detailedInfo.deadline+"<br></p></span></a></div>";
                    $(s).append(infoHtml);
     } }});
                

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

function finishOrder(s,id){
    //完成订单

    $.ajax({
        url:"deal.php",
        type:"POST",
        dataType:"JSON",
        data:{
            "op":"finishorder",
            "id":id
        },
        success:function(data){
            var code=data['code'];
            if(code==0){
                s.hide();
            }

            if(code==2){
                refresh();
            }

            if(code==3){
                alert('未知错误');
            }

        }
    });


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