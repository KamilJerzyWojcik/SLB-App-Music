function addAlbumThumbEdit(id) {

    var divCol = document.getElementById("row-edit");
    divCol.innerHTML = "";

    var alert = document.createElement("div");
    alert.classList.add("alert");
    alert.classList.add("alert-info");
    alert.style.width = "100%";
    alert.setAttribute("role", "alert");

    var h4 = document.createElement("h4");
    h4.classList.add("alert-heading");
    h4.innerText = "Customise your own music album";

    alert.appendChild(h4);

    divCol.appendChild(alert);

    var table = document.createElement("table");
    table.classList.add("table");

    var tbody = document.createElement("tbody");
    tbody.setAttribute("id", "thumb-edit");

    getAlbumThumb(tbody, id);

    table.appendChild(tbody);

    divCol.appendChild(table);

}

function getAlbumThumb(tbody, id) {
    $.ajax({
        url: `/EditAlbum/AlbumThumb`,
        type: "Get",
        data: { id: id },
        dataType: "json"
    }).done(function (result) {
        addAlbumThumbInput(tbody, result);
    }).fail(function (e) {
    })
}

function addAlbumThumbInput(tbody, albumThumb) {
    var trThumbImage = addTrThumbImage(albumThumb);
    var trArtst = addTrArtist(albumThumb);
    var trGenre = addTrGenre(albumThumb);
    var trStyle = addTrStyle(albumThumb);

    tbody.appendChild(trThumbImage);
    tbody.appendChild(trArtst);
    tbody.appendChild(trGenre);
    tbody.appendChild(trStyle);
}

function addTrThumbImage(albumThumb) {

    var trThumbImage = document.createElement("tr");

    var thThumbImage = document.createElement("th");
    thThumbImage.setAttribute("scope", "row");
    thThumbImage.innerText = "Thumb image";
    trThumbImage.appendChild(thThumbImage);

    var tdInputThumbImage = document.createElement("td");
    var InputThumbImage = document.createElement("input");
    InputThumbImage.classList.add("form-control");
    InputThumbImage.value = albumThumb.imageThumbSrc;
    tdInputThumbImage.appendChild(InputThumbImage);
    trThumbImage.appendChild(tdInputThumbImage);

    var tdShowThumbImage = document.createElement("td");
    var img = document.createElement("img");
    img.setAttribute("src", albumThumb.imageThumbSrc);
    img.style.width = "100px";
    img.style.height = "100px";
    tdShowThumbImage.appendChild(img);
    trThumbImage.appendChild(tdShowThumbImage);

    var tdButton = document.createElement("td");
    var button = document.createElement("button");
    button.classList.add("btn");
    button.classList.add("btn-outline-warning");
    button.classList.add("btn-lg");
    button.classList.add("btn-block");
    button.innerText = "Edit";
    button.addEventListener("click", function () {
        var trs = document.getElementById("thumb-edit").children;
        var id = document.querySelector("main ul").getAttribute("id");
        setThumbAlbum(trs, id);
    });

    tdButton.appendChild(button);

    
    var buttonDelete = document.createElement("button");
    buttonDelete.classList.add("btn");
    buttonDelete.classList.add("btn-outline-danger");
    buttonDelete.classList.add("btn-lg");
    buttonDelete.classList.add("btn-block");
    buttonDelete.innerText = "Delete Album";
   
    buttonDelete.addEventListener("click", function () {
        var id = document.querySelector("main ul").getAttribute("id");
        confirmDeleteAlbum(id, albumThumb);
    });

    tdButton.appendChild(buttonDelete);


    trThumbImage.appendChild(tdButton);

    return trThumbImage;
}


function confirmDeleteAlbum(id, albumThumb) {


    var divCol = document.getElementById("row-edit");
    divCol.innerHTML = "";

    var alert = document.createElement("div");
    alert.classList.add("alert");
    alert.classList.add("alert-danger");
    alert.style.width = "100%";
    alert.setAttribute("role", "alert");

    var h4 = document.createElement("h4");
    h4.classList.add("alert-heading");
    h4.innerText = "Are you sure, delete an Album?";

    alert.appendChild(h4);

    divCol.appendChild(alert);

    var buttonDelete = document.createElement("a");
    buttonDelete.classList.add("btn");
    buttonDelete.classList.add("btn-outline-danger");
    buttonDelete.classList.add("btn-lg");
    buttonDelete.classList.add("btn-block");
    buttonDelete.innerText = "Delete";
    buttonDelete.addEventListener("click", function () {
        deleteAllAlbum(id);
    });

    divCol.appendChild(buttonDelete);

    var buttonCancel = document.createElement("a");
    buttonCancel.classList.add("btn");
    buttonCancel.classList.add("btn-outline-success");
    buttonCancel.classList.add("btn-lg");
    buttonCancel.classList.add("btn-block");
    buttonCancel.innerText = "Cancel";
    buttonCancel.addEventListener("click", function () {
        addAlbumThumbEdit(id);
    });

    divCol.appendChild(buttonCancel);

}

function deleteAllAlbum(id) {
    var divCol = document.getElementById("row-edit");
    divCol.innerHTML = "";

    var loaderDiv = document.createElement("div");
    loaderDiv.classList.add("loader");
    divCol.appendChild(loaderDiv);

    $.ajax({
        url: `/EditAlbum/DeleteAlbum`,
        type: "Post",
        data: {id: id }
    }).done(function () {
        var divCol = document.getElementById("row-edit");
        divCol.innerHTML = "";

        var buttonDelete = document.createElement("a");
        buttonDelete.classList.add("btn");
        buttonDelete.classList.add("btn-outline-success");
        buttonDelete.classList.add("btn-lg");
        buttonDelete.classList.add("btn-block");
        buttonDelete.innerText = "Back to collection";
        buttonDelete.setAttribute("href", `/Home/Albums`);
        divCol.appendChild(buttonDelete);
    }).fail(function (e) {
    })
}


function setThumbAlbum(trs, id) {
    
    var imgSrc = trs[0].querySelector("td input").value;
    var artist = trs[1].querySelector("td input").value;
    var genre = trs[2].querySelector("td input").value;
    var style = trs[3].querySelector("td input").value;

    var correct = true;
    if (imgSrc == "" || imgSrc == null) { alert("Source image can't be empty"); correct = false; }
    if (artist == "" || artist == null) { alert("Artist can't be empty"); correct = false; }
    if (artist == "" || artist == null) { alert("Artist can't be empty"); correct = false; }
    if (genre == "" || genre == null) { alert("Genre can't be empty"); correct = false; }
    if (style == "" || style == null) { alert("Style can't be empty"); correct = false; }


    $.ajax({
        url: `/EditAlbum/EditAlbumThumb`,
        type: "Post",
        data: { imgSrc: imgSrc, artist: artist, genre: genre, style: style, id:id }
    }).done(function () {
        addAlbumThumbEdit(id);
    }).fail(function (e) {
    })
}


function addTrArtist(albumThumb) {

    var trArtist = document.createElement("tr");

    var thThumbImage = document.createElement("th");
    thThumbImage.setAttribute("scope", "row");
    thThumbImage.innerText = "Artist";
    trArtist.appendChild(thThumbImage);

    var tdInputArtist = document.createElement("td");
    var InputArtist = document.createElement("input");
    InputArtist.classList.add("form-control");
    InputArtist.value = albumThumb.artistName;
    tdInputArtist.appendChild(InputArtist);
    trArtist.appendChild(tdInputArtist);

    var tdArtistName = document.createElement("td");
    tdArtistName.innerText = albumThumb.artistName;
    trArtist.appendChild(tdArtistName);

    

    return trArtist;
}

function addTrGenre(albumThumb) {

    var trArtist = document.createElement("tr");

    var thThumbImage = document.createElement("th");
    thThumbImage.setAttribute("scope", "row");
    thThumbImage.innerText = "Genre";
    trArtist.appendChild(thThumbImage);

    var tdInputArtist = document.createElement("td");
    var InputArtist = document.createElement("input");
    InputArtist.classList.add("form-control");
    InputArtist.value = albumThumb.genres;
    tdInputArtist.appendChild(InputArtist);
    trArtist.appendChild(tdInputArtist);

    var tdArtistName = document.createElement("td");
    tdArtistName.innerText = albumThumb.genres;
    trArtist.appendChild(tdArtistName);

    return trArtist;
}

function addTrStyle(albumThumb) {

    var trArtist = document.createElement("tr");

    var thThumbImage = document.createElement("th");
    thThumbImage.setAttribute("scope", "row");
    thThumbImage.innerText = "Style";
    trArtist.appendChild(thThumbImage);

    var tdInputArtist = document.createElement("td");
    var InputArtist = document.createElement("input");
    InputArtist.classList.add("form-control");
    InputArtist.value = albumThumb.style;
    tdInputArtist.appendChild(InputArtist);
    trArtist.appendChild(tdInputArtist);

    var tdArtistName = document.createElement("td");
    tdArtistName.innerText = albumThumb.style;
    trArtist.appendChild(tdArtistName);

    return trArtist;
}
