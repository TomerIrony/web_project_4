export default class Popup {
  constructor(popupSelector){
    this._popupElement = popupSelector;
  }
  open(){
    this._popupElement.classList.add('popout_opened');
    this.setEventListeners();

  }
  close(){
    this._popupElement.classList.remove('popout_opened');
  }

  _handleEscClose(evt){
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners(){  
    this._popupElement.querySelector('.popout__close-btn').addEventListener('click', () => {
      this.close()
    });
    this._popupElement.addEventListener('click', (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close(evt.currentTarget);
      }
    })
    document.addEventListener('keyup', (evt) => {
      this._handleEscClose(evt)
    })
  }
}
