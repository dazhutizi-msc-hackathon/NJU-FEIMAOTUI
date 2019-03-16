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

function showOrderListInAcceptedBill(){
    //获取我发布的/接取的订单列表并显示
    $.ajax({
        url="../deal.php",
        type="POST",
        dataType="JSON",
        data={
            "op":"getOrderList",
            "acceptbyme":1
        },
        success:function(data){
            if(data.code==2){
                /*这里是登录界面*/



            }
            else{
                var orders = data['orders'];
                $("#overallInterface").append('<div id="acceptedOrder" class="oPages" style="width: 100%;height: 100%;margin:0;"><div id="acceptedList"></div></div>');

                for(var i=0;i<orders.length;i++){
                    var adding=$('<div class="list-group"> </div>');
                    adding.innerHTML='<a  class="list-group-item active">'+
                        '<h4 class="list-group-item-heading">'+orders[i].title+" &yen;"+orders[i].gift+"<span style=\"float:right\">"+
                            orders[i].type+"</span></h4></a>"+'<span class=\"list-group-item\">'+"<h4 class=\"list-group-item-heading\">"+"发布人:"+orders[i].name
                            +'<br><p class="list-group-item-text" style="float:right">发布时间:'+orders[i].time+'<br>截止时间:'+orders[i].deadline;
                        $('#acceptedOrder').append(adding);
                    if(orders[i].status==1)
                    $('#acceptedOrder').append('<p style="color:#00ccff;float:right;">正在进行</p>'+
                        '<button type="button" class="btn btn-primary" onclick="showOrderInAcceptedBill($(this).parent(),$(this).val())" style="float: right" value=orders[i].id>订单详情</button>'
                        );
                    if(orders[i].status==2)
                    $('#acceptedOrder').append('<p style="color:#00ff00;float:right">已完成<br><span style="color:#000000;">完成时间:'+orders[i].finishtime+'<span></p>');
                    if(orders[i].status==3)
                    $('#acceptedOrder').append('<p style="color:#ff0000;float:right">已取消</p>');
                }
            }

        }
    });


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

function showOrderListInPublishedBill(){
    $.ajax({
    url="../deal.php",
    type="POST",
    dataType="JSON",
    data={
        "op":"getOrderList",
        "acceptbyme":0
    },
    success:function(data){
        if(data['code']==2){
            /*这里是登录界面*/



        }
        else{
            var orders = data['orders'];
            $("#overallInterface").append('<div id="publishedOrder" class="oPages" style="width: 100%;height: 100%;margin:0;"><div id="publishedList"></div></div>');

            for(var i=0;i<orders.length;i++){
                var adding=$('<div class="list-group"> </div>');
                adding.innerHTML='<a  class="list-group-item active">'+
                    '<h4 class="list-group-item-heading">'+orders[i].title+" &yen;"+orders[i].gift+"<span style=\"float:right\">"+
                        orders[i].type+"</span></h4></a>"+'<span class=\"list-group-item\">'+"<h4 class=\"list-group-item-heading\">"+"接收人:"+orders[i].name2
                        +'<br><p class="list-group-item-text" style="float:right">接取时间:'+orders[i].accepttime+'<br>截止时间:'+orders[i].deadline;
                    $('#publishedOrder').append(adding);

                    if(orders[i].status==0)
                $('#publishedOrder').append('<p style="color:red;float:right;">等待中</p>'+
                    '<button type="button" class="btn btn-primary" onclick="showOrderInPublishedBill($(this).parent(),$(this).val())" style="float: right" value=orders[i].id>订单详情</button>'
                    );
                if(orders[i].status==1)
                $('#publishedOrder').append('<p style="color:#00ccff;float:right;">正在配送</p>'+
                '<button type="button" class="btn btn-primary" onclick="finishOrder($(this).parent(),$(this).val())" style="float: right" value=orders[i].id>签收</button>'+
                    '<button type="button" class="btn btn-default" onclick="showOrderInPublishedBill($(this).parent(),$(this).val())" style="float: right" value=orders[i].id>订单详情</button>'
                    
                    );
                if(orders[i].status==2)
                $('#publishedOrder').append('<p style="color:#00ff00;float:right">已完成<br><span style="color:#000000;">完成时间:'+orders[i].finishtime+'<span></p>');
                if(orders[i].status==3)
                $('#publishedOrder').append('<p style="color:#ff0000;float:right">已取消</p>');
            }
        }

    }
});}

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
                /* 这是登录界面*/

            }else{
            var status;
            var detailedInfo=data['order'];
            if(detailedInfo['status']!=0){
            $('#acceptPerson').innerHTML='接取人:'+detailedInfo.name2+'&nbsp;'+detailedInfo.phone2+"<span style=\"float:right\">发布人评分:"+detailedInfo.score2+"</span>";
            
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
                s.append(infoHtml);
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
                    /* 这是登录界面*/

                }else{
                var status;
                var detailedInfo=data['order'];
                if(detailedInfo['status']==0){
                    status='未被借取';
                    
    
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
                    s.append(infoHtml);
     } }});
                

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
                /*这里是登录界面*/
            }

            if(code==3){
                alert('未知错误');
            }

        }
    });

}