//Write code to make it so people can only see their own registrations/empty timeslots.
//steps:
//1: wall off the Schedule Page until the user signs in, aka make setitin() work
//2: when the user moves to the Schedule Page, pinpoint any registrations not under their name
//3: when found, replace the names under those registrations with "Taken", and fade the taken timeslot to gray
var itinerary = {}
const checks=[]
const registrations = []
const buttons = document.querySelectorAll('button.reg');
const ps = document.querySelectorAll('p')

buttons.forEach((button) => {
  //assigning all buttons a click function
  button.addEventListener('click', function (e) {
    if (localStorage.getItem("signed") == null) {
      //if user isn't signed in, they are asked to
      alert("Please sign or log in before entering a registration")
      return
    }
    const regname = JSON.parse(localStorage.getItem("signed"))["name"]
    if(e.target.innerHTML != "Register") {
      //if the button has a signed-in name, and if the account unregistering is the same one which registered
      //(so accounts' can't mess with each others' registrations), the option to unregister will appear
          if(confirm("Would you like to unregister?")) {
              e.target.innerHTML = "Register"
              localStorage.removeItem(e.target.getAttribute('id'))
              itinerary=JSON.parse(localStorage.getItem("itinerary"))
              for (var k=0; k<itinerary[localStorage.getItem("selected")].length; k++) {
                if (itinerary[localStorage.getItem("selected")][k].includes(e.target.getAttribute('id'))) {
                  var scape = itinerary[localStorage.getItem("selected")].splice(k, 1)
                  localStorage.setItem("itinerary", JSON.stringify(itinerary))
                }
            }
          }
    } else {
        var slotted=true
        const regs=[]
        e.target.innerHTML = regname
        //get registered timeslot and name
        regs.push(e.target.getAttribute('id'))
        regs.push(regname)
        //add it to registrations
        registrations.push(regs)
        //if there's an itinerary in localStorage, add it to itinerary like this
        if (JSON.parse(localStorage.getItem("itinerary")) != null) {
          itinerary=JSON.parse(localStorage.getItem("itinerary"))
          if (JSON.parse(localStorage.getItem("itinerary"))[localStorage.getItem("selected")] != null) {
            itinerary[localStorage.getItem("selected")].push(regs)
            localStorage.setItem("itinerary", JSON.stringify(itinerary))
            slotted = false
          }
        }
        //if there isn't an itinerary for it in localStorage, add it to itinerary like this
        if (slotted){
          itinerary[localStorage.getItem("selected")] = registrations
          localStorage.setItem("itinerary", JSON.stringify(itinerary))
        }
    }
  });
});

var objPeople = []

function identify() {
  //how to how to sign out
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
  //get username and password
  var username=document.getElementById('username').value
  var password=document.getElementById('password').value
  document.getElementById('username').value =""
  document.getElementById('password').value =""
  const signbutton=document.getElementById('signbutton')
  newPeople = {}
  newPeople["username"]=username
  newPeople["password"]=password
  for (var i=0; i<=objlen;i++) {
    if (localStorage.getItem(String(i)) != null) {
      //if the username and password have been entered before, aka in localstorage, log in user
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
  if (fullname !="" && fullname!=null) {
      newPeople["name"] = JSON.stringify(fullname)
      alert("You have been signed in. Welcome! Please close the sign-in window")
  } else{
      return
    }
  //this doesn't happen if the user logs in:
  objPeople.push(newPeople)
  localStorage.setItem(String(objlen), JSON.stringify(objPeople[objlen]))
  objlen += 1
  localStorage.setItem("objlen", objlen)
  signbutton.innerHTML=newPeople["name"]
  localStorage.setItem("signed", JSON.stringify(newPeople))
}
var registers = []

function ifsigned() {
  if ((window.location.href).includes("index")) {
    //if the home page is opened, keep track of what dates are being selected from the calendar
    document.querySelector("#date").addEventListener("change", function() {
      var input = this.value;
      checks.push(input)
    //also, check if there are any outdated registrations and purge them from the itinerary
    });
    if(JSON.parse(localStorage.getItem("itinerary")) != null) {
      var refresh = Object.keys(JSON.parse(localStorage.getItem("itinerary")))
      itinerary=JSON.parse(localStorage.getItem("itinerary"))
      for(var l=0; l<refresh.length; l++) {
        if(refresh[l]<min){
          delete itinerary.refresh[l]
          localStorage.setItem("itinerary", JSON.stringify(itinerary))
        }
      }
    }
  }
  if ((window.location.href).includes("schedule") &&  JSON.parse(localStorage.getItem("itinerary")) != null){
    var taken=document.createElement("p")
    taken.innerHTML="Taken"
    //if the schedule page is opened, get all of the registrations from the selected date and replace their innerHTML with their names
    itinerary=JSON.parse(localStorage.getItem("itinerary"))
    if(localStorage.getItem("selected") in itinerary) {
      registers = JSON.parse(localStorage.getItem("itinerary"))[localStorage.getItem("selected")]
      for(var j=0; j<registers.length; j++) {
        document.getElementById(registers[j][0]).innerHTML = registers[j][1]
      }
    }
    var once=false
    buttons.forEach((butt) => {
      if(butt.innerHTML!=JSON.parse(localStorage.getItem("signed"))["name"]&&butt.innerHTML!="Register") {
        if (!once) {
          once=true
        }
        butt.setAttribute("disabled", "")
        butt.innerHTML="Taken"
      }
    })
  }
  //on startup, check if the user is signed in and update accordingly
  const signbutton=document.getElementById('signbutton')
  if (localStorage.getItem("signed") != null) {
    signbutton.innerHTML = JSON.parse(localStorage.getItem("signed"))["name"]
  } else {
    signbutton.innerHTML = "SIGN IN"
    return
  }
}