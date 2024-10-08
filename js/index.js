// ? =============> Global ===============>
let inputs = document.querySelectorAll("input");
let form = document.querySelector("form");
let msg = document.getElementById("msg");
let isValid = false;

// ! =============> When Start ===============>

// * =============> Events ===============>
form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (isValid) {
    setForm();
  }
});

form.addEventListener("input", function () {
  if (
    validationEmail() &&
    validationpassowrd() 
  ) {
    isValid = true;
  }
});

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

// ! =============> Functions ===============>
function setForm() {
  let user = {
    email: inputs[0].value,
    password: inputs[1].value,
  };
  login(user)
}

async function login(userData) {
  const api = await fetch(`https://movies-api.routemisr.com/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  const res = await api.json();

  if (res.message == "success") {
   localStorage.setItem('userToken',res.token);
    location.href = "./home.html";
  } 
  else {
    msg.innerHTML = res.message;
  }
}

//  =============> Validation ===============>
function validationEmail() {
   const rej =
     /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
   if (rej.test(inputs[0].value)) {
     inputs[0].classList.add("is-valid");
     inputs[0].classList.remove("is-invalid");
     return true;
   } else {
     inputs[0].classList.add("is-invalid");
     inputs[0].classList.remove("is-valid");
     return false;
   }
 }
 
 function validationpassowrd() {
   const rej = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
   if (rej.test(inputs[1].value)) {
     inputs[1].classList.add("is-valid");
     inputs[1].classList.remove("is-invalid");
     return true;
   } else {
     inputs[1].classList.add("is-invalid");
     inputs[1].classList.remove("is-valid");
     return false;
   }
 }






