// ? =============> Global ===============>
let logout_btn=document.querySelector('.logout-btn');
let links=document.querySelectorAll('.nav-item .nav-link');
let loading=document.querySelector('.loading');


// ! =============> When Start ===============>
getGame('mmorpg')
// * =============> Events ===============>
   logout_btn.addEventListener('click',function(){
      location.href='index.html';
      localStorage.removeItem("userToken");
  })

  links.forEach(function(link){
   link.addEventListener('click',function(){
   document.querySelector('.active').classList.remove('active');
   link.classList.add("active");
   let category=link.getAttribute('data-category');
   getGame(category);  
   })
 })
// ! =============> Functions ===============>
   const mode=document.getElementById('mode');

if(localStorage.getItem('theme')!=null){
  const currenttheme=localStorage.getItem('theme');
  document.documentElement.setAttribute('data-theme',currenttheme);

  if(currenttheme=='light'){
    mode.classList.replace("fa-sun", "fa-moon");
  }
  if(currenttheme=='dark'){
    mode.classList.replace( "fa-moon","fa-sun");
  }

}


mode.addEventListener('click',function(){
  if(mode.classList.contains('fa-sun')){
   mode.classList.replace('fa-sun','fa-moon');
   document.documentElement.setAttribute('data-theme','light')
   localStorage.setItem('theme','light')
  }
  else{
   document.documentElement.setAttribute('data-theme','dark')
    mode.classList.replace('fa-moon','fa-sun')
   localStorage.setItem('theme','dark')
  }
})

async function getGame(cat){
   loading.classList.remove('d-none')
   const options = {
      method: 'GET',
      headers: {
         'x-rapidapi-key': '99bd6ba294msh6cc4f5e8a845f90p14ca17jsne6e313033da4',
         'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
      }
   };
   const api= await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${cat}`,options);
   const res = await api.json();
   displaydata(res);
   loading.classList.add('d-none')
}

function displaydata(data){
   let gamesBox = ``;
   for (let i = 0; i < data.length; i++) {
      let videopath=data[i].thumbnail.replace('thumbnail.jpg','videoplayback.webm');
      gamesBox += `
      <div class="col">
      <div onclick="detalisdata(${data[i].id})" onmouseenter="startvide(event)"  onmouseleave="stopvide(event)"  class="card h-100 bg-transparent" role="button" >
         <div class="card-body">
            <figure class="position-relative">
               <img class="card-img-top object-fit-cover h-100" src="${data[i].thumbnail}" />

             <video muted="true"  preload="none" loop   class="w-100 d-none h-100 position-absolute top-0 start-0 z-3">
              <source src="${videopath}">
              </video>
            </figure>

            <figcaption>

               <div class="hstack justify-content-between">
                  <h3 class="h6 small">  ${data[i].title} </h3>
                  <span class="badge text-bg-primary p-2">Free</span>
               </div>

               <p class="card-text small text-center opacity-50">
               ${data[i].short_description}
               </p>

            </figcaption>
         </div>

         <footer class="card-footer small hstack  justify-content-between">
            <span class="badge badge-color">${data[i].genre}</span>
            <span class="badge badge-color">${data[i].platform}</span>
         </footer>
      </div>
   </div>
      `;
   }

   document.getElementById("gameData").innerHTML = gamesBox;
}


function startvide(event){
const video=event.target.querySelector('video');
video.classList.remove('d-none')
video.muted = true;
video.play();
}

function stopvide(event){
   const video=event.target.querySelector('video');
   video.classList.add('d-none')
   video.pause();
}

function detalisdata(id){
location.href=`details.html?id=${id}`
}

