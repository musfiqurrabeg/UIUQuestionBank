var Courses = [];

window.addEventListener("pageshow", function ( event ) {
    if(localStorage.getItem("courseChangedIndex") == "true") {
        localStorage.setItem("courseChangedIndex", "false");
        location.reload(true);
    }
});



if(localStorage.getItem("isBookmarkedCourseAdded") == null) {
    localStorage.setItem("bookmarkedCourse", "MATH1151,CSE1115,CSE1325");
    localStorage.setItem("isBookmarkedCourseAdded", "true");
}

function fillUpCourseBoxContainer(courses, length) {
    document.getElementById("courseBoxContainer").innerHTML = ""; 
    if(courses.length == 0) {
        document.getElementById("courseBoxContainer").innerHTML += 
        `            
        <div class="notFound">
            <div class="icon">
                <i class="fas fa-list-ul"></i>
            </div>
            <div class="text">
                <div class="title">No Course Found</div>
                <div class="semiTitle">Please Check Spelling</div>
            </div>
        </div>
        `;
    }
    else {
        var n;
        if(courses.length > length) {
            n = length;
        }
        else {
            n = courses.length;
        }

        for(var i=0; i<n; i++) {
            course = courses[i];
            document.getElementById("courseBoxContainer").innerHTML += 
            `
            <a href="course.html?id=${course.id}" class="course-card">            
                <div class="course-card-thumb" style="background: ${course.css}">
                    <div class="badge">UIU Course</div>
                </div>
                <div class="course-card-body">
                    <h3 class="course-card-title">${course.title}</h3>
                    <div class="course-card-author"><i class="fas fa-chalkboard-teacher"></i> ${course.code}</div>
                    <div class="course-card-meta">
                        <span><i class="far fa-clock"></i> 14 Weeks</span>
                        <span><i class="fas fa-layer-group"></i> ${course.abbr || "BSc"}</span>
                    </div>
                    <div class="course-card-btn">Enroll <i class="fas fa-arrow-right" style="margin-left: 4px; font-size: 12px;"></i></div>
                </div>
            </a>
            `;
        }
    }
}

var randomCoursesForTop = [];

function setBookmark(courses) {
    var shuffled = [...courses].sort(() => 0.5 - Math.random());
    randomCoursesForTop = shuffled.slice(0, 8);
    fillUpCourseBoxContainer(randomCoursesForTop, randomCoursesForTop.length);
}

var randomVersion = Math.floor(Math.random()*10**15);
async function loadCourseData() {
    const response = await fetch("data/data.json?"+randomVersion);
    const courses = await response.json();
    Courses = await courses;
    setBookmark(await courses);
}
loadCourseData();

document.getElementById("searchCourse").oninput = function(e) {
    var searchValue = e.target.value;
    
    if(searchValue == "" || searchValue == " ") {
        fillUpCourseBoxContainer(randomCoursesForTop, randomCoursesForTop.length);
    }
    else {
        searchCourses = Courses.filter(function(el) {
            return el.title.toLowerCase().includes(searchValue.toLowerCase()) || el.code.toLowerCase().includes(searchValue.toLowerCase()) || el.abbr.toLowerCase().includes(searchValue.toLowerCase());
        });
        fillUpCourseBoxContainer(searchCourses, 3);
    }
}

document.getElementById("openMenu").onclick = function() {
    document.getElementById("sidebarMenuBackground").style.display = "block";
    document.getElementById("sidebar").style.left = "0px";
}

document.getElementById("sidebarMenuBackground").onclick = function() {
    document.getElementById("sidebarMenuBackground").style.display = "none";
    document.getElementById("sidebar").style.left = "-300px";
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



