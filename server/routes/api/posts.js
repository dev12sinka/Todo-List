const { Router } = require('express');
const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();


// Get Post
router.get('/', async (req ,res) => {
        const posts = await loadPostsCollection();
        res.send(await posts.find({}).toArray());

})
 // Add Post
 router.post('/add', async (req, res) =>{
        const posts = await loadPostsCollection();
        await posts.insertOne({
              text: req.body.text,
              createAt: new Date(),
              done :0,
        });
        res.status(201).send();

 })

 // Delete Post
 router.delete('/delete/:id' ,async (req, res) =>{
        const posts = await loadPostsCollection();
        await posts.deleteOne({_id: new mongodb.ObjectId(req.params.id)});
        res.status(200).send();
 })

 // Fix Post
 router.post('/update/:id/:text', async (req, res)=>{
        const posts = await loadPostsCollection();
        var new_task = {$set: {text: req.params.text}};
        await posts.updateOne({_id: new mongodb.ObjectId(req.params.id)},new_task);
        res.status(200).send();
 })
  // Done Post
router.post('/done/:id' , async (req, res) =>{
       const posts = await loadPostsCollection();
       var old_task=  await posts.find({_id: new mongodb.ObjectId(req.params.id)}).toArray()
       if (old_task[0].done ==1){
              var new_task = {$set: {done:0}};
              
       }else{
              var new_task = {$set: {done:1}};
       }

       
       await posts.updateOne({_id: new mongodb.ObjectId(req.params.id)},new_task);
       res.status(200).send();

})



async function loadPostsCollection(){
        const client = await mongodb.MongoClient.connect('mongodb://localhost:27017', {
        useNewUrlParser: true
        });
        return client.db('todo_list').collection('posts');

}

module.exports = router;