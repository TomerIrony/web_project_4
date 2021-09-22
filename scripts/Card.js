import {openImagePopup} from "./utils.js"

const closeImage = function(evt) { 
	const btn = evt.target; 
	const card = btn.parentElement; 
	card.parentElement.removeChild(card); 
}; 

const toggleLike = function(evt) {
	evt.target.classList.toggle("card__like-active");
};

export default class Card{
	constructor(data, template){
		this._title = data.name;
		this._image = data.link;
		this._template = template;
}
	_getTemplate(){
		const cardElement = document
		.querySelector(this._template).content
		.querySelector(".card")
		.cloneNode(true);

		return cardElement;
	}
	
	generateCard(){
		this._element = this._getTemplate();
		this._element.querySelector(".card__image").src = this._image;
		this._element.querySelector(".card__name").textContent = this._title;
		this._element.querySelector('.card__like-btn').addEventListener('click', toggleLike);
		this._element.querySelector('.card__image').addEventListener('click', openImagePopup);
		this._element.querySelector('.card__close').addEventListener('click', closeImage);
		return this._element;
	}
}