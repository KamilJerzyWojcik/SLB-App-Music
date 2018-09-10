class htmlAlbumsHelper {
    addDiv() {
        var div = document.createElement("div");
        div.classList.add("col-lg-4");
        div.classList.add("col-md-6");
        div.classList.add("col-sm-12");
        div.classList.add("result-search");
        div.classList.add("border");
        div.classList.add("border-secondary");
        div.classList.add("rounded")
        return div;
    }

    addImg(div, src, alt) {

        var img = document.createElement("img");
        img.classList.add("rounded-circle");
        img.setAttribute("src", src);
        img.setAttribute("alt", alt);
        img.setAttribute("width", "140");
        img.setAttribute("height", "140");
        div.appendChild(img);
    }

    addHead(div, text, type) {
        var len = text.length;
        var head = document.createElement("h6");
        if (len < 15) head = document.createElement("h4");
        if (len < 25) head = document.createElement("h5");

        head.innerText = text;
        div.appendChild(head);
    }

    addParagraph(div, text) {
        var par = document.createElement("p");
        par.innerText = text;
        div.appendChild(par);
    }

    addLinkInParagraph(div, resource) {
        var par = document.createElement("p");
        var link = document.createElement("a");
        link.classList.add("btn");
        link.classList.add("btn-secondary");
        link.setAttribute("role", "button");
        link.style.color = "white";
        link.innerHTML = "View details &raquo;";
        par.appendChild(link);
        div.appendChild(par);

        return par;
    }

    addForm(div, resouce) {
        var AlbumsHelper = new htmlAlbumsHelper();
        var form = document.createElement("form");
        form.setAttribute("action", `/Discogs/Add?link=${resouce.resource_url}`);
        form.setAttribute("method", "post");
        var saveButton = AlbumsHelper.addButton("Add album", "success", form);
        saveButton.classList.add("btn-block");
        form.appendChild(saveButton);
        div.appendChild(form);
    }

    addButton(text, type, div) {
        var a = document.createElement("a");
        a.classList.add("btn");
        a.classList.add(`btn-${type}`);
        a.classList.add("btn-lg");
        a.classList.add("text-white");
        a.innerText = text;
        div.appendChild(a);

        return a;
    }

    addButtonShow(text, type, div) {
        var a = document.createElement("a");
        a.classList.add("btn");
        a.classList.add(`btn-${type}`);
        a.classList.add("btn-lg");
        a.setAttribute("href", "/Home/Albums");
        a.innerText = text;
        div.appendChild(a);

        return a;
    }

    deleteSearchAlbums() {
        var albumsRow = document.querySelector("main.container div.marketing div.row");
        albumsRow.innerHTML = "";

        var pag = document.querySelector("main.container nav ul.pagination")
        pag.innerHTML = "";
    }

    addImgCarousel(res, i) {
    var img = document.createElement("img");
    img.classList.add("first-slide");
    img.classList.add("d-block");
    img.classList.add("w-100");
    img.style.width = "100%";

    img.classList.add("img-responsive");
    if (typeof (res.images) != "undefined")
        var imageContent = res.images[i].uri != "" ? res.images[i].uri : "/img/cd.jpg";
    else
        var imageContent = "/img/cd.jpg";

    img.setAttribute("src", imageContent);
    img.setAttribute("alt", "image0");

    return img;
    }

    addSpanToA(type, text) {
    var a = document.createElement("a");
    a.classList.add(`carousel-control-${type}`);
    a.setAttribute("href", "#myCarousel");
    a.setAttribute("role", "button");
    a.setAttribute("data-slide", type);

    var spanIcon = document.createElement("span");
    spanIcon.classList.add(`carousel-control-${type}-icon`);
    spanIcon.setAttribute("aria-hidden", "true");
    a.appendChild(spanIcon);

    var spanSr = document.createElement("span");
    spanSr.classList.add("sr-only");
    spanSr.innerText = text;
    a.appendChild(spanSr);

    return a;
    }

    AddTrackListButton() {
    var a = document.createElement("a");
    a.classList.add("btn");
    a.classList.add("btn-primary");
    a.classList.add("btn-block");
    a.style.color = "white";
    a.innerText = "Track list";

    a.addEventListener("click", function () {

        if ($("#tracklist").is(":hidden")) {
            $("#tracklist").show("slow");
        } else {
            $("#tracklist").slideUp();
        }
    });

    return a;
}
};