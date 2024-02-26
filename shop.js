// script.js
import itemsInfo from "./books.json" assert { type: 'json' };
console.log(itemsInfo)

let colPrePage=3
let rowPrePage=2;
let currentPage=1;

class PaginationService{
    constructor(items, countPrePage){
        this.itemsArray=items
        this.countPrePage=countPrePage
    }
    getNumberOfPages(){
        let numOfItems = this.itemsArray.length
        const dop = ((numOfItems % this.countPrePage) != 0) ? 1 : 0
        return Math.trunc(numOfItems/this.countPrePage) + dop
    }
        
    getItemsAtPage(page){
        if (!this.isValidPage(page)) {
            throw new Error('Page is not valid');
        }
        return this.itemsArray.slice((page-1)*this.countPrePage,page*this.countPrePage)
    }
    isValidPage(page){
        return page > 0 && page <= this.getNumberOfPages()
    }
    
}

let pagination=new PaginationService(itemsInfo.results, colPrePage*rowPrePage)


function createPaginationElem(){
    let pagesNum=pagination.getNumberOfPages()
    let pag=document.querySelector("#middle-section")
    console.log(pagesNum)
    for(let i=0;i<pagesNum;i++){
        let page=document.createElement("span")
        page.innerText=`${i+1} `
        pag.appendChild(page)  
        page.addEventListener('click', function (){
            goToPage(`${i+1}`)
        })
    }
    document.querySelector("#prev-icon").addEventListener('click', function(){
     goToPage(currentPage-1)
     
    })
    document.querySelector("#next-icon").addEventListener('click', function(){
       goToPage(currentPage+1)
    })
}
function goToPage(page){
    if(!pagination.isValidPage(page)){
        return
    }
    currentPage=page
    console.log(currentPage)
    document.querySelector("#items-layout").innerHTML=''
    document.querySelectorAll("#middle-section span").forEach((element)=>element.classList.remove('current-page-button'))
    document.querySelectorAll("#middle-section span")[page - 1].classList.add('current-page-button')
    createBooksLayout(page)
}
function createBooksLayout(page){
    let itemRows = document.querySelector("#items-layout")
    let itemAtPage=pagination.getItemsAtPage(page)
    for (var j=0;j<rowPrePage;j++){
        let newTr = document.createElement("tr")
        for (var i=0; i<colPrePage;i++){
            let index = i+j*colPrePage;
            let newTd = document.createElement("td")
            if(index<itemAtPage.length){
                let currentBook=itemAtPage[index];
                console.log(currentBook, index)
                let bookCover = document.createElement("img")
                let bookName = document.createElement("p")
                bookCover.src=currentBook.cover_path
                bookName.innerText=currentBook.name
                newTd.appendChild(bookCover)
                newTd.appendChild(bookName)
            }
            newTr.appendChild(newTd)  
        }
        itemRows.appendChild(newTr)
    }
}

createPaginationElem()
goToPage(1)


const slider = document.querySelector('.slider');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
const slides = Array.from(slider.querySelectorAll('img'));
const slideCount = slides.length;
let slideIndex = 0;

// Устанавливаем обработчики событий для кнопок
prevButton.addEventListener('click', showPreviousSlide);
nextButton.addEventListener('click', showNextSlide);

function showPreviousSlide() {
  slideIndex = (slideIndex - 1 + slideCount) % slideCount;
  updateSlider();
}

function showNextSlide() {
  slideIndex = (slideIndex + 1) % slideCount;
  updateSlider();
}

function updateSlider() {
  slides.forEach((slide, index) => {
    if (index === slideIndex) {
      slide.style.display = 'block';
    } else {
      slide.style.display = 'none';
    }
  });
}

updateSlider();