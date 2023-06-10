const buttons = document.querySelectorAll('button.reg');

buttons.forEach((button) => {
    if(localStorage.getItem(button.getAttribute('id')) != null) {
      button.innerHTML=localStorage.getItem(button.getAttribute('id'))
    }
  button.addEventListener('click', function (e) {
    if (localStorage.getItem("signed") == null) {
      alert("Please sign or log in before entering a registration")
      return
    }
    const regname = JSON.parse(localStorage.getItem("signed"))["name"]
    //assigning all buttons a click function
    if(e.target.innerHTML != "Register") {
      //if the button has a signed-in name, and if the account unregistering is the same one which registered (so accounts' can't
      //mess with each others' registrations), the option to unregister will appear
        if(e.target.innerHTML != JSON.parse(localStorage.getItem("signed"))["name"]) {
          alert("Someone has already registered for that slot. Please choose a different one")
          return
        }
          if(confirm("Would you like to unregister?")) {
              e.target.innerHTML = "Register"
              localStorage.removeItem(e.target.getAttribute('id'))
          }
    } else {
      //if not, the button will take a name and mark it signed-in
        e.target.innerHTML = regname
        localStorage.setItem(e.target.getAttribute('id'), regname)
    }
  });
});

var objPeople = []

function identify() {
  console.log("check")
  const signbutton=document.getElementById('signbutton')
  if (signbutton.innerHTML != "SIGN IN") {
    if(confirm("Would you like to sign out?")) {
      signbutton.innerHTML = "SIGN IN"
      localStorage.removeItem("signed")
    }
  }
}

function getInfo() {
  if (localStorage.getItem("objlen") != null) {
    var objlen = parseInt(localStorage.getItem("objlen"))
  } else {
    var objlen=0
  }
  //set username and password
  var username=document.getElementById('username').value
  var password=document.getElementById('password').value
  document.getElementById('username').value =""
  document.getElementById('password').value =""
  const signbutton=document.getElementById('signbutton')
  //establish newPeople
  newPeople = {}
  newPeople["username"]=username
  newPeople["password"]=password
  //check if the username and password are in storage
  for (var i=0; i<=objlen;i++) {
    if (localStorage.getItem(String(i)) != null) {
      if (username==JSON.parse(localStorage.getItem(String(i)))["username"] && password==JSON.parse(localStorage.getItem(String(i)))["password"]) {
        signbutton.innerHTML=JSON.parse(localStorage.getItem(String(i)))["name"]
        localStorage.setItem("signed", localStorage.getItem(String(i)))
        alert("You have been logged in. Please close the sign-in window")
        return
      }
    }
  }
  //if not, store them, plus the user's name
  const fullname = prompt("Enter your name as \"Last Name\", \"First Name\" to sign in!")
  if (fullname !="") {
      newPeople["name"] = JSON.stringify(fullname)
      alert("You have been signed in. Welcome! Please close the sign-in window")
  }
  objPeople.push(newPeople)
  localStorage.setItem(String(objlen), JSON.stringify(objPeople[objlen]))
  objlen += 1
  localStorage.setItem("objlen", objlen)
  signbutton.innerHTML=newPeople["name"]
  localStorage.setItem("signed", JSON.stringify(newPeople))
}

//localStorage.clear()
//console.log(localStorage.getItem("signed"))

function ifsigned() {
  const signbutton=document.getElementById('signbutton')
  if (localStorage.getItem("signed") !=null) {
    signbutton.innerHTML = JSON.parse(localStorage.getItem("signed"))["name"]
  } else {
    signbutton.innerHTML = "SIGN IN"
    return
  }
}