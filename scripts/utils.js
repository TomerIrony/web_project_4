import {openPopup, popupImageContainer, popupImage, popupImageCaption} from "./index.js"
export const openImagePopup = function(evt) {
	const cardImageSrc = evt.target.parentElement.querySelector('#cardImage').getAttribute('src');
	const cardImageTitle = evt.target.parentElement.querySelector('.card__name').textContent;
	openPopup(popupImageContainer);
	popupImage.setAttribute('src', cardImageSrc);
	popupImageCaption.textContent = cardImageTitle;
	popupImage.alt = document.querySelector('.popout__caption').textContent = cardImageTitle;
};