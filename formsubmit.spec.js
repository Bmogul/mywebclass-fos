const form = document.getElementById("contact-form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = form.elements["name"].value;
  const email = form.elements["email"].value;
  const message = form.elements["message"].value;
  alert(`Thank you for contacting us, ${name}! We will get back to you as soon as possible.\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`);
  form.reset();
});
