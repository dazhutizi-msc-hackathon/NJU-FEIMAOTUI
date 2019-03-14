// 这里是控制选项卡点击事项的
window.onload = function(){
    var oTab=document.getElementById("selectionTab");
    var aH3=oTab.getElementsByTagName("h3");
    var oPage=document.getElementById("inPage");
    var aDiv=oPage.getElementsByTagName("iframe");
    for (var i=0;i<aH3.length;i++){
        aH3[i].index=i;
        aH3[i].onclick=function () {
            for (var j=0;j<aH3.length;j++){
                aH3[j].className="";
                aDiv[j].style.display = "none";
                aDiv[this.index].className = "";
                aDiv[this.index].className = "content";
            }
            this.className="active";
            aDiv[this.index].style.display="block";
        }
    }
}