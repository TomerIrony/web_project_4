let profileEditButton = document.getElementById('openProfile');
let profileEditWindow = document.getElementById('popoutWindow');
let closeProfileWindowButton = document.getElementById('closeProfileButton');
let userFullName = document.getElementById('fullName');
let userDescription = document.getElementById('description');
let form = document.getElementById('form');
let inputName = document.querySelector('.input__text_type_name');
let inputDescription = document.querySelector('.input__text_type_description');


function openEditProfileWindow(){
  profileEditWindow.classList.add('popout_opened');
  inputName.value = userFullName.textContent;
  inputDescription.value = userDescription.textContent;
}

function closeEditProfileWindow(){
  profileEditWindow.classList.remove('popout_opened')
}

function newSavedName(e) {
  e.preventDefault();   // stop page from refrashing after submiting
  userFullName.textContent = inputName.value;
  userDescription.textContent = inputDescription.value;
  profileEditWindow.classList.remove('popout_opened')
}


closeProfileWindowButton.addEventListener('click', closeEditProfileWindow)
profileEditButton.addEventListener('click', openEditProfileWindow)
form.addEventListener('submit', newSavedName)
