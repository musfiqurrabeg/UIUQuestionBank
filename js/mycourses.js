var Courses = [];

window.addEventListener("pageshow", function ( event ) {
    if(localStorage.getItem("courseChanged") == "true") {
        localStorage.setItem("courseChanged", "false");
        location.reload(true);
    }
});

function fillUpCourseBoxContainer(courses) {
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
        courses.forEach(function(course) {
            document.getElementById("courseBoxContainer").innerHTML += 
            `
            <div class="course-card" style="position: relative;">
                <div class="course-card-delete" onclick="deleteCourse('${course.id}')"><i class="fas fa-trash-alt"></i></div>
                <a href="course.html?id=${course.id}" style="display: flex; flex-direction: column; height: 100%;">
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
                    <div class="course-card-btn">Open <i class="fas fa-arrow-right" style="margin-left: 4px; font-size: 12px;"></i></div>
                    </div>
                </a>
            </div>
            `;
        });
    }
}
bookmarkedCourseData = localStorage.getItem("bookmarkedCourse");
bookmarkedCourse = [];

function setBookmark(courses) {
    if(bookmarkedCourseData != ""){
        bookmarkedCourseData = bookmarkedCourseData.split(",");
        bookmarkedCourseData.forEach(function(code) {
            matchedCourse = courses.filter(function(el) {
                return el.id.includes(code);
            });
            bookmarkedCourse.push(matchedCourse[0]);
        });
    }

    fillUpCourseBoxContainer(bookmarkedCourse);
}

var randomVersion = Math.floor(Math.random()*10**15);
async function loadCourseData() {
    const response = await fetch("data/data.json?"+randomVersion);
    const courses = await response.json();
    Courses = await courses;
    setBookmark(await courses);
}
loadCourseData();

function deleteCourse(courseId) {
    bookmarkedCourse = bookmarkedCourse.filter(function(el) {
        if (el.id != courseId) {
            return true;
        }
    });
    var newBookmarkedCourseData = "";
    bookmarkedCourse.forEach(function(newId,i) {
        if(i!=0) {
            newBookmarkedCourseData += ",";
        }
        newBookmarkedCourseData += newId.id;
    })
    localStorage.setItem("bookmarkedCourse", newBookmarkedCourseData);
    fillUpCourseBoxContainer(bookmarkedCourse);
    localStorage.setItem("courseChangedIndex", "true");
}

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
