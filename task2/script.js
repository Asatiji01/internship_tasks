function validateForm() {
  let name = document.forms["contactForm"]["name"].value;
  let email = document.forms["contactForm"]["email"].value;

  if (name == "" || email == "") {
    alert("Name and Email must be filled!");
    return false;
  }
  return true;
}