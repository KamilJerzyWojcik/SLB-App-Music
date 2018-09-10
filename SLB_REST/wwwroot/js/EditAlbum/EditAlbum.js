

function editAlbum(title, newtitle) {
    getThumbAlbumById(title, newtitle);

}

function getThumbAlbumById(title, newtitle) {
    addAlbumEdit(title, newtitle);
    var id = document.querySelector("main ul").getAttribute("id");
    $.ajax({
        url: `/Home/GetThumbAlbum?id=${id}`,
        type: "GET",
        dataType: "json"
    }).done(function (result) {
        addAlbumEdit(title, newtitle);
        addAlbumThumbEdit(result);
    }).fail(function (e) {
    })
}

function addAlbumEdit(title, newtitle) {
    var editDiv = document.getElementById("row-edit");
    editDiv.innerHTML = "";

    var divCol = document.createElement("div");
    divCol.classList.add("col-lg-8");
    divCol.classList.add("col-md-12");
    divCol.classList.add("column");
    divCol.setAttribute("id", "thumb-edit");

    var table = document.createElement("table");
    table.classList.add("table");
    table.classList.add("table-hover");
    table.classList.add("table-sm");
    table.setAttribute("id", `title-table`);

    var thead = document.createElement("thead");

    var tr1 = document.createElement("tr");

    var thType = document.createElement("th");
    var h3Type = document.createElement("h3");
    h3Type.innerText = title;
    thType.appendChild(h3Type);
    tr1.appendChild(thType);
    thead.appendChild(tr1);
    table.appendChild(thead);

    var tbody = document.createElement("tbody");

    var tr2 = document.createElement("tr");

    var td1 = document.createElement("td");

    var input = document.createElement("input");
    input.classList.add("form-control");
    input.setAttribute("placeholder", "Title");
    input.value = title

    td1.appendChild(input);
    tr2.appendChild(td1);

    var td2 = document.createElement("td");
    var button = document.createElement("button");
    button.classList.add("btn");
    button.classList.add("btn-outline-warning");
    button.classList.add("btn-lg");
    button.classList.add("btn-block");
    button.innerText = "Edit";
    td2.appendChild(button);
    tr2.appendChild(td2);

    tbody.appendChild(tr2);
    table.appendChild(tbody);
    divCol.appendChild(table);

    editDiv.appendChild(divCol);
}

