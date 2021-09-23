import {openImagePopup} from "./utils.js"

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

	_toggleLike = () =>{
		this._element.querySelector(".card__like-btn").classList.toggle("card__like-active");
	}

	_deleteCard = () => { 
		this._element.remove()
	}; 
	
	generateCard(){
		this._element = this._getTemplate();
		this._element.querySelector(".card__image").src = this._image;
		this._element.querySelector(".card__name").textContent = this._title;
		this._element.querySelector('.card__like-btn').addEventListener('click', this._toggleLike);
		this._element.querySelector('.card__image').addEventListener('click', openImagePopup);
		this._element.querySelector('.card__close').addEventListener('click', this._deleteCard);
		return this._element;
	}
}