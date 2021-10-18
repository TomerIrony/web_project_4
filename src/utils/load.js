const load = ({ popup, loading }) => {
  const button = popup.querySelector(".form__submit-btn");
  if (loading) {
    button.textContent = "Saving...";
    return;
  } else {
    button.textContent = "Save";
    return;
  }
};
export default load;
