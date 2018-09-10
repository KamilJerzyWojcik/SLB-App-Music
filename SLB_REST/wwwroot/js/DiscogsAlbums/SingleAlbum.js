function showAlbum(resouce, albums) {

    showAlbumDetails(resouce, albums);
}


function showAlbumDetails(res, albums) {

    addButtons(albums, res);
    addCarousel(res);
    addTracks(res);
    AddNavYt(res)

}

function addVideoSelect(actual, res) {
    var inputVideos = document.getElementById("videos-list");
    inputVideos.innerHTML = "";

    var inputDiv = document.createElement("div");
    inputDiv.setAttribute("id", "videos-div");
    inputDiv.classList.add("input-group");
    inputDiv.classList.add("mb-3");

    var prepDiv = document.createElement("div");
    prepDiv.classList.add("nput-group-prepend");

    inputDiv.appendChild(prepDiv);

    var select = document.createElement("select");
    select.classList.add("custom-select");

    for (let i = 0; i < res.videos.length; i++) {

        var option = document.createElement("option");
        option.innerText = res.videos[i].title;
        option.setAttribute("id", "option" + i);
        if (i == actual) option.setAttribute("selected", "selected");

        select.appendChild(option);

    }

    select.addEventListener("change", function () {
        var optionSelected = $("option:selected", this);
        AddYoutubeFrame(optionSelected[0].index, res);
    });

    inputDiv.appendChild(select);
    inputVideos.appendChild(inputDiv);
}

function AddYoutubeFrame(actual, res) {

    var divYtCol = document.getElementById("yt");

    $("iframe").remove();

    var divYt = document.createElement("div");
    divYt.setAttribute("id", "player");
    divYtCol.appendChild(divYt);

    var id;
    var linkYt = res.videos[actual].uri;

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

    addVideoSelect(actual, res);
}

function AddNavYt(album) {
    if (typeof album.videos != 'undefined') {

        $("#player-nav").remove();
        var AlbumsHelper = new htmlAlbumsHelper();

        var divYtCol = document.getElementById("yt");

        var divYtNav = document.createElement("div");
        divYtNav.setAttribute("id", "player-nav");
        divYtNav.setAttribute("actual", "0");
        divYtNav.classList.add("text-center");
        divYtNav.style.marginBottom = "20px";

        if (typeof album.videos != 'undefined') {
            divYtNav.setAttribute("max", `${album.videos.length - 1}`);
        }

        var bPrev = AlbumsHelper.addButton("Prev", "secondary", divYtNav);
        bPrev.style.marginRight = "30px";
        bPrev.classList.add("btn-lg")

        var bNext = AlbumsHelper.addButton("Next", "info", divYtNav);
        bNext.style.marginLeft = "30px";
        bNext.classList.add("btn-lg")

        divYtCol.appendChild(divYtNav);



        for (let i = 0; i < album.videos.length; i++) {

            var a = document.createElement("a");
            a.setAttribute("href", album.videos[i].uri);

            var div = document.createElement("div");
            div.style.display = "none";

            div.appendChild(a);

            divYtNav.appendChild(div);
        }


        AddYoutubeFrame(0, album)

        bNext.addEventListener("click", function () {
            var div = document.getElementById("player-nav");
            var actual = parseInt(div.getAttribute("actual")) + 1;
            var max = div.getAttribute("max");

            if (actual > max) actual = 0;

            div.setAttribute("actual", actual);

            AddYoutubeFrame(actual, album);

        });

        bPrev.addEventListener("click", function () {
            var div = document.getElementById("player-nav");
            var actual = parseInt(div.getAttribute("actual")) - 1;
            var max = div.getAttribute("max");

            if (actual < 0) actual = max;

            div.setAttribute("actual", actual);

            AddYoutubeFrame(actual, album);

        });
    }
}

function addTracks(resouce) {
    var AlbumsHelper = new htmlAlbumsHelper();

    var trackDiv = document.getElementById("tracks-list");
    trackDiv.innerHTML = "";

    var div = document.createElement("div");
    div.setAttribute("id", "track-list-collapse")

    var a = AlbumsHelper.AddTrackListButton();
    div.appendChild(a);

    var divCard = document.createElement("div");
    divCard.classList.add("card");
    divCard.classList.add("card-body");

    if (typeof resouce.tracklist != 'undefined') {
        for (let i = 0; i < resouce.tracklist.length; i++) {
            var p = document.createElement("p");
            p.classList.add("paragraph-content");
            p.innerText = `${resouce.tracklist[i].position} | ${resouce.tracklist[i].duration} | ${resouce.tracklist[i].title}`;
            p.classList.add("border");
            p.classList.add("border-primary");

            var hr = document.createElement("hr");
            p.appendChild(hr);

            var div2 = document.createElement("div");

            if (typeof (resouce.tracklist[i].extraartists) != 'undefined') {

                for (let j = 0; j < resouce.tracklist[i].extraartists.length; j++) {

                    var aArtist = document.createElement("a");
                    aArtist.classList.add("btn");
                    aArtist.classList.add("btn-link");
                    aArtist.setAttribute("href", "#");
                    if (j == resouce.tracklist[i].extraartists.length - 1) aArtist.innerText = resouce.tracklist[i].extraartists[j].name;
                    else aArtist.innerText = resouce.tracklist[i].extraartists[j].name + ", ";

                    aArtist.addEventListener("click", function () {

                    });
                    div2.appendChild(aArtist);

                }
                p.appendChild(div2);
            }

            divCard.appendChild(p);

        }
    }
    else {
        var p = document.createElement("p");
        p.classList.add("paragraph-content");
        p.innerText = `No data avalible`;
        p.classList.add("border");
        p.classList.add("border-primary");
        divCard.appendChild(p);
    }

    var divCollapse = document.createElement("div");
    divCollapse.classList.add("collapse");
    divCollapse.setAttribute("id", "tracklist");

    divCollapse.appendChild(divCard);

    div.appendChild(divCollapse);

    trackDiv.appendChild(div);

}

function addButtons(albums, resouce) {
    var AlbumsHelper = new htmlAlbumsHelper();

    var btnBack = document.getElementById("btn-back");
    btnBack.innerHTML = "";

    var backButton = AlbumsHelper.addButton("Back", "warning", btnBack);
    backButton.classList.add("btn-block")
    backButton.addEventListener("click", function () {
        $("iframe").remove();
        $("#player-nav").remove();
        $("#videos-div").remove();
        addAlbums(albums);
    });

    var btnAdd = document.getElementById("btn-add");
    btnAdd.innerHTML = "";
    var addButton = AlbumsHelper.addButton("Add album", "success", btnAdd);
    addButton.classList.add("btn-block");
    addButton.addEventListener("click", function (event) {
        event.path[0].remove();
        var loaderDiv = document.createElement("div");
        loaderDiv.classList.add("loader");
        var btnLoader = document.getElementById("btn-add");
        btnLoader.appendChild(loaderDiv);

        $.ajax({
            url: "/Discogs/Add",
            data: { link: resouce.resource_url },
            type: "POST"
        }).done(function () {
            var btnLoader = document.getElementById("btn-add").querySelector("div.loader");
            if (btnLoader != null) btnLoader.remove();
            var info = document.getElementById("added");
            info.style.color = "green";
            info.innerText = `Album ${resouce.title} was added`;

        }).fail(function () {
            addButtons(albums, resouce);
        })
    });

}

function addCarousel(res) {
    var AlbumsHelper = new htmlAlbumsHelper();

    var carousel = document.querySelector("div#myCarousel");
    carousel.innerHTML = "";
    var divInner = document.createElement("div");
    divInner.classList.add("carousel-inner");

    var lengthImg = typeof (res.images) != "undefined" ? res.images.length : 1;

    for (let i = 0; i < lengthImg; i++) {
        var divItem = document.createElement("div");
        divItem.classList.add("carousel-item");
        divItem.style.backgroundColor = "white";

        if (i == 0) divItem.classList.add("active");

        var imgContent = AlbumsHelper.addImgCarousel(res, i);

        divItem.appendChild(imgContent);
        divInner.appendChild(divItem);
    }

    carousel.appendChild(divInner);

    var aPrev = AlbumsHelper.addSpanToA("prev", "Previous");
    carousel.appendChild(aPrev);

    var aNext = AlbumsHelper.addSpanToA("next", "Next");
    carousel.appendChild(aNext);
}