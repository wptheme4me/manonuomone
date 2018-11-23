(function() {
    var dashboard_hide = document.getElementById('toggle-dashboard');
    dashboard_hide.addEventListener("click", function(e) {
        e.target.style = "background:red;";
        e.target.parentElement.parentElement.style = "display:none;";
    })
})()