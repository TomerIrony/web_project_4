
export const popupImageContainer = document.querySelector('#imageOpened');
const popupImageCaption = document.querySelector('.popout__caption');
const popupImage = document.querySelector('.popout__image');

export const openImagePopup = function(evt) {
	const cardImageSrc = evt.target.parentElement.querySelector('#cardImage').getAttribute('src');
	const cardImageTitle = evt.target.parentElement.querySelector('.card__name').textContent;
	openPopup(popupImageContainer);
	popupImage.setAttribute('src', cardImageSrc);
	popupImageCaption.textContent = cardImageTitle;
	popupImage.alt = document.querySelector('.popout__caption').textContent = cardImageTitle;
};

function closePopup(popup) {
	popup.classList.remove('popout_opened');
	document.removeEventListener('keyup', closePopupEscape);
	popup.removeEventListener('click', closePopupOverlay);
	
}

const closePopupOverlay = function(evt) {
	if (evt.target === evt.currentTarget) {
		closePopup(evt.currentTarget);
	}
};

const closePopupEscape = function(evt) {
	if (evt.key === "Escape") {
		const openPopup = document.querySelector('.popout_opened');
		closePopup(openPopup);
	}
};

export function openPopup(popup) {
	popup.classList.add('popout_opened');
	document.addEventListener('keyup', closePopupEscape);
	popup.addEventListener('click', closePopupOverlay);
}