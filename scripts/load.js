const load = (popup, loading) => {
  const button = popup.querySelector(".form__submit-btn");
  if (loading) {
    button.textContent = "Saving...";
  } else {
    button.textContent = "Save";
  }
};
export default load;
