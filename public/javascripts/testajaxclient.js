function get_all() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            var res = xhr.responseText;
            if (res != ""){
                var json = JSON.parse(res);
                var html = "";
                for (let i = 0; i < json.length; i++) {
                    const test = JSON.stringify(json[i]);
                    html += `<p>"${test}"</p>`;  
                }
                var select = document.getElementById("code");
                select.innerHTML = html;
            }
        }
    }
    xhr.open('GET', `/test/all`);
    xhr.send();
}

document.addEventListener( "DOMContentLoaded", get_all);
