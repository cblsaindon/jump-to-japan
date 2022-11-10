
var faunadb = window.faunadb
var q = faunadb.query

var client = new faunadb.Client({
  secret: 'fnAE0QviILACUzMsQefrk-H6yh3wvtyoMwZ3oWAA',
  domain: 'db.fauna.com', // Adjust if you are using Region Groups
})

// ADD A LOGIN ENTRY TO THE EVENT HISTORY
var createP = client.query(
  q.Create(q.Collection('EventHistory'), { data: { 
    event: 'login',
    createdDate: new Date().toGMTString()
    //toGMTString
  } })
)
.then(function (res) { console.log('Result:', res) })
.catch(function (err) { console.log('Error:', err) })

var lastTouchEnd = 0;
document.addEventListener('touchend', function (event) {
  var now = (new Date()).getTime();
  if (now - lastTouchEnd <= 300) {
    event.preventDefault();
  }
  lastTouchEnd = now;
}, false);