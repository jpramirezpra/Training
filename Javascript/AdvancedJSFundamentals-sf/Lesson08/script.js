(function() {

var form = document.getElementById("theForm"),
    button = form.myButton,
    textbox = form.myTextbox,
    textarea = form.myTextArea,
    select = form.dayOfWeek,
    color = form.color;

eventUtility.addEvent(form, "submit", function(evt) {
   eventUtility.preventDefault(evt);
});

eventUtility.addEvent(button, "click", function(evt) {
    var target = eventUtility.getTarget(evt);
    
    var pickedColor = "";
    
    for (var i = 0, l = color.length; i < l; i = i + 1) {
        if (color[i].checked) {
            pickedColor = color[i].value;
        }
    }
    
    alert(pickedColor);
    
    //alert("you clicked me!");

});




}());