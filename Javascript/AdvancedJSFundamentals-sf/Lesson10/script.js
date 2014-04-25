var xhr = new XMLHttpRequest();

var person = {
    firstName : "John",
    lastName : "Doe",
    age : 47
};

xhr.open("POST", "rss.json.min.txt", true);
xhr.setRequestHeader("Content-Type", "application/json");

xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
        var status = xhr.status;

        if ((status >= 200 && status < 300) ||
            status === 304) {
            var rss = JSON.parse(xhr.responseText);
            
            var json = JSON.stringify(rss);
            
            alert(json === xhr.responseText);
        }
    }
};

xhr.send(JSON.stringify(person));