function goSignInPage() {
    var mMyInfo=document.getElementById("myInfo");
    var mSignin=document.getElementById("signIn");
    mMyInfo.className="info";
    mSignin.className="info mActive"
}
function goSignUpPage() {
    var mSignin=document.getElementById("signIn");
    var mSignup=document.getElementById("signUp")
    mSignin.className="info"
    mSignup.className="info mActive"
}
function login() {
    var mSignin=document.getElementById("signIn");
    var mMyInfo=document.getElementById("myInfo");
    mMyInfo.className="info mActive";
    mSignin.className="info"
}
function goPwdChangePage() {
    var mMyInfo=document.getElementById("myInfo");
    var mPwdChange=document.getElementById("pwdChange");
    mMyInfo.className="info";
    mPwdChange.className="info mActive"
}
function changePwd() {
    var mSignin=document.getElementById("signIn");
    var mPwdChange=document.getElementById("pwdChange");
    mSignin.className="info mActive";
    mPwdChange.className="info"
}
function signUp() {
    var mSignUp=document.getElementById("signUp");
    var mSignin=document.getElementById("signIn");
    mSignin.className="info mActive";
    mSignUp.className="info"
}