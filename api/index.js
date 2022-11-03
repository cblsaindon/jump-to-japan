var q = faunadb.query

var client = new faunadb.Client({
  secret: 'fnAE0QviILACUzMsQefrk-H6yh3wvtyoMwZ3oWAA',
  domain: 'db.fauna.com', // Adjust if you are using Region Groups
})

// Define a reference to the document that we want to stream
// Note that the Scores collection must already exist

//var docRef = q.Get(q.Ref(q.Collection('books'), '347152674401026644'));
//var Select(['data', 'name'], '');
//document.getElementById("scores").textContent = docRef+'yo';
//document.getElementById("scores").textContent = dbs.data.name;


//var docRef = q.Ref(q.Collection('books'), '347152674401026644')
//var docRef = q.Paginate(q.Match(q.Index('words_by_book'), 'essentials'));
//document.getElementById("scores").textContent = JSON.stringify(docRef.japanese);
var arr = ['hi','hi2'];
var boo = "no";
var counter = 0;
var docRef = q.Paginate(q.Match(q.Index("words_by_book"), "essentials"))

//document.getElementById("scores").textContent = docRef;


function report(e) { //DO SOMETHING WITH EACH ELEMENT FROM THE DOCREF STREAM
  console.log(e)
  var data = ('action' in e)
    ? e["document"].data
    : e.data
    //document.getElementById("scores").textContent = JSON.stringify(data.name)
    document.getElementById("scores").textContent = JSON.stringify(docRef)

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

