const { MongoClient, ObjectId } = require("mongodb");

// Replace the uri string with your connection string.
const uri = "mongodb+srv://deadlyunicorn:QSNRXAKMIHyzMxmW@testingcluster01.spy4wzn.mongodb.net/?retryWrites=true&w=majority";

  
const client = new MongoClient(uri);

/*
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
*/


const foundObject=[];

const readFromDatabase = async () =>{

  try{
    await client.connect()
    .then(()=>{console.log("Sucessfully connected!")})

    await client.db("sample_mflix").collection("movies").find(
      {
      
      $and:[
        {"imdb.rating":{$gt:8.5}},{year:{$gt:2014}},{$or:[{genres:{$elemMatch:{$eq:"Comedy"}}},{genres:{$elemMatch:{$eq:"Drama"}}}]}  
      ]
      }).forEach(
      (element)=>{foundObject.push(element)}
      )
    .then((data)=>{
      console.log(`Sucess!\nfeedback:`);
      console.log(JSON.stringify(data));
      foundObject.forEach(
        element=>{console.log(JSON.stringify(element))}
      );})

  }
  catch(error){
    console.error("We got an error :(  : "+error);
  }
  finally{
    client.close();
  }

}

//readFromDatabase();



const insertToDatabase = async () => {
  const obj1={
    name:"Jason Derulo",
    age:26,
    tags:["single","wandering","cool"]
  }
  

  try{
    await client.connect()
    .then(()=>{
      console.log("Success connecting!");
    })
    .then(async()=>
      await client.db("deadly_testing").collection("newCollection").insertMany([obj1])
    )
    .then((data)=>{
      console.log(`Success inserting!`);
      console.log(data);
    })
  }
  catch(error){console.error(error);}
  finally{client.close();}

}

//insertToDatabase();


const replaceDatabase = async (updatedDocument)=> { 
try{
  await client.connect()
  .then(()=>{
    console.log("Success connecting!");
  })
  .then(async()=>
    await client.db("deadly_testing").collection("newCollection").replaceOne({_id:new ObjectId("63e968357640be5e04857193")},updatedDocument)
  )
    .then((data)=>{
    console.log(`Success inserting!`);
    console.log(data);
  })
}
catch(error){console.error(error);}
finally{client.close();}

}

/*
replaceDatabase({
  age:21,
  tags:["single","wandering","cool"]
})
*/



const updateDatabase = async (updatedDocument)=> { 
  try{
    await client.connect()
    .then(()=>{
      console.log("Success connecting!");
    })
    .then(async()=>
      await client.db("deadly_testing").collection("newCollection").updateOne({title:"sussybaska"},updatedDocument,{upsert:true})
      .then((data)=>{
        console.log(`Success inserting!`);
        console.log(data);
      })
      .catch((error)=>{console.error("Error report: \n" +error)})
    )
      
  }
  catch(error){console.error(error);}
  finally{client.close();}
  
  }

  //updateDatabase({$inc:{age:1}})

  const findAndUpdateFunc = async()=>{

    try{
      await client.connect()
      .then(()=>{console.log(`Succesfully connected`)})

      await client.db("deadly_testing").collection("newCollection").findOneAndUpdate({
        _id: new ObjectId('63e968357640be5e04857193')},
        {$inc:{age:1}},{returnDocument:"after"})

      .then ((data)=>{console.log(`Succesfully updated`);console.log(data);})
      .catch((error)=>{console.error(error)})
    }

    catch(error){console.error(error);}
    finally{client.close();}

  }


//findAndUpdateFunc()

const replaceManyFunc = async () =>{
  try{
    await client.connect().then(()=>console.log(`Successfully connected.`));
    await client.db("deadly_testing").collection("newCollection").updateMany({age:{$gt:0}},{$inc:{age:1}})
    .then((data)=>console.log(data))
    .catch((error)=>console.error(error))
  }
  catch(error){console.error(error)}
  finally{client.close()}

}

//replaceManyFunc()

const deleteDocument = async () =>{
  try{
    await client.connect().then(()=>{console.log("successfully connected!")})
    await client.db("deadly_testing").collection("newCollection").deleteOne({_id:new ObjectId('63e96960e2326ce31daf143b')})
    .then((data)=>{console.log(data)})  
  }
  catch(error){console.log(error)}
  finally{client.close()}

}

//deleteDocument()

const deleteManyDocs = async () =>{
  try{
    await client.connect().then(()=>{console.log("successfully connected!")})
    await client.db("deadly_testing").collection("newCollection").deleteMany({tags:{$in:["cool"]},age:{$gt:30}})
    .then((data)=>{console.log(data)})  
  }
  catch(error){console.log(error)}
  finally{client.close()}

}

//deleteManyDocs();



const foundDocuments=[]
const sortingFunc = async () =>{
    try{
      await client.connect().then(()=>{console.log("successfully connected!")})
      await client.db("sample_mflix").collection("movies").find({year:2010,title:{$gte:"A"}}).project({title:1,_id:0,plot:1,lastupdated:1 }).sort({lastupdated:1}).limit(10)
      .forEach(element=>console.log(element))
    }
    catch(error){console.log(error)}
    finally{client.close()}
  
  
}
//sortingFunc()

const countDocs = async () =>{
    try{
      await client.connect().then(()=>{console.log("successfully connected!")})
      await client.db("sample_mflix").collection("movies").countDocuments({year:2010,title:{$gte:"A"}})
      .then(data=>console.log(data))
    }
    catch(error){console.log(error)}
    finally{client.close()}
  
  
}

//countDocs()


const aggregateFunction = async () =>{
  try{
    await client.connect()
    .then(()=>console.log(`connected.`))
    await client.db(`sample_restaurants`).collection(`restaurants`).aggregate([{
      $match:{borough:"Brooklyn"}
    },{$group:{_id:"$address.zipcode",totalZips:{$count:{}}}},
    {$sort:{_id:1}},
    //{$out:"Brooklyn_zip_numbers#1"}
    ])
    .forEach(data=>{console.log(data)})
  }
  catch(error){console.error(error)}
  finally{client.close()}

}

//aggregateFunction();


const Test = async () => {
  try{
    await client.connect();
    await client.db('sample_mflix').collection('movies')
    .aggregate([{$project:{title:1,_id:0}}])
    .toArray()
    .then(value=>{console.log(value[1]['title'])});
  }
  catch(error){console.log(error);}
  finally{client.close();}
}

//Test();


//Create index for more efficient sorts

const IndexCreate = async () => {
  try{
    await client.connect();
    await client.db('sample_mflix').collection('movies')
    .createIndex({title:1}).then((returned)=>console.log(returned))
  }
  catch(error){console.log(error);}
  finally{client.close();}
}

//IndexCreate();


//Checking if we use indeces.

const Explain = async () => {
  try{
    await client.connect();
    await client.db('sample_mflix').collection('movies')
    .indexes()
    .then(returnedVal=>{console.log(returnedVal)})

  }
  catch(error){console.log(error);}
  finally{client.close();}
}

//Explain();




///
const Skip = async () => {
  try{
    await client.connect();
    await client.db('sample_mflix').collection('movies')
    .aggregate([
      {$project:{title:1,_id:0}},
      {$sort:{title:1}},
      {$skip:0},
      {$limit:200}
    ]).toArray()
    .then(returnedVal=>{console.dir(returnedVal,{'maxArrayLength': null})})

  }
  catch(error){console.log(error);}
  finally{client.close();}
}

//Skip();


//Regex

const Regex = async () => {
  try{
    await client.connect();
    await client.db('sample_mflix').collection('movies')
    .aggregate([

      {$project:{title:1,_id:0}},
      {$sort:{title:1}},
      {$match:{
        title:{$regex:/^b/,$options:'i'}
      }}, //match should be before limit.
      
      {$count:'title'} //display how many entries start with A
    ]).toArray()
    .then(returnedVal=>{console.log(returnedVal)})

  }
  catch(error){console.log(error);}
  finally{client.close();}
}

Regex();

