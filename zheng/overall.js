window.onload = function(){
    var ovaoTab=document.getElementById("selectPageTab");
    var ovaaH3=ovaoTab.getElementsByTagName("a");
    var ovaoPage=document.getElementById("overallPages");
    console.log(ovaoPage)
    var ovaaDiv=ovaoPage.getElementsByClassName("oaPages");
    for (var i=0;i<ovaaH3.length;i++){
        ovaaH3[i].index=i;
        ovaaH3[i].onclick=function () {
            for (var j=0;j<ovaaH3.length;j++){
                ovaaH3[j].className="";
                ovaaDiv[j].style.display = "none";
                ovaaDiv[this.index].className = "oaPages";
                ovaaDiv[this.index].className = "content oaPages";
            }
            this.className="active";
            ovaaDiv[this.index].style.display="block";
        }
    }
    var oTab=document.getElementById("selectionTab");
    var aH3=oTab.getElementsByTagName("h3");
    var oPage=document.getElementById("inPage");
    var aDiv=oPage.getElementsByClassName("oPages");
    for (var i=0;i<aH3.length;i++){
        aH3[i].index=i;
        aH3[i].onclick=function () {
            for (var j=0;j<aH3.length;j++){
                aH3[j].className="";
                aDiv[j].style.display = "none";
                aDiv[this.index].className = "oPages";
                aDiv[this.index].className = "content oPages";
            }
            this.className="actived";
            aDiv[this.index].style.display="block";
        }
    }

}
