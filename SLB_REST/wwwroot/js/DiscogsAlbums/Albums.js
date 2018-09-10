$(function () {

    var albumsRow = document.querySelector("main.container div.marketing div.row");

    if (albumsRow != null) {

        var query = document.querySelector("main.container div.alert-success h5").innerText;

        var albumsResult = getAlbumsByQuery(query, albumsRow);

    }

})

function getAlbumsByQuery(q) {

    $.ajax({
        url: "/Discogs/GetJsonByQuery",
        data: { queryUser: q },
        type: "GET",
        dataType: "json"
    }).done(function (result) {

        addAlbums(result);
    }).fail(function () {
    })

}

function GetJsonByLink(albumLink) {
    $.ajax({
        url: "/Discogs/GetJsonByLink",
        data: { link: albumLink },
        type: "GET",
        dataType: "json"
    }).done(function (result) {
    }).fail(function () {
    })

}

function addPagination(pagination) {
    var pag = document.querySelector("main.container nav ul.pagination")
    pag.innerHTML = "";



    var liPagesPrev = document.createElement("li");
    liPagesPrev.classList.add("page-item");
    var aPrev = document.createElement("a");
    aPrev.classList.add("page-link");
    aPrev.innerText = "Prev";

    if (typeof (pagination.urls.prev) != "undefined") {
        aPrev.addEventListener("click", function () {
            $.ajax({
                url: "/Discogs/GetJsonByLink",
                data: { link: pagination.urls.prev },
                type: "GET",
                dataType: "json"
            }).done(function (result) {
                addAlbums(result);
            }).fail(function () {
            })
        });
       
    }
    liPagesPrev.appendChild(aPrev);
    pag.appendChild(liPagesPrev);

    var liPagesIteration = document.createElement("li");
    liPagesIteration.classList.add("page-item");
    var aText = document.createElement("a");
    aText.classList.add("page-link");
    aText.innerText = `${pagination.page}/${pagination.pages}`;
    liPagesIteration.appendChild(aText);
    pag.appendChild(liPagesIteration);

    if (typeof (pagination.urls.next) != "undefined") {
        var liPagesNext = document.createElement("li");
        liPagesNext.classList.add("page-item");
        var aNext = document.createElement("a");
        aNext.classList.add("page-link");
        aNext.innerText = "Next";
        aNext.addEventListener("click", function () {
            $.ajax({
                url: "/Discogs/GetJsonByLink",
                data: { link: pagination.urls.next },
                type: "GET",
                dataType: "json"
            }).done(function (result) {
                addAlbums(result);
            }).fail(function () {
            })
        });
        liPagesNext.appendChild(aNext);
        pag.appendChild(liPagesNext);
    }
}

function addAlbums(res) {
    var results = res.results;
    addPagination(res.pagination);

    var trackDiv = document.getElementById("tracks-list");
    trackDiv.innerHTML = "";

    var carousel = document.querySelector("div#myCarousel");
    carousel.innerHTML = "";

    var btnAdd = document.getElementById("btn-add")
    btnAdd.innerHTML = "";

    var btnBack = document.getElementById("btn-back")
    btnBack.innerHTML = "";

    var Row = document.querySelector("main.container div.marketing div.row");
    Row.innerHTML = "";



    var AlbumsHelper = new htmlAlbumsHelper();

    for (let i = 0; i < results.length; i++) {

        var divCol = AlbumsHelper.addDiv();

        if (typeof (results[i].thumb) != "undefined")
            var albumThumb = results[i].thumb != "" ? results[i].thumb : "/img/cd.jpg";
        else
            var albumThumb = "/img/cd.jpg";

        AlbumsHelper.addImg(divCol, albumThumb, "image-" + i);

        var albumTitle = typeof (results[i].title) != "undefined" ? results[i].title : "no data";
        AlbumsHelper.addHead(divCol, albumTitle);

        var albumType = typeof (results[i].type) != "undefined" ? results[i].type : "no data";
        AlbumsHelper.addParagraph(divCol, albumType);

        var country = typeof (results[i].country) != "undefined" ? results[i].country : "no data";
        var year = typeof (results[i].year) != "undefined" ? results[i].year : "no data";
        AlbumsHelper.addParagraph(divCol, `${country}, ${year}`);

        var style = typeof (results[i].style) != "undefined" ? results[i].style[0] : "no data";
        var genre = typeof (results[i].genre) != "undefined" ? results[i].genre[0] : "no data";
        AlbumsHelper.addParagraph(divCol, `${genre}, ${style}`);

        var details = AlbumsHelper.addLinkInParagraph(divCol, results[i].resource_url);

        details.addEventListener("click", function () {
            $.ajax({
                url: "/Discogs/Album",
                data: { resource: results[i].resource_url },
                type: "GET",
                dataType: "json"
            }).done(function (result) {
                
                AlbumsHelper.deleteSearchAlbums();
                showAlbum(result, res);
            }).fail(function () {
            })
        });

        Row.appendChild(divCol);
    }
}


