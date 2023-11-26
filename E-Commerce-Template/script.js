let url = "https://fakestoreapi.com/products";

document.addEventListener("DOMContentLoaded", function(){
    fetch(url)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data)
        data.forEach(function(resim){
            ekranaYazdir(resim)
        })
    })
})

// ! API'den gelen verileri ekrana yazdırmak için
    const row = document.querySelector(".row");
    function ekranaYazdir(resim){
        row.innerHTML += `
        <div class="col-4">
                <div class="card mb-3">
                    <img class="w-50 d-block m-auto" src=${resim.image} alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${resim.title}</h5>
                        <h5 class="card-price">${resim.price} TL</h5>
                        <a id="addBtn" class="sabit-buton btn btn-warning" href="#">Sepete Ekle</a>
                    </div>
                </div>
            </div>
        `
    }


    // ! ÜRÜNLER İÇERİSİNDE ARAMA ALGORİTMASI
    const searchBtn = document.querySelector("#searchBtn");
    const searchInput = document.querySelector("#searchInput");

    searchBtn.addEventListener("click", aramaYap)

    function aramaYap(){
        let searchText = searchInput.value.toLowerCase();
        console.log(searchText)
        searchInput.value = "";

        let cards = document.querySelectorAll(".col-4");

        cards.forEach(function(card){
            let title = card.querySelector(".card-title");
            if(title.innerHTML.toLowerCase().includes(searchText)){
                card.style.display = "block"
            }else{
                card.style.display = "none"
            }
        })
    }

    // ! SEPETE EKLE BUTONUNA TIKLANDIĞINDA LİTTLE BOX'I ARTIRMAK

    row.addEventListener("click", ekle);

    function ekle(e){
        if(e.target.id.includes("addBtn")){
            const parentDiv = e.target.parentElement.parentElement
            // console.log(parentDiv)
            const littleBox = document.querySelector(".little-box");
            littleBox.innerHTML++;
            sepeteEkle(parentDiv)
        }
    }


    // ! SEPET İÇERİSİNDEKİ İŞLEMLER İÇİN;
    function sepeteEkle(parentDiv){
        const li = document.querySelector(".modal-li");
        const price = parentDiv.children[1].children[1].innerHTML;
        const urunAdi = parentDiv.children[1].children[0].innerHTML;

        const urunBilgisi = document.createElement("div");
        urunBilgisi.classList.add("ürün-bilgisi", "d-flex",  "justify-content-around");

        urunBilgisi.innerHTML += `
            <div class="fotograf">
                <img id="ürün-img" height="100px" width="150px" src="${parentDiv.children[0].src}" alt="">
            </div>
            <div class="baslik">${urunAdi}</div>
            <div class="butonlar">
                <button id="arttir" type="button">+</button>
                <span class="adet">0</span>
                <button id="azalt">-</button>
            </div>
            <div class="fiyat">${price}</div>
            <div class="toplamFiyat">${price}</div>
            <button type="button" class="btn-close" aria-label="Close"></button>
        `
        li.appendChild(urunBilgisi)

        // ! ARTTIR BUTONUNA BASILDIĞINDA İÇERİĞİ ARTIRMAK İÇİN;
        const arttir = urunBilgisi.querySelector("#arttir");
        const azalt = urunBilgisi.querySelector("#azalt");
        const adet = urunBilgisi.querySelector(".adet");
        const toplamFiyat = urunBilgisi.querySelector(".toplamFiyat");

        arttir.addEventListener("click", function(){
            adet.innerHTML++;
            toplamFiyat.innerHTML = Math.round((adet.innerHTML) * parseFloat(price))
        })

        azalt.addEventListener("click", function(){
            if(adet.innerHTML > 0){
                adet.innerHTML--;
                toplamFiyat.innerHTML = Math.round((adet.innerHTML) * parseFloat(price))
            }  
        })
    }

    // ! Ekrandan Siparişi Silmek İçin
    document.addEventListener("click", function(e){
        const clickedElement = e.target;
        if(clickedElement.classList.contains("btn-close")){
            const productElement = clickedElement.parentElement;
            // console.log(productElement)
            productElement.remove()

            // ! Sepet İkonundaki Sayıyı Azaltmak İçin;(Yukarıdaki if bloğu içerisinde tanımlanmalı çünkü ikisi birbirinin devamı işlemler.)
        const littleBox = document.querySelector(".little-box");
        if(littleBox.innerHTML > 0){
            littleBox.innerHTML--;
        }
        }
    })

