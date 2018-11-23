(function() {
    var questions = document.querySelectorAll('dt');
    questions.forEach(function(elem) {
        elem.addEventListener("click", function(e) {
            e.target.nextElementSibling.style.display = (e.target.nextElementSibling.style.display === "none" || e.target.nextElementSibling.style.display === "") ? 'block' : 'none';
            e.target.className = (e.target.className === "hide") ? "show" : "hide";
        })
    })
})()