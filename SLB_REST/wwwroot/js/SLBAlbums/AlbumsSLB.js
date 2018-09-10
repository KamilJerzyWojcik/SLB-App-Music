$(function () {

    getAlbums(0);

});

function getAlbums(page) {
    $.ajax({
        url: `/Home/GetThumbAlbum?page=${page}`,
        type: "GET",
        dataType: "json"
    }).done(function (result) {
        showThumbAlbums(result, page);
        addPaginationSlb(page);
    }).fail(function (e) {
    })
}

function addPaginationSlb(page) {
    var pagDiv = document.querySelector("nav ul.pagination");
    pagDiv.innerHTML = "";

    var max = pagDiv.getAttribute("max");

    if (max < 7) return;

    var pages = Math.ceil((1 + parseInt(max)) / 6.0);

    var liPrev = document.createElement("li");
    liPrev.classList.add("page-item");
    if (page == 0) liPrev.classList.add("disabled");

    var aPrev = document.createElement("a");
    aPrev.classList.add("page-link");
    aPrev.setAttribute("href", "#");
    aPrev.innerText = "Previous";
    if (page != 0) aPrev.addEventListener("click", function () {
        $("#confirm").remove();
        getAlbums(page - 1);
    });
    liPrev.appendChild(aPrev);
    pagDiv.appendChild(liPrev);

    if (pages < 50) {

        for (let i = 0; i < pages; i++) {
            var li = document.createElement("li");
            li.classList.add("page-item");
            if (page == i) li.classList.add("active");

            var a = document.createElement("a");
            a.classList.add("page-link");
            a.setAttribute("href", "#");
            a.innerText = (i + 1);
            if (page != i) a.addEventListener("click", function () {
                $("#confirm").remove();
                getAlbums(i);
            });
            li.appendChild(a);
            pagDiv.appendChild(li);
        }
    }

    var liNext = document.createElement("li");
    liNext.classList.add("page-item");
    if (page == (pages - 1)) liNext.classList.add("disabled");

    var aNext = document.createElement("a");
    aNext.classList.add("page-link");
    aNext.setAttribute("href", "#");
    aNext.innerText = "Next";
    if (page != max) aNext.addEventListener("click", function () {
        $("#confirm").remove();
        getAlbums(page + 1);
    });
    liNext.appendChild(aNext);
    pagDiv.appendChild(liNext);



}

function showThumbAlbums(albums, page) {
    var row = document.getElementById("albums-slb");
    row.innerHTML = "";

    for (let i = 0; i < albums.length; i++) {
        var divCol = document.createElement("div");
        divCol.classList.add("col-sm-12");
        divCol.classList.add("col-md-6");
        divCol.classList.add("col-lg-4");


        var divCard = document.createElement("div");
        divCard.classList.add("mb-4");
        divCard.classList.add("card");
        divCard.classList.add("shadow-sm");


        var cardImg = document.createElement("img");
        cardImg.classList.add("card-img-top");
        cardImg.setAttribute("src", albums[i].imageThumbSrc);
        cardImg.setAttribute("alt", `thumb album ${albums[i].title} image`);
        cardImg.classList.add("img-responsive");
        cardImg.style.height = "20rem";


        divCard.appendChild(cardImg);

        var divCardBody = document.createElement("div");
        divCardBody.classList.add("card-body");

        var parName = document.createElement("p");
        parName.classList.add("card-text");
        parName.classList.add("h3");
        parName.innerText = albums[i].artistName;
        divCardBody.appendChild(parName);

        var parTitle = document.createElement("p");
        parTitle.classList.add("card-text");
        parTitle.innerText = albums[i].title;
        divCardBody.appendChild(parTitle);

        var parStyle = document.createElement("p");
        parStyle.classList.add("card-text");
        parStyle.innerText = albums[i].style;
        divCardBody.appendChild(parStyle);

        var parGenres = document.createElement("p");
        parGenres.classList.add("card-text");
        parGenres.innerText = albums[i].genres;
        divCardBody.appendChild(parGenres);

        var divContent = document.createElement("div");
        divContent.classList.add("d-flex");
        divContent.classList.add("align-items-center");
        divContent.classList.add("justify-content-between");

        var divBtns = document.createElement("div");
        divBtns.classList.add("btn-group");


        var aView = document.createElement("a");
        aView.classList.add("btn");
        aView.classList.add("btn-sm");
        aView.classList.add("btn-outline-secondary");
        aView.setAttribute("type", "button");
        aView.innerText = "View";
        aView.setAttribute("href", "#");
        aView.addEventListener("click", function () {
            $("#confirm").remove();
            showAlbum(albums[i].albumId, page);
        });
        divBtns.appendChild(aView);

        var aEdit = document.createElement("a");
        aEdit.classList.add("btn");
        aEdit.classList.add("btn-sm");
        aEdit.classList.add("btn-outline-secondary");
        aEdit.setAttribute("type", "button");
        aEdit.innerText = "Edit";
        aEdit.setAttribute("href", `/EditAlbum/Edit?id=${albums[i].albumId}`);

        divBtns.appendChild(aEdit);

        divContent.appendChild(divBtns);
        divCardBody.appendChild(divContent);
        divCardBody.style.minHeight = "300px";

        divCard.appendChild(divCardBody);
        divCard.style.minWidth = "200px";
        divCol.appendChild(divCard);


        row.appendChild(divCol);
    }
}