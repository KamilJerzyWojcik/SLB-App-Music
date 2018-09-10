function editTags(id, type) {

    var editDiv = document.getElementById("row-edit");
    editDiv.innerHTML = "";

    var divCol = addDivColTags();
    var table = addTableTags(type)
    var thead = document.createElement("thead");
    var tr1 = document.createElement("tr");
    var thType = document.createElement("th");
    var h3Type = document.createElement("h3");

    h3Type.innerText = type + "s";
    thType.appendChild(h3Type);
    tr1.appendChild(thType);
    thead.appendChild(tr1);
    table.appendChild(thead);

    var tbody = document.createElement("tbody");
    var tr2 = document.createElement("tr");
    var td1 = document.createElement("td");
    var textarea = addTextareaTags(type);
    var button = addButtonTags();


    if (type == "Genre")
        getGenres(id, textarea, button);  

    if (type == "Style")
        getStyles(id, textarea, button);  
    
    if (type == "Artist") 
        getArtists(id, textarea, button);  


    td1.appendChild(textarea);
    tr2.appendChild(td1);

    var td2 = document.createElement("td");

    td2.appendChild(button);
    tr2.appendChild(td2);
    tbody.appendChild(tr2);
    table.appendChild(tbody);
    divCol.appendChild(table);
    editDiv.appendChild(divCol);
}



function getGenres(id, textarea, button) {
    $.ajax({
        url: `/EditAlbum/Genres`,
        type: "Get",
        data: { id: id },
        dataType: "json"
    }).done(function (result) {
        genresInput(result, textarea);
        button.addEventListener("click", function () {
            if (textarea.value != "" && textarea.value != null)
                updateGenres(id, textarea.value);
        });
    }).fail(function (e) {
    })
}

function genresInput(genres, textarea) {
    var data = "";

    for (let i = 0; i < genres.length; i++) {
        if (i == genres.length - 1) data += genres[i].genre;
        else
            data += genres[i].genre + ", ";
    }
    textarea.value = data;
}

function updateGenres(id, newGenres) {
    $.ajax({
        url: `/EditAlbum/Genres`,
        type: "POST",
        data: { genres: newGenres, id: id },
        dataType: "json"
    }).done(function (result) {
    }).fail(function (e) {
    })
}



function getStyles(id, textarea, button) {
    $.ajax({
        url: `/EditAlbum/Styles`,
        type: "Get",
        data: { id: id },
        dataType: "json"
    }).done(function (result) {
        stylesInput(result, textarea);
        button.addEventListener("click", function () {
            if (textarea.value != "" && textarea.value != null)
                updateStyles(id, textarea.value);
        });
    }).fail(function (e) {
    })
}

function stylesInput(styles, textarea) {
    var data = "";

    for (let i = 0; i < styles.length; i++) {
        if (i == styles.length - 1) data += styles[i].style;
        else
            data += styles[i].style + ", ";
    }
    textarea.value = data;
}

function updateStyles(id, newStyles) {
    $.ajax({
        url: `/EditAlbum/Styles`,
        type: "POST",
        data: { styles: newStyles, id: id },
        dataType: "json"
    }).done(function (result) {
    }).fail(function (e) {
    })
}



function getArtists(id, textarea, button) {
    $.ajax({
        url: `/EditAlbum/Artists`,
        type: "Get",
        data: { id: id },
        dataType: "json"
    }).done(function (result) {
        artistsInput(result, textarea);
        button.addEventListener("click", function () {
            if (textarea.value != "" && textarea.value != null)
                updateArtists(id, textarea.value);
        });
    }).fail(function (e) {
    })
}

function artistsInput(artists, textarea) {
    var data = "";

    for (let i = 0; i < artists.length; i++) {
        if (i == artists.length - 1) data += artists[i].name;
        else
            data += artists[i].name + ", ";
    }
    textarea.value = data;
}

function updateArtists(id, newArtists) {
    $.ajax({
        url: `/EditAlbum/Artists`,
        type: "POST",
        data: { artists: newArtists, id: id },
        dataType: "json"
    }).done(function (result) {
    }).fail(function (e) {
    })
}



function addDivColTags() {
    var divCol = document.createElement("div");
    divCol.classList.add("col-lg-4");
    divCol.classList.add("col-md-12");
    divCol.classList.add("column");

    return divCol;
}

function addTableTags(type) {
    var table = document.createElement("table");
    table.classList.add("table");
    table.classList.add("table-hover");
    table.classList.add("table-sm");
    table.setAttribute("id", `${type}-table`);

    return table;
}

function addTextareaTags(type) {
    var textarea = document.createElement("textarea");
    textarea.classList.add("form-control");
    textarea.classList.add("rounded-0");
    textarea.setAttribute("id", "tag-input");
    textarea.setAttribute("placeholder", `${type}1, ${type}2`);

    return textarea;
}

function addButtonTags() {
    var button = document.createElement("button");
    button.classList.add("btn");
    button.classList.add("btn-outline-warning");
    button.classList.add("btn-lg");
    button.classList.add("btn-block");
    button.innerText = "Save";

    return button;
}