$.ajax({
    url:"../deal.php",
    type:"POST",
    dataType:"JSON",
    data:{
       "op":"getInfoList" 
    }
,
success:function(data){
    var info=data.infos;
    for(var i=0;i<info.length;i++){
    var adding=$('<div class="list-group"></div>');
    adding.innerHTML="<a class=\"list-group-item active\" id=info[i].id>"+
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

$(document).ready(function(){
    $("a").click(function(){
        var postId=$("this").attr("id");
        $.ajax({
            url:"../deal.php",
            type:"POST",
            dataType:"JSON",
            data:{
                "op":"getInfoById",
                "id":postId
            },
            success:function(data){

            }

        });
       

        });
    });