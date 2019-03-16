var postId;


       


function confirmBillBtn() {
    var result = confirm("确认");
    if (result == true) {
        $.ajax({
            url:"deal.php",
            type:"POST",
            dataType:"JSON",
            data:{
                "op":"acceptInfo",
                "id":postId
            },
            success:function(data){
                if(data.code==0){
                    alert("接单成功\n请按时完成任务哦");
                }
                else if(data.code==2){
                    refresh();
                }
                else if(data.code==3){
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

function goSignInPage() {
    var mMyInfo=document.getElementById("myInfo");
    var mSignin=document.getElementById("signIn");
    mMyInfo.className="info";
    mSignin.className="info mActive";
}
function goSignUpPage() {
    var mSignin=document.getElementById("signIn");
    var mSignup=document.getElementById("signUp");
    mSignin.className="info";
    mSignup.className="info mActive";
}
function login() {
    var mSignin=document.getElementById("signIn");
    var mMyInfo=document.getElementById("myInfo");
    mMyInfo.className="info mActive";
    mSignin.className="info";
}
function goPwdChangePage() {
    var mMyInfo=document.getElementById("myInfo");
    var mPwdChange=document.getElementById("pwdChange");
    mMyInfo.className="info";
    mPwdChange.className="info mActive";
}
function changePwd() {
    var mSignin=document.getElementById("signIn");
    var mPwdChange=document.getElementById("pwdChange");
    mSignin.className="info mActive";
    mPwdChange.className="info";
}
function signUp() {
    var mSignUp=document.getElementById("signUp");
    var mSignin=document.getElementById("signIn");
    mSignin.className="info mActive";
    mSignUp.className="info";
}

function confirmBtn() {
    var result = confirm("确认要完成订单吗？");
    if (result == true) {
        alert("You choose YES! Great!");
        // location.reload()
        //    注释掉的这句话是点击后刷新
    } else {
        alert("What a bitch you are !");
    }
}
function cancelBtn() {
    var result = confirm("确认要取消订单吗？");
    if (result == true) {
        alert("You choose YES! Great!");
        // location.reload()
        //    注释掉的这句话是点击后刷新
    } else {
        alert("What a bitch you are !");
    }
}
function arriveBtn() {
    var result = confirm("确定送达了吗？");
    if (result == true) {
        alert("You choose YES! Great!");
        // location.reload()
    } else {
        alert("What a bitch you are !");
    }
}
function displayDetails(obj) {
    var html='<div id="myAlert" class="alert alert-success">\n' +
        '    <a href="#" class="close" data-dismiss="alert">&times;</a>\n' +
        '    <strong>物品</strong><br>可口可乐x1 ￥3.00<br>黄金脆皮鸡x1 ￥996.00<br>'+
        '<strong>赏金</strong><br>￥0.99<br>'+
        '<strong>地址</strong><br>五栋5B666<br>'+
        '<strong>期望时间</strong><br>13:20<br>' +
        '<strong>留言</strong><br>阔落不冰怎么喝' +
    '</div>';
    obj.insertAdjacentHTML('beforeBegin',html);
}
function addComment(obj) {
    var html='<div class="form-group comment">\n' +
        '                <textarea class="form-control" rows="4" style="resize:none"></textarea>\n' +
        '                    <div style="float:right;">\n' +
        '                        <label class="radio-inline"><input type="radio" name="commentRadio">1</label>\n' +
        '                        <label class="radio-inline"><input type="radio" name="commentRadio">2</label>\n' +
        '                        <label class="radio-inline"><input type="radio" name="commentRadio">3</label>\n' +
        '                        <label class="radio-inline"><input type="radio" name="commentRadio">4</label>\n' +
        '                        <label class="radio-inline"><input type="radio" name="commentRadio" checked>5</label>\n' +
        '                    </div>'+' <br><br>\n' +
        '                <button type="button" class="btn btn-success pushCommentBtn" style="float: right;"onclick="pushComment(this)">提交</button>\n' +
        '            </div>';
    obj.insertAdjacentHTML('afterEnd',html);
}
function pushComment(obj) {
    var ff=obj.parentNode.parentNode;
    var ch=ff.getElementsByClassName("comment");
    ff.removeChild(ch[0]);
    // location.reload()
    //    注释掉的这句话是点击后刷新
}