var itinerary = {}
const checks=[]
const registrations = []
const buttons = document.querySelectorAll('button.reg');

buttons.forEach((button) => {
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
        var slotted=true
        const regs=[]
        e.target.innerHTML = regname
        //get registered id and name
        regs.push(e.target.getAttribute('id'))
        regs.push(regname)
        //add it to registrations
        registrations.push(regs)
        console.log(JSON.parse(localStorage.getItem("itinerary")))
        //if there's already an itinerary in localStorage:
        if (JSON.parse(localStorage.getItem("itinerary")) != null) {
          if (JSON.parse(localStorage.getItem("itinerary"))[localStorage.getItem("selected")] != null) {
            console.log(regs)
            //set whatever date is currently selected to the new registrations
            itinerary=JSON.parse(localStorage.getItem("itinerary"))
            itinerary[localStorage.getItem("selected")].push(regs)
            localStorage.setItem("itinerary", JSON.stringify(itinerary))
            console.log("hey")
            slotted = false
          }
        } 
        if (slotted){
          console.log("hi")
          itinerary=JSON.parse(localStorage.getItem("itinerary"))
          itinerary[localStorage.getItem("selected")] = registrations
          localStorage.setItem("itinerary", JSON.stringify(itinerary))
        }
        console.log(JSON.parse(localStorage.getItem("itinerary")))
        console.log(JSON.parse(localStorage.getItem("itinerary"))[localStorage.getItem("selected")])
        //store "itinerary" in localstorage, and then go from there (it shouldn't be too hard, since "itinerary" literally matches
        //every date to its registrations). After that, figure out how to remove days that have already passed from "itinerary"
    }
  });
});

var objPeople = []

function identify() {
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
  if ((window.location.href).includes("index")) {
    document.querySelector("#date").addEventListener("change", function() {
      var input = this.value;
      checks.push(input)
    });
  }
  console.log(localStorage.getItem("selected"))
  const signbutton=document.getElementById('signbutton')
  if (localStorage.getItem("signed") !=null) {
    signbutton.innerHTML = JSON.parse(localStorage.getItem("signed"))["name"]
  } else {
    signbutton.innerHTML = "SIGN IN"
    return
  }
}

//when it comes to the whole deal with the "Go to Schedule page" functionality with the onclick and action and whatnot, fix it later
function setitin() {
  localStorage.setItem("selected", checks[checks.length - 1])
  if (localStorage.getItem("selected")=undefined) {
    alert("Please input a date before proceeding to the Schedule page")
    return
  }
}