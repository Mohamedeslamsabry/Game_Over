// ! =============> When Start ===============>
const search = location.search;
const params = new URLSearchParams(search);
const id = params.get("id");

let loading = document.querySelector(".loading");

async function getdetails() {
  loading.classList.remove("d-none");
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "99bd6ba294msh6cc4f5e8a845f90p14ca17jsne6e313033da4",
      "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
    },
  };
  const api = await fetch(
    `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,
    options
  );
  const data = await api.json();
  desplaydata(data);
  loading.classList.add("d-none");
}

getdetails();

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

function desplaydata(data) {
  const detailsBox = `
   <div class="col-md-4">
   <figure>
      <img src="${data.thumbnail}" class="w-100" alt="details image" />
   </figure>
</div>
<div class="col-md-8">
   <div>

    <div class='d-flex justify-content-between align-items-center'>
    <nav aria-label="breadcrumb">
         <ol class="breadcrumb" class="text-light">
            <li class="breadcrumb-item text-reset"><a href="./home.html">Home</a></li>
            <li class="breadcrumb-item text-info" aria-current="page">${data.title}</li>
         </ol>
      </nav>

     <a href="./home.html" role='button' > <i class="fa-solid fa-xmark  fa-xl"></i> </a>
    </div>
      

      <h1>${data.title}</h1>

      <h3>About ${data.title}</h3>
      <p>${data.description}</p>

      
   </div>
</div>

   `;

  document.getElementById("detailsData").innerHTML = detailsBox;

  const bgI = data.thumbnail.replace("thumbnail", "background");

  document.body.style.cssText = `
   background-image: url(${bgI});
   background-position: center;
   background-repeat: no-repeat;
  background-size: cover;
   `;
}

