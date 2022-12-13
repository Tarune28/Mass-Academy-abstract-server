////////////////////// IMPORTS
const cors = require('cors');
const express = require('express')

const PORT = process.env.PORT || 8080

const app = express();


const bodyParser = require('body-parser')
app.use(bodyParser.json()) // allows us to take in JSON in post body
app.use(cors()); // allows localhost to communicate with server
app.set("port", PORT)
const db = require("./db.js")
const mail = require("./email.js")

////////////////////// ENDPOINTS

// GET handler: two imputs, request object and response object (what's coming in / what's going out)
app.get('/', (req, res) => {
  res.send('Hello World!')
});

    // blogs
        // POST
            // id 
            // blog info
                // title
                // image
                // date
                // desc
                // category
                // icon
                // likes
                // comments
                // HTML inject
                // 
            // title
            // banner
            // desc
            // full HTML script
            // images?
            // 
        // GET
    // comments
        // POST
        // GET
    // likes
        // POST
        // GET
    // views
        // POST
        // GET

app.post("/blog/create", (req, res) => {


  db.insertDocument(req.body).then((_id) => {
    res.send({
      ok: true,
      _id: _id
    });

  });
});

// email
app.post("/subscriber/email", (req, res) => {

  mail.subscriberMailer(req.body).then(() => {
    res.send({
      ok: true
    });

  });
  db.insertEmail(req.body)
});

// contact form
app.post("/contact", (req, res) => {

  mail.contactMailer(req.body).then(() => {
    res.send({
      ok: true
    });

  });

});

app.get("/blog/info", (req, res) => {
  var id = req.query.id;

  db.getDocument(id).then((ans) => {
    
    res.send({
      ok: true,
      arr: ans
      
    });
   
});
});

app.get("/blog/previews", (req, res) => {

  db.getSixMostRecentDocuments().then((ans) => {
  res.send({
    ok: true,
    arr: ans
  });
});
});

app.get("/blog/getCards", (req, res) => {
  let days = req.query.days;
  db.getDocuments(days).then((ans) => {
  res.send({
    ok: true,
    arr: ans
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
app.listen(PORT || 8080, () => {
  console.log(`App listening on port ${PORT}`)
})