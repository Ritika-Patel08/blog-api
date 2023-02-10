import express from 'express';
const app = express();
const port = process.env.PORT || 4000;
import db from './firebase.js';


// Create a post
app.post('/posts', (req, res) => {
    const { title, body, userId } = req.body;
    db.collection('posts')
      .add({ title, body, userId, createdAt: firestore.FieldValue.serverTimestamp() })
      .then(docRef => {
        res.status(201).json({ message: 'Post created successfully', postId: docRef.id });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  });
  
  // Update a post
  app.put('/posts/:id', (req, res) => {
    const postId = req.params.id;
    const { title, body } = req.body;
    db.collection('posts')
      .doc(postId)
      .get()
      .then(doc => {
        if (!doc.exists) {
          return res.status(404).json({ message: 'Post not found' });
        }
        if (doc.data().userId !== req.userId) {
          return res.status(403).json({ message: 'Unauthorized access' });
        }
        return db
          .collection('posts')
          .doc(postId)
          .update({ title, body });
      })
      .then(() => {
        res.json({ message: 'Post updated successfully' });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  });
  
  // Delete a post
  app.delete('/posts/:id', (req, res) => {
    const postId = req.params.id;
    db.collection('posts')
      .doc(postId)
      .get()
      .then(doc => {
        if (!doc.exists) {
          return res.status(404).json({ message: 'Post not found' });
        }
        if (doc.data().userId !== req.userId) {
          return res.status(403).json({ message: 'Unauthorized access' });
        }
        return db.collection('posts').doc(postId).delete();
      })
      .then(() => {
        res.json({ message: 'Post deleted successfully' });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  });
  
  // Fetch all posts
  app.get('/posts', (req,res)=>{
      db.collection('posts')
      .orderBy('createdAt', 'desc')
      .get()
      .then(snapshot => {
      const posts = [];
      snapshot.forEach(doc => {
      posts.push({ id: doc.id, ...doc.data() });
      });
      res.json({ posts });
      })
      .catch(error => {
      res.status(500).json({ error });
      });
      });
      
      // Fetch a post by id
      app.get('/posts/:id', (req, res) => {
      const postId = req.params.id;
      db.collection('posts')
      .doc(postId)
      .get()
      .then(doc => {
      if (!doc.exists) {
      return res.status(404).json({ message: 'Post not found' });
      }
      res.json({ id: doc.id, ...doc.data() });
      })
      .catch(error => {
      res.status(500).json({ error });
      });
      });
      
      // Fetch all posts of a specific userId
      app.get('/posts/user/:userId', (req, res) => {
      const userId = req.params.userId;
      db.collection('posts')
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc')
      .get()
      .then(snapshot => {
      const posts = [];
      snapshot.forEach(doc => {
      posts.push({ id: doc.id, ...doc.data() });
      });
      res.json({ posts });
      })
      .catch(error => {
      res.status(500).json({ error });
      });
      });

    app.listen(port, () => {
    console.log('Server running on port 4000');
    });
