
let faunadb = window.faunadb
let q = faunadb.query

let client = new faunadb.Client({
  secret: 'fnAE0QviILACUzMsQefrk-H6yh3wvtyoMwZ3oWAA',
  domain: 'db.fauna.com', // Adjust if you are using Region Groups
})

// ADD A LOGIN ENTRY TO THE EVENT HISTORY
let chosenUsername = document.getElementById("usrname").value;
let createP = client.query(
  q.Create(q.Collection('EventHistory'), { data: { 
    event: 'login',
    createdDate: new Date().toGMTString(),
    username: chosenUsername
    //toGMTString
  } })
)
.then(function (res) { console.log('Result:', res) })
.catch(function (err) { console.log('Error:', err) })

let lastTouchEnd = 0;
document.addEventListener('touchend', function (event) {
  let now = (new Date()).getTime();
  if (now - lastTouchEnd <= 300) {
    event.preventDefault();
  }
  lastTouchEnd = now;
}, false);