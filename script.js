const buttons = document.querySelectorAll('button');

buttons.forEach((button) => {
    if(localStorage.getItem(button.getAttribute('id')) != null) {
      button.innerHTML=localStorage.getItem(button.getAttribute('id'))
    }
  button.addEventListener('click', function (e) {
    //assigning all buttons a click function
    if(e.target.innerHTML != "Register") {
      //if the button has a signed-in name, the option to unregister will appear
        if(confirm("Would you like to unregister?")) {
            e.target.innerHTML = "Register"
            localStorage.removeItem(e.target.getAttribute('id'))
        }
    }
    else {
      //if not, the button will take a name and mark it signed-in
        const name = prompt("Please enter your full name");
        e.target.innerHTML = name
        localStorage.setItem(e.target.getAttribute('id'), name)
    }
  });
});