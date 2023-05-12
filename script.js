const buttons = document.querySelectorAll('button');

buttons.forEach((button) => {
  button.addEventListener('click', function (e) {
    if(e.target.classList.contains("signedin")) {
        if(confirm("Would you like to unregister?")) {
            e.target.innerHTML = "Register"
            e.target.classList.remove("signedin")
        }
    }
    else {
        const name = prompt("Please enter your full name");
        e.target.innerHTML = name
        e.target.classList.add("signedin")
        console.log(e.target.classList)
    }
  });
});