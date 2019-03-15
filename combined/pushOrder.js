function incItem(obj) {
    var html='<div class="row item" role="form" style="margin-bottom: 10px">'+'<div class="col-xs-6">'+'<label class="sr-only">物品名称</label>'+'<input type="text" class="form-control">'+'</div>'+'<div class="col-xs-3">'+'<label type="control-label">数量</label>'+' </div>'+'<div class="col-xs-3">'+'<label class="sr-only">物品数量</label>'+'<input type="number" class="form-control" min="1" value="1">'+'</div>'+'</div>'
    obj.insertAdjacentHTML('beforebegin',html)
}
$(document).on('click','#decItemBtn',function () {
    var el=document.getElementById("items")
    var chs=el.getElementsByClassName("item")
    var chn=chs.length
    // console.log(el)
    // console.log(chs)
    // console.log(chn)
    // console.log(chs[chn-1])
    if (chn>1){
        el.removeChild(chs[chn-1])
    }
})