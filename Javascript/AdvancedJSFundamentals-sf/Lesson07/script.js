(function() {

var txtbox = document.getElementById("txtInput");

eventUtility.addEvent(document, "keydown",
    function(evt) {
        var code = evt.keyCode,
            ctrlKey = evt.ctrlKey;
            
        if (ctrlKey && code === 66) {
            alert("You pressed ctrl+B");
        }
        
        
        
        
        //alert(code);
        
        //evt.charCode
        
        // A 65
        // B 66
        // Z 90
        
        
        // 0 48
        // 9 57
        
    });

// keydown
// keyup
// keypress
    
    
    
    
}());