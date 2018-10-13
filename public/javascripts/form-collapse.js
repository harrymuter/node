$("input:radio").change(function(){
    var name = "#"+this.name+"_content";
    if ($(name)){
        if(this.value==="yes") {
            $(name).slideDown("slow")
        }
        else {
            $(name).slideUp("slow")
        }
    }
});

