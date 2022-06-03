function dropDown(){
    var t = document.querySelector(".dropDown")
    if(t.classList.contains("dropOn")){
        t.classList.remove("dropOn")
    }else{
        t.classList.add("dropOn")
    }
}