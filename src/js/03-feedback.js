import throttle from "lodash.throttle";

const form = document.querySelector(".feedback-form");
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');

const feedbackStateKey = "feedback-form-state";


const saveFeedbackState = () => {
  const feedbackState = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem(feedbackStateKey, JSON.stringify(feedbackState));
};


const loadFeedbackState = () => {
  const feedbackState = JSON.parse(localStorage.getItem(feedbackStateKey));
  if (feedbackState) {
    emailInput.value = feedbackState.email;
    messageInput.value = feedbackState.message;
  }
};


const clearFeedbackState = () => {
  form.reset();
  localStorage.removeItem(feedbackStateKey);
};


const handleFormInput = throttle(() => {
  saveFeedbackState();
}, 500);


const handleFormSubmit = (event) => {
  event.preventDefault();
  const feedbackState = JSON.parse(localStorage.getItem(feedbackStateKey));
  console.log("Form submitted with data:", feedbackState);
  clearFeedbackState();
};


window.addEventListener("DOMContentLoaded", loadFeedbackState);


form.addEventListener("input", handleFormInput);
form.addEventListener("submit", handleFormSubmit);
