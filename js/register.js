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
    validationName(inputs[0]) &&
    validationName(inputs[1]) &&
    validationEmail() &&
    validationpassowrd() &&
    validationAge()
  ) {
    isValid = true;
  }
});

// ! =============> Functions ===============>
function setForm() {
  let user = {
    first_name: inputs[0].value,
    last_name: inputs[1].value,
    email: inputs[2].value,
    password: inputs[3].value,
    age: inputs[4].value,
  };

  regiter(user);
}

async function regiter(userData) {
  const api = await fetch(`https://movies-api.routemisr.com/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  const res = await api.json();

  if (res.message == "success") {
    location.href = "./index.html";
  } 
  else {
    msg.innerHTML = res.errors?.email.message;
  }
}

//  =============> Validation ===============>
function validationName(input) {
  const rej =
    /^(?:[a-zA-Z0-9\s@,=%$#&_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){2,20}$/;
  if (rej.test(input.value)) {
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
    return true;
  } else {
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
    return false;
  }
}

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

function validationEmail() {
  const rej =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  if (rej.test(inputs[2].value)) {
    inputs[2].classList.add("is-valid");
    inputs[2].classList.remove("is-invalid");
    return true;
  } else {
    inputs[2].classList.add("is-invalid");
    inputs[2].classList.remove("is-valid");
    return false;
  }
}

function validationpassowrd() {
  const rej = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (rej.test(inputs[3].value)) {
    inputs[3].classList.add("is-valid");
    inputs[3].classList.remove("is-invalid");
    return true;
  } else {
    inputs[3].classList.add("is-invalid");
    inputs[3].classList.remove("is-valid");
    return false;
  }
}

function validationAge() {
  const rej = /^([1-7][0-9]|80)$/;
  if (rej.test(inputs[4].value)) {
    inputs[4].classList.add("is-valid");
    inputs[4].classList.remove("is-invalid");
    return true;
  } else {
    inputs[4].classList.add("is-invalid");
    inputs[4].classList.remove("is-valid");
    return false;
  }
}

