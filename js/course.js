var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
var getId = urlParams.get('id');

var Course = [];

function loadQuestionBox(courses) {
    Courses = courses.filter(function(el) {
        return el.id == getId;
    });
    
    Course = Courses[0];
    
    document.getElementById("menuBarDiv").style.background = Course.css;
    document.getElementById("courseTitle").innerHTML = Course.title;
    document.getElementById("courseCode").innerHTML = Course.code;
    
    document.getElementById("midterm").onclick = function() {
        window.location.href = `questions.html?term=mid&id=${Course.id}`;
    };
    document.getElementById("final").onclick = function() {
        window.location.href = `questions.html?term=final&id=${Course.id}`;
    };
    document.getElementById("ct").onclick = function() {
        showToast("Class Test questions will be available soon!");
    };
    document.getElementById("others").onclick = function() {
        showToast("Other materials will be available soon!");
    };
}

var randomVersion = Math.floor(Math.random()*10**15);
async function loadCourseData() {
    const response = await fetch("data/data.json?"+randomVersion);
    const courses = await response.json();
    loadQuestionBox(await courses);
}

loadCourseData();


document.getElementById("back").onclick = function() {
    if (window.history.length >= 2) {
        window.history.back();
    }
    else { 
        window.location.href = 'index.html';
    }
}

$("html").on("pointerdown", ".rippleButton, .rippleButtonBlack", function(evt) {
    var btn = $(evt.currentTarget);
    var x = evt.pageX - btn.offset().left;
    var y = evt.pageY - btn.offset().top;

    $("<span class='ripple'/>").appendTo(btn).css({
        left: x,
        top: y
    });
});
$("html").on("pointerup", ".rippleButton, .rippleButtonBlack", function(evt) {
    setTimeout(function() {
        $('.ripple').remove();
    }, 500);
});


function showToast(string) {
    var x = document.getElementById("snackbar");
    if(x.className != "show") {
        x.className = "show";
        x.innerHTML = string;
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    }
}
