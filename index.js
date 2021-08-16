let editProfile = document.querySelector(".popout__edit");
let btn = document.querySelector(".profile__edit");
let closeProfileBtn = document.getElementById('exitButton');
let saveButton = document.getElementById('save');

function editProfileShow(){
  let fullName = document.getElementById('fullName').textContent
  let description = document.querySelector('.profile__subtitle').textContent
  editProfile.style.display = "block";
  document.getElementById('id1').value=fullName; 
  document.getElementById('id2').value=description;
}

function closeProfileShow(){
  editProfile.style.display = "none";
}

closeProfileBtn.addEventListener('click', closeProfileShow);
btn.addEventListener('click', editProfileShow);

function newSavedName(){
  let newName = document.getElementById('id1').value;
  document.getElementById('fullName').textContent=newName;
  let newDescription = document.getElementById('id2').value;
  document.querySelector('.profile__subtitle').textContent=newDescription;
  editProfile.style.display = "none";
}
saveButton.addEventListener('click', newSavedName)

let heart1 = document.getElementById("heart1")
let filledHeart1 = document.getElementById("filledHeart1")
let heart2 = document.getElementById("heart2")
let filledHeart2 = document.getElementById("filledHeart2")
let heart3 = document.getElementById("heart3")
let filledHeart3 = document.getElementById("filledHeart3")
let heart4 = document.getElementById("heart4")
let filledHeart4 = document.getElementById("filledHeart4")
let heart5 = document.getElementById("heart5")
let filledHeart5 = document.getElementById("filledHeart5")
let heart6 = document.getElementById("heart6")
let filledHeart6 = document.getElementById("filledHeart6")

function fillHeart1(){                   ///   each heart full function
  heart1.style.display= "none"
  filledHeart1.style.display = "inline"
}
function unfillHeart1(){
  heart1.style.display= "inline"
  filledHeart1.style.display = "none"
}
heart1.addEventListener('click', fillHeart1)
filledHeart1.addEventListener('click', unfillHeart1)   ///

function fillHeart2(){                   
  heart2.style.display= "none"
  filledHeart2.style.display = "inline"
}
function unfillHeart2(){
  heart2.style.display= "inline"
  filledHeart2.style.display = "none"
}
heart2.addEventListener('click', fillHeart2)
filledHeart2.addEventListener('click', unfillHeart2)   

function fillHeart3(){                   
  heart3.style.display= "none"
  filledHeart3.style.display = "inline"
}
function unfillHeart3(){
  heart3.style.display= "inline"
  filledHeart3.style.display = "none"
}
heart3.addEventListener('click', fillHeart3)
filledHeart3.addEventListener('click', unfillHeart3) 

function fillHeart4(){                   
  heart4.style.display= "none"
  filledHeart4.style.display = "inline"
}
function unfillHeart4(){
  heart4.style.display= "inline"
  filledHeart4.style.display = "none"
}
heart4.addEventListener('click', fillHeart4)
filledHeart4.addEventListener('click', unfillHeart4)   

function fillHeart5(){                   
  heart5.style.display= "none"
  filledHeart5.style.display = "inline"
}
function unfillHeart5(){
  heart5.style.display= "inline"
  filledHeart5.style.display = "none"
}
heart5.addEventListener('click', fillHeart5)
filledHeart5.addEventListener('click', unfillHeart5)   

function fillHeart6(){                   
  heart6.style.display= "none"
  filledHeart6.style.display = "inline"
}
function unfillHeart6(){
  heart6.style.display= "inline"
  filledHeart6.style.display = "none"
}
heart6.addEventListener('click', fillHeart6)
filledHeart6.addEventListener('click', unfillHeart6)   







/*let missingHeart = document.querySelectorAll('.elements__card_heart').forEach(function(item) {
  item.addEventListener('click', event => {
    item.style.display = "none"; 
  })
})

*/