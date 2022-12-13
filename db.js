
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

const serviceAccount = require("./key.json");

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();



// posting sub info
exports.getRecords = async function getRecords(doc) {
  const snapshot = await db.collection('abstracts').get();
  arr = [];
  snapshot.forEach((doc) => {

    arr.push(doc.data())
  });
};


exports.getSearchRecords = async function getSearchRecords(keyword) {
  const snapshot = await db.collection('abstracts').get();
  arr = [];
  snapshot.forEach((doc) => {
    
    
    let combine = doc.data()["title"] + doc.data()["category"] + doc.data()["subcategory"] + doc.data()["abstract"] + doc.data()["phrase1"] + doc.data()["phrase2"] + doc.data()["author"];

    try {

      if(combine.toLowerCase().includes(keyword.toLowerCase())) {
        
        arr.push(doc.data())
      }
    }
    catch(err) {
      console.log(err)
    }
    
    
   
  });
};

