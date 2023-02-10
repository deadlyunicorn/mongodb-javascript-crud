const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri = "mongodb+srv://deadlyunicorn:QSNRXAKMIHyzMxmW@testingcluster01.spy4wzn.mongodb.net/?retryWrites=true&w=majority";

  
const client = new MongoClient(uri);

const getGenres = async () => {
    try{

      await client.connect()
      .then(()=>{console.log(`Sucessfully connected`)})

      .then(()=>{
        return client.db('sample_mflix').collection('movies').distinct("genres")
      })

      .then(data=>{
        tempData=(data);
        console.log(tempData);
      });
    }



    catch(error){
      console.error(`Failed because of ${error}`);
    }



    finally{
      client.close()
    }
}

getGenres();

