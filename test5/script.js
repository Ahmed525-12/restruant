var lightbox = document.getElementById("lightbox-container");
var close = document.getElementById("close")
var lightboxImg = document.getElementById("lightbox-item");
let data = document.getElementById('recipes')
let search =document.getElementById("search")



// ----------------------------------------- click open section-------------------
async function openBox(id) { 
    let xs = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${id}`);
    let ys = await xs.json();
  let allRecipesForId=ys.recipe;
  showRecipe(allRecipesForId);
 }


 function showRecipe(element) {
     let cartoona12=
     `
     
     <div class="conts col-md-4 col-sm-10">
             <div class="cont-img">
                 <img src="${element.image_url}" class=" img-fluid" alt="...">
             </div>
     
             <div class="body pt-3 text-center mb-3 text-light">
                 <h3 class="h3-section1">${element.title}</h3>
                 <p class="pt-1 text-secondary">${element.publisher}</p>
                 <a class="btn a-link-section1" href='${element.source_url}'>Details</a>
             </div>
         </div>
         
         <div class="col-md-5 col-sm-11">
         
         <ul class="lists pt-3 " style="color:#fff">

         `
             for(let i = 0 ; i < element.ingredients.length ; i++){
                cartoona12+=`<li>${element.ingredients[i]}</li>`
             }
             `
            
         </ul>
         
         </div>
         
         
     `
    
     $("#lightbox-container").fadeIn(500)
     lightbox.style.display='flex';  
     lightboxImg.innerHTML=cartoona12;
     
 }















// ----------------------------------------- click open section-------------------


// ---------------------------------------------close section -----------------------

close.addEventListener("click", function () {

    lightbox.style.display ='none'
    
  })

// ---------------------------------------------close section -----------------------


// ---------------------------------------------------------- recipes -----------------------------------------


let pastaarray = []

async function getelements() {
    let response = await fetch('https://forkify-api.herokuapp.com/api/search?&q=pasta');
    let responsejson = await response.json();
    pastaarray = responsejson.recipes.splice(1,9);

    console.log(pastaarray)
    display()
}
getelements()

function display() {
    let cartona = ' ';
    for (let i = 0; i < pastaarray.length; i++) {
        cartona += ` 
        
        <div class="col-lg-4 col-md-6 col-sm-12" onclick="openBox('${pastaarray[i].recipe_id}')">
        <div class="img-section1">
            <img src="${pastaarray[i].image_url}" class="img-fluid"style="width:100%;height:200px;cursor: pointer;" alt="">
        </div>
        <div class="text-center pt-3">
            <h3 class="h3-section1">${pastaarray[i].title}</h3>
            <p class="pt-1 text-secondary">${pastaarray[i].publisher}</p>
            <a href="${pastaarray[i].source_url}" class="btn a-link-section1  mb-5" target="_blank">Details</a>
        </div>
    </div>
       `
    }
    data.innerHTML = cartona;
}


// ---------------------------------------------------------- recipes -----------------------------------------


search.addEventListener("keypress",function(){
    searcharray(search.value)
})
function searcharray(search) {
    let cartona = ' ';
    for (let i = 0; i < pastaarray.length; i++) {
        if (pastaarray[i].title.toLowerCase().includes(search.toLowerCase())) {
            cartona += ` 
        
            <div class="col-lg-4 col-md-6 col-sm-12" onclick="openBox('${pastaarray[i].recipe_id}')">
            <div class="img-section1">
                <img src="${pastaarray[i].image_url}" class="img-fluid"style="width:100%;height:200px;cursor: pointer;" alt="">
            </div>
            <div class="text-center pt-3">
                <h3 class="h3-section1">${pastaarray[i].title}</h3>
                <p class="pt-1 text-secondary">${pastaarray[i].publisher}</p>
                <a href="${pastaarray[i].source_url}" class="btn a-link-section1  mb-5" target="_blank">Details</a>
            </div>
        </div>
           `
        }
     
    }
    data.innerHTML = cartona;
}
// ----------------------------------------------------------search------------------------------------------------------

// --------------------------------------------------up btn --------------------------------------------------------
$(window).scroll(function () {
    $('a').toggleClass('scrollh', $(this).scrollTop() > 50);
});

$(".demoupbtn").click(function(){
    $("body,html").animate({scrollTop:'0'},1000)
})
$(window).scroll(function () {
    $('nav').toggleClass('scrolled', $(this).scrollTop() > 50);
});
// --------------------------------------------------up btn --------------------------------------------------------
$("a[href^='#']").click(function(e) {
    let ax = $(e.target).attr("href");
    let ay = $(ax).offset().top;
    $("body,html").animate({scrollTop:ay},1000)
})

// --------------------------------------------------up btn --------------------------------------------------------

$(document).ready(function(){
    $("#store-container").fadeOut(2000,function(){
        $("#loading").fadeOut(2000,function(){
            $("body").css("overflow","auto")
            $("#loading").remove()
        })
    })
})

















