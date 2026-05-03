var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
var getId = urlParams.get('id');
var getId = urlParams.get('id');
var getTerm = urlParams.get('term');
var getTri = urlParams.get('tri');

var Course = [];
var termName;
var trimesterName;
var pdfUrl;

var apiKey = location.hostname == "uiuqb.vercel.app" ? "ebxof7L8oYqYNSR72V78" : "0YXSc8sggoBxSrP4Qn9Q";

function loadQuestion(courses) {
    Courses = courses.filter(function (el) {
        return el.id == getId;
    });

    Course = Courses[0];

    termName = getTerm == "mid" ? "Mid" : "Final";
    var trimesterCode = getTri.charAt(2);
    trimesterName = "";
    pdfUrl = "";

    if (getTri == "solve") {
        trimesterName = "Solution";
        pdfUrl = Course[getTerm + "Solve"];
        console.log(pdfUrl);
    }
    else {
        Questions = Course[getTerm];
        Question = Questions.filter(function (el) {
            return el.code == getTri;
        });

        if (trimesterCode == "1") {
            trimesterName = "Spring";
        }
        else if (trimesterCode == "2") {
            trimesterName = "Summer";
        }
        else {
            trimesterName = "Fall"
        };
        trimesterName = trimesterName + " 20" + getTri.charAt(0) + getTri.charAt(1);

        pdfUrl = Question[0].url;
    }

    document.getElementById("titleDiv").innerHTML = termName + " - " + trimesterName;
    document.getElementById("semiTitleDiv").innerHTML = Course.title;

    document.getElementById("reloadApp").onclick = function () {
        location.reload();
    }

    console.log(pdfUrl);

    WebViewer({
        path: './WebViewer/lib',
        licenseKey: apiKey,
        initialDoc: pdfUrl,
        disabledElements: [
            'menuButton',
            'contextMenuPopup',
            'viewControlsButton'
        ]
    }, document.getElementById('viewer'))

        .then(instance => {
            instance.UI.contextMenuPopup.add({
                type: 'actionButton',
                label: 'some-label',
                onClick: () => console.log('clicked'),
            });

            instance.UI.setHeaderItems((header) => {
                header.getHeader('default').push({
                    img: "icon-header-full-screen",
                    index: -1,
                    type: "actionButton",
                    element: 'fullScreenButton',
                    onClick: () => {
                        instance.UI.toggleFullScreen()
                    },
                    title: 'Full Screen',
                });
            });
        });


    document.getElementById("downloadPDF").href = pdfUrl;

    document.getElementById("downloadLink").innerHTML = `
            <a href="${pdfUrl}" download="${Course.title + " - " + termName + " - " + trimesterName}.pdf" style="text-decoration: none;">
                <div class="tool" style="display: flex; align-items: center; gap: 12px; padding: 12px 16px; color: var(--text-primary); cursor: pointer; border-radius: var(--r-sm); transition: 0.2s;">
                    <div class="icon"><i class="fas fa-file-pdf" style="color: #e2574c; font-size: 18px;"></i></div>
                    <div class="name" style="font-weight: var(--fw-semibold); font-size: var(--text-sm);">Download PDF</div>
                </div>
            </a>
    ` ;
}

var randomVersion = Math.floor(Math.random() * 10 ** 15);
async function loadCourseData() {
    const response = await fetch("data/data.json?" + randomVersion);
    const courses = await response.json();
    loadQuestion(await courses);
}

loadCourseData();


document.getElementById("openToolMenu").onclick = function () {
    document.getElementById("toolMenu").style.display = "block";
}


document.getElementById("toolMenu").onclick = function () {
    document.getElementById("toolMenu").style.display = "none";
}

document.getElementById("back").onclick = function () {
    if (window.history.length >= 2) {
        window.history.back();
    }
    else {
        window.location.href = 'index.html';
    }
}

$("html").on("pointerdown", ".rippleButton, .rippleButtonBlack", function (evt) {
    var btn = $(evt.currentTarget);
    var x = evt.pageX - btn.offset().left;
    var y = evt.pageY - btn.offset().top;

    $("<span class='ripple'/>").appendTo(btn).css({
        left: x,
        top: y
    });
});
$("html").on("pointerup", ".rippleButton, .rippleButtonBlack", function (evt) {
    setTimeout(function () {
        $('.ripple').remove();
    }, 500);
});
