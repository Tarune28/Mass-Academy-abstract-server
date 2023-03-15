////////////////////// IMPORTS
const cors = require('cors');
const express = require('express')

const PORT = process.env.PORT || 5003

const app = express();


const bodyParser = require('body-parser')
app.use(bodyParser.json()) // allows us to take in JSON in post body
app.use(cors()); // allows localhost to communicate with server
app.set("port", PORT)
const db = require("./db.js")

////////////////////// ENDPOINTS

// GET handler: two imputs, request object and response object (what's coming in / what's going out)
app.get('/', (req, res) => {
  res.send('Hello World!')
});


// app.post("/record/create", (req, res) => {

// });



app.get("/getAllRecords", async (req, res) => {

  db.getRecords().then(() => {
  res.send({
    ok: true,
    records: arr
  });
});
});

app.post("/getFilterRecords", async (req, res) => {
  let data = req.body;
  db.getFilterRecords(data).then(() => {
  res.send({
    ok: true,
    records: arr
  });
});
});

app.get("/getSearchRecords", async (req, res) => {
  let keywords = req.query.keywords;
  db.getSearchRecords(keywords).then(() => {
  res.send({
    ok: true,
    records: arr
  });
});
});



app.post("/blog/delete", (req, res) => {
  console.log(req.body)
  db.deleteDocument(req.body._id).then(() => {
    res.send({
      ok: true
    });
  });
});



// db.inventory.deleteOne( { status: "D" } )

// TODO: READ from DB

// "main" method, launches the server
app.listen(PORT || 5003, () => {
  console.log(`App listening on port ${PORT}`)
})