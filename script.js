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

//localStorage.removeItem("objlen")

var objPeople = []

function getInfo() {
  if (localStorage.getItem("objlen") != null) {
    var objlen = parseInt(localStorage.getItem("objlen"))
  } else {
    var objlen=0
  }
  //set username and password
  var username=document.getElementById('username').value
  var password=document.getElementById('password').value
  //establish newPeople
  newPeople = {}
  newPeople["username"]=username
  newPeople["password"]=password
  //fill objPeople with dictionaries equal to the number of people that are registered - 1
  for (var j=0; j<objlen; j++) {
    objPeople.push(dict={"username":0, "password":0})
  }
  //for (var i=0; i<objlen;i++) {
    //if (username == localStorage.getItem(objPeople[i]["username"]) && password==localStorage.getItem(objPeople[i]["password"])) {
      //alert("You have been logged in. Please close the sign-in window")
      //return
    //}
  //}
  objPeople.push(newPeople)
  localStorage.setItem(String(objlen), JSON.stringify(objPeople[objlen]))
  objlen += 1
  localStorage.setItem("objlen", objlen)
  //every password/username besides the current one immediately turns into null
  console.log(objPeople)
  console.log(objlen)
  console.log(JSON.parse(localStorage.getItem("1"))["password"])
}

//localStorage.clear()
//console.log(localStorage.getItem("objlen"))