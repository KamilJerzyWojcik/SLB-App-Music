function editVideos(id) {
    var editDiv = document.getElementById("row-edit");
    editDiv.innerHTML = "";
    $("iframe").remove();

    addNewVideo();

    var table = addTableEditVideos();
    getVideos(id, table);

    var row = document.getElementById("row-edit");
    row.appendChild(table);
}

function getVideos(id, table) {
    $.ajax({
        url: `/EditAlbum/Videos`,
        type: "Get",
        data: { id: id },
        dataType: "json"
    }).done(function (result) {
        setBodyVideos(result, table);
    }).fail(function (e) {
    })
}

function setBodyVideos(videos, table) {
    var tbody = document.createElement("tbody");

    for (let i = 0; i < videos.length; i++) {

        var trBody = document.createElement("tr");

        addthBodyEditVideos(trBody, i, videos);
        addTdVideoDescription(trBody, i, videos);

        var tdBodyButton = addTdButtonVideosEdit();

        addEditButtonVideosEdit(tdBodyButton, i, videos);
        addDeleteButtonVideosEdit(tdBodyButton, i);

        trBody.appendChild(tdBodyButton);
        tbody.appendChild(trBody);
    }
    table.appendChild(tbody);
}

//----
function AddYoutubeFrame(actual, videos, outVideo = "") {

    var divYtCol = document.getElementById("yt-edit");

    $("iframe").remove();

    var divYt = document.createElement("div");
    divYt.setAttribute("id", "player");
    divYtCol.appendChild(divYt);


    var id;
    var linkYt = outVideo == "" ? videos[actual].uri : outVideo;

    for (let j = 0; j < 100; j++) {
        if (linkYt[linkYt.length - 1 - j] == "=") {
            id = linkYt.substring(linkYt.length - j, linkYt.length)
            break;
        }
    }

    var player;

    player = new YT.Player('player', {
        videoId: id
    });

    var iframe = document.querySelector("iframe");
    iframe.style.width = "100%";
    iframe.style.height = "100%";
}

function addThNewVideo(text, tr) {
    var th1 = document.createElement("th");
    th1.setAttribute("scope", "col");
    th1.innerText = text;
    tr.appendChild(th1);
}

function addTdInputNewVideo(text, trBody) {

    var tdBody = document.createElement("td");
    tdBody.setAttribute("id", text);
    var inputPoz = document.createElement("input")
    inputPoz.classList.add("form-control");
    if (text == "Poz") {
        inputPoz.style.minWidth = "40px";
        inputPoz.style.maxWidth = "60px";
    }
    tdBody.appendChild(inputPoz);
    trBody.appendChild(tdBody);
}

function addNewVideo() {

    var table = document.createElement("table");
    table.classList.add("table");

    var thead = document.createElement("thead");
    thead.classList.add("thead-light");

    var tr = document.createElement("tr");

    addThNewVideo("Desription", tr)
    addThNewVideo("Source", tr)

    thead.appendChild(tr);
    table.appendChild(thead);

    var tbody = document.createElement("tbody");
    tbody.setAttribute("id", "edit-videos");
    var trBody = document.createElement("tr");

    addTdInputNewVideo("Title", trBody);
    addTdInputNewVideo("Src", trBody);

    var trButt = document.createElement("tr");
    var tdButt = document.createElement("td");
    tdButt.setAttribute("colspan", "3");
    tdButt.setAttribute("id", "buttons-action");

    var btnAdd = addButtonVIdeosEdit("Add", "success");
    btnAdd.addEventListener("click", function (event) {
        var tbody = document.getElementById("edit-videos");

        var description = tbody.firstChild.children[0].firstChild.value;
        var src = tbody.firstChild.children[1].firstChild.value;

        var correct = true;
        if (description == "" || description == null) { alert("Description can't be empty"); correct = false; }
        if (src == "" || src == null) { alert("Source can't be empty"); correct = false; }

        if (correct) {
            addNewVideoAjax(description, src);
        }
    });
    tdButt.appendChild(btnAdd);

    var btnShow = addButtonVIdeosEdit("Show", "info");
    btnShow.addEventListener("click", function () {
        var src = document.getElementById("Src").firstChild.value;
        if (src != "" && src != null) {
            AddYoutubeFrame("", "", outVideo = src)
        }
    });
    tdButt.appendChild(btnShow);

    trButt.appendChild(tdButt);
    tbody.appendChild(trBody);
    tbody.appendChild(trButt);
    table.appendChild(tbody);

    var row = document.getElementById("row-edit");
    row.appendChild(table);
}

function addNewVideoAjax(description, src) {
    var id = document.querySelector("main ul").getAttribute("id");
    $.ajax({
        url: `/EditAlbum/AddVideos`,
        type: "Post",
        data: { description: description, source: src, id: id }
    }).done(function (result) {
        editVideos(id);
    }).fail(function (e) {
        alert("Video exist")
    })

}


//--
function addTrEditVideos(thead) {
    var tr = document.createElement("tr");

    var th1 = document.createElement("th");
    th1.setAttribute("scope", "col");
    th1.innerText = "#";
    tr.appendChild(th1);

    var th2 = document.createElement("th");
    th2.setAttribute("scope", "col");
    th2.innerText = "Title";
    tr.appendChild(th2);

    var th4 = document.createElement("th");
    th4.setAttribute("scope", "col");
    th4.innerText = "Options";
    tr.appendChild(th4);

    thead.appendChild(tr);
}

function addTableEditVideos() {
    var table = document.createElement("table");
    table.classList.add("table");

    var thead = document.createElement("thead");
    thead.classList.add("thead-dark");

    addTrEditVideos(thead);

    table.appendChild(thead);

    return table;
}

function addthBodyEditVideos(trBody, i, videos) {
    var thBody = document.createElement("th");
    thBody.setAttribute("scope", "row");
    thBody.classList.add("text-center");
    thBody.innerText = 1 + i;
    trBody.appendChild(thBody);
}

function addTdVideoDescription(trBody, i, videos) {
    var tdBody2 = document.createElement("td");
    tdBody2.innerText = videos[i].description;
    trBody.appendChild(tdBody2);
}

function addTdButtonVideosEdit() {
    var tdBody = document.createElement("td");
    tdBody.classList.add("text-center");
    tdBody.style.minWidth = "130px";

    return tdBody
}

function addButtonVIdeosEdit(text, style) {
    var btn = document.createElement("a");
    btn.classList.add("btn");
    btn.classList.add(`btn-outline-${style}`);
    btn.innerText = text;

    return btn;
}

function addEditButtonVideosEdit(tdBody3, i, videos) {
    var btnEdit = addButtonVIdeosEdit("Show", "info");
    btnEdit.setAttribute("href", "#nav-edit");
    btnEdit.addEventListener("click", function () {
        AddYoutubeFrame(i, videos);

        var input = document.getElementById("Src");
        input.firstChild.value = videos[i].uri;

        var title = document.getElementById("Title");
        title.firstChild.value = videos[i].description;

        var butons = document.getElementById("buttons-action");
        butons.innerHTML = "";

        var editButton = addButtonVIdeosEdit("Edit", "warning");
        editButton.addEventListener("click", function () {

            var description = document.getElementById("Title").firstChild.value;
            var source = document.getElementById("Src").firstChild.value;
            var idList = i;
            var id = document.querySelector("main ul").getAttribute("id");

            editVideo(description, source, idList, id);
        });

        butons.appendChild(editButton);
    });
    tdBody3.appendChild(btnEdit);
}

function editVideo(description, source, idList, id) {

    $.ajax({
        url: `/EditAlbum/EditVideo`,
        type: "Post",
        data: { description: description, source: source, idList: idList, id: id }
    }).done(function (result) {
        editVideos(id);
    }).fail(function (e) {
    })

}

function addDeleteButtonVideosEdit(tdBodyButton, i) {
    var btnDel = addButtonVIdeosEdit("Del", "danger")
    btnDel.addEventListener("click", function () {
        confirmDeleteVideos(i);
    });
    tdBodyButton.appendChild(btnDel);
}

function confirmDeleteVideos(i){

    var r = confirm("Are you sure, delete video?");
    if (r == true) {
        deleteVideos(i);
    }
}

function deleteVideos(i) {
    var id = document.querySelector("main ul").getAttribute("id");

    $.ajax({
        url: `/EditAlbum/DeleteVideo`,
        type: "Post",
        data: { id: id, idList: i }
    }).done(function (result) {
        editVideos(id);
    }).fail(function (e) {
    })
}