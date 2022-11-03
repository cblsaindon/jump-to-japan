
var q = faunadb.query

var client = new faunadb.Client({
  secret: 'fnAE0QviILACUzMsQefrk-H6yh3wvtyoMwZ3oWAA',
  domain: 'db.fauna.com', // Adjust if you are using Region Groups
})

//var docRef = q.Ref(q.Collection('books'), '347152674401026644')

function report(e) { //DO SOMETHING WITH EACH ELEMENT FROM THE DOCREF STREAM
  console.log(e)
  var data = ('action' in e)
    ? e["document"].data
    : e.data
    //document.getElementById("scores").textContent = JSON.stringify(data.name)
    document.getElementById("scores").textContent = data.name

}


var stream
const startStream = () => {
  stream = client.stream.document(docRef)
  .on('snapshot', snapshot => {
    report(snapshot)
  })
  .on('version', version => {
    report(version)
  })
  .on('error', error => {
    console.log('Error:', error)
    stream.close()
    setTimeout(startStream, 1000)
  })
  .start()
}

startStream()

