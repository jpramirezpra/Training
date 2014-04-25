(function() {
    try {
        alert("This code will not fail");
        abert("This code will fail");
    } catch(err) {
        alert("An error occurred. Please try again later");
        alert(err.message);
    } finally {
        alert("This is within finally");
    }
    
    
}());