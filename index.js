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
