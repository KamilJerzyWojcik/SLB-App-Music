function editImages(id) {

    var editDiv = document.getElementById("row-edit");
    editDiv.innerHTML = "";

    addNewImages("", id);
    var table = addTableHeadImage();

    var tbody = document.createElement("tbody");

    getImages(tbody, id);

    table.appendChild(tbody);

    var row = document.getElementById("row-edit");
    row.appendChild(table);
}

function getImages(tbody, id) {
    $.ajax({
        url: `/EditAlbum/Images`,
        type: "Get",
        data: { id: id },
        dataType: "json"
    }).done(function (result) {
        setBodyImages(result, tbody);
    }).fail(function (e) {
    })
}

function setBodyImages(images, tbody) {

    for (let i = 0; i < images.length; i++) {

        var trBody = document.createElement("tr");

        addThBodyImage(i, trBody);
        addTdBodySrcImage(i, images, trBody);
        addTdBodyInputImage(i, images, trBody);
        addTdBodyEditButtonImage(trBody, i);

        tbody.appendChild(trBody);
    }
}


//--


function addNewImages(editImage, id) {

    var table = document.createElement("table");
    table.classList.add("table");
    table.setAttribute("id", "new-img");

    var thead = document.createElement("thead");
    thead.classList.add("thead-light");

    var tr = document.createElement("tr");

    addThNewImage(tr, "New image");
    addThNewImage(tr, "Source");
    addThNewImage(tr, "Options");

    thead.appendChild(tr);
    table.appendChild(thead);

    var tbody = document.createElement("tbody");
    var trBody = document.createElement("tr");

    addTdSrcNewImage(trBody, editImage);
    addTdInputNewImage(trBody, editImage, id);
    addTdButtonsNewImage(trBody, editImage);

    tbody.appendChild(trBody);
    table.appendChild(tbody);
    var row = document.getElementById("row-edit");
    row.innerHTML = "";
    row.appendChild(table);
}


function addThNewImage(tr, text) {
    var th = document.createElement("th");
    th.setAttribute("scope", "col");
    th.innerText = text;
    tr.appendChild(th);

    return th;
}

function addTdSrcNewImage(trBody, editImage) {
    var tdBody1 = document.createElement("td");
    var img = document.createElement("img");
    img.setAttribute("src", editImage)
    img.setAttribute("width", "100px");
    img.setAttribute("height", "100px");

    img.classList.add("img-fluid");

    tdBody1.appendChild(img);
    trBody.appendChild(tdBody1);
}

function addTdInputNewImage(trBody, editImage) {
    var tdBody2 = document.createElement("td");
    var input = document.createElement("input");
    input.setAttribute("id", "input-image");
    input.classList.add("form-control");

    input.addEventListener("change", function (event) {
        var img = event.path[0].parentElement.parentElement.querySelector("td img");
        img.setAttribute("src", input.value);
    });

    input.value = editImage;
    tdBody2.appendChild(input);

    trBody.appendChild(tdBody2);
}

function addTdButtonsNewImage(trBody, editImage, id) {
    var tdBody3 = document.createElement("td");
    tdBody3.classList.add("text-center");

    var btnAdd = document.createElement("a");
    btnAdd.classList.add("btn");
    btnAdd.classList.add("btn-outline-success");
    btnAdd.innerText = "Add"
    btnAdd.addEventListener("click", function () {
        var editImg = document.getElementById("input-image").value;
        var idAlbum = document.querySelector("main ul").getAttribute("id");
        if (editImg != "" && editImg != null) setImage(editImg, idAlbum);
    })

    tdBody3.appendChild(btnAdd);

    trBody.appendChild(tdBody3);
}

function setImage(editImage, id) {
    $.ajax({
        url: `/EditAlbum/AddImage`,
        type: "Post",
        data: { image: editImage, id: id }
    }).done(function () {
        editImages(id);
    }).fail(function () {
        alert("image exist!");
    })
}

//---


function addTableHeadImage() {
    var table = document.createElement("table");
    table.classList.add("table");


    var thead = addTheadImage();
    var tr = document.createElement("tr");

    addThImage("#", tr);
    addThImage("image", tr);
    addThImage("Source", tr);
    addThImage("Options", tr);

    thead.appendChild(tr);
    table.appendChild(thead);

    return table;
}

function addTheadImage() {
    var thead = document.createElement("thead");
    thead.classList.add("thead-dark");

    return thead;
}

function addThImage(text, tr) {
    var th = document.createElement("th");
    th.setAttribute("scope", "col");
    th.innerText = text;

    tr.appendChild(th);
}

//--


function addThBodyImage(i, trBody) {
    var thBody = document.createElement("th");
    thBody.setAttribute("scope", "row");
    thBody.classList.add("text-center");
    thBody.innerText = 1 + i;

    trBody.appendChild(thBody);
}

function addTdBodySrcImage(i, images, trBody) {
    var tdBody1 = document.createElement("td");
    var img = document.createElement("img");
    img.setAttribute("src", images[i].uri)
    img.setAttribute("width", "100px");
    img.setAttribute("height", "100px");

    img.classList.add("img-fluid");

    tdBody1.appendChild(img);
    trBody.appendChild(tdBody1);
}

function addTdBodyInputImage(i, images, trBody) {
    var tdBody2 = document.createElement("td");
    var input = document.createElement("input");
    input.classList.add("form-control");
    input.value = images[i].uri;
    tdBody2.appendChild(input);
    trBody.appendChild(tdBody2);
}

function addTdBodyEditButtonImage(trBody, i) {
    var tdBody3 = document.createElement("td");
    tdBody3.classList.add("text-center");

    var btnEdit = document.createElement("a");
    btnEdit.classList.add("btn");
    btnEdit.classList.add("btn-outline-warning");
    btnEdit.setAttribute("id", i);
    btnEdit.innerText = "Edit";

    btnEdit.addEventListener("click", function (event) {
        var idImg = event.path[0].getAttribute("id");
        var srcImg = event.path[0].parentNode.parentNode.querySelector("td img").getAttribute("src");
        editPartImage(idImg, srcImg);
    });

    tdBody3.appendChild(btnEdit);

    var btnDel = document.createElement("a");
    btnDel.classList.add("btn");
    btnDel.classList.add("btn-outline-danger");
    btnDel.innerText = "Del"
    btnDel.setAttribute("id", i);

    btnDel.addEventListener("click", function (event) {
        //var idDelete = event.path[0].getAttribute("id");
        var id = document.querySelector("main ul").getAttribute("id");
        confirmDeleteImages(i, id)
    });

    tdBody3.appendChild(btnDel);

    trBody.appendChild(tdBody3);
}

function confirmDeleteImages(idDelete, id) {

    var r = confirm("Are you sure, delete image?");
    if (r == true) {
        deletePartImage(idDelete, id)
    }
}

function deletePartImage(idDelete, id) {
    $.ajax({
        url: `/EditAlbum/DeleteImage`,
        type: "Post",
        data: { idList: idDelete, id: id }
    }).done(function () {
        editImages(id);
    }).fail(function (e) {
    })
}




function editPartImage(idImg, srcImg) {
    var trNewImg = document.getElementById("new-img").querySelector("tbody tr");
    var img = trNewImg.querySelector("td img");
    var input = trNewImg.querySelector("td input");
    input.value = srcImg;
    img.setAttribute("src", srcImg);

    var tDbutton = trNewImg.querySelector("td a").parentElement;
    tDbutton.innerText = "";
    var editButton = document.createElement("a");
    editButton.innerText = "Edit";
    editButton.classList.add("btn");
    editButton.classList.add("btn-outline-warning");

    editButton.addEventListener("click", function () {
        srcImg = input.value;
        setEditPartImage(srcImg, idImg);
    });

    tDbutton.appendChild(editButton);
}

function setEditPartImage(srcImg, idImg) {
    var id = document.querySelector("main ul").getAttribute("id");

    $.ajax({
        url: `/EditAlbum/EditImage`,
        type: "Post",
        data: { image: srcImg, idList: idImg, id: id }
    }).done(function () {
        editImages(id);
    }).fail(function (e) {
    })
}