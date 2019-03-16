var postId;
$(function(){
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
                    info[i].title+" &yen;"+info[i].gift+"<span style=\"float:right\">"+info[i].type+"</span>"
                    "</h4><span class=\"list-group-item\">"+
                        "<h4 class=\"list-group-item-heading\">"+info[i].name+"<span style=\"float:right\">发布人评分:"+info[i].score+"</span></h4>"+
                        "<p class=\"list-group-item-text\">"+
                            "<div style=\"float:right\">预计耗时:"+info[i].lasting+"</div><br>"+
                            "送达截止时间:"+info[i].deadline+"<br><br></p></span></a>";
            $("body").append(adding);
        }},
        error:function(Error){
            alert(Error);
        }});
});

function confirmBillBtn() {
    var result = confirm("确认");
    if (result == true) {
        $.ajax({
            url:"../deal.php",
            type:"POST",
            dataType:"JSON",
            data:{
                "op":"acceptInfo",
                "id":postId
            },
            success:function(data){
                if(data==0){
                    alert("接单成功\n请按时完成任务哦");
                }
                else if(data==2){
                    alert("请登录后接单!");



                    /*这是登录界面*/
                }
                else if(data==3){
                    alert("接取失败,错误未知");
                }
            }
        });
    } else {
    }
}

function cancelBillBtn(){
    $("#detailed").slideUp();
}

$(document).ready(function(){
    $('div.list-group').on('click','a',function(){
        postId=$(this).parent().attr("id");
        var s = $(this).parent();
        $.ajax({
            url:"../deal.php",
            type:"POST",
            dataType:"JSON",
            data:{
                "op":"getInfoById",
                "id":postId
            },
            success:function(data){
                var detailedInfo=data.info;
                var infoHtml='<div id="detailed" class="alert alert-success">'+
                "<a class=\"list-group-item active\" >"+
        "<h4 class=\"list-group-item-heading\">"+
            detailedInfo.title+" &yen;"+detailedInfo.gift+'<span style="color:#808080;font-size:40px;">'+'&nbsp;&nbsp;'+detailedInfo.time+'</span>'+"<span style=\"float:right\">"+detailedInfo.type+"</span>"
            "</h4><span class=\"list-group-item\">"+
                "<h4 class=\"list-group-item-heading\">"+detailedInfo.name+"<span style=\"float:right\">发布人评分:"+detailedInfo.score+"</span></h4>"+
                +'<p style="float:left" class="list-group-item-text">detailedInfo.content</p>'+"<p class=\"list-group-item-text\">"+
                    "<div style=\"float:right\">预计耗时:"+detailedInfo.lasting+"</div><br>"+'<div style="float:left">预计花费金额:'+detailedInfo.money+'</div>'
                    +"送达截止时间:"+detailedInfo.deadline+"<br></p></span></a></div>"+
                    '<div class="btn-group" style="float:right">'+
       '<button type="button" id="cancel" class="btn btn-default" onclick="cancelBillBtn()">取消</button>'+
        '<button class="btn btn-primary" type="button" onclick="confirmBillBtn()">确认</button>'+
'</div>';
            s.append(infoHtml);
            

            }

        });
       

        });
    });