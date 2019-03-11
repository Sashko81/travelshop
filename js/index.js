function startTime() {
    let tm = new Date();
    let h = tm.getHours();
    let m = tm.getMinutes();
    let s = tm.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('.page-loaded').innerHTML = h + ":" + m + ":" + s;
    setTimeout('startTime()', 1000);
}
function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

document.querySelector('.ajax-get-html').addEventListener('click', ajaxGetHtml);

function ajaxGetHtml() {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.querySelector('.html-container').innerHTML = xhr.responseText;
        }
    }
    ;
    xhr.open('GET', 'client-data.html', true);
    xhr.send();
}

document.querySelector('.fetch-get-html').addEventListener('click', fetchGetHtml);

function fetchGetHtml() {
    fetch('client-data.html').then(result=>result.text()).then(html=>document.querySelector('.html-container').innerHTML = html);
}

document.querySelector('.button-submit').addEventListener('click', ajaxGetJson);

function ajaxGetJson() {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const clientData = JSON.parse(xhr.responseText);
            document.querySelector('.client-name').innerText = clientData.name;
            document.querySelector('.client-account').innerText = clientData.account;
        }
    }
    ;
    xhr.open('GET', 'client-data.json', true);
    xhr.send();
}

document.querySelector('form').addEventListener('submit', submitForm);

function submitForm(e) {
    e.preventDefault();
    fetch('php/form.php', {
        method: 'POST',
        body: new FormData(document.querySelector('.login-form'))
    }).then(response=>response.text()).then(html=>document.querySelector('.server-response').innerHTML = html);
}
