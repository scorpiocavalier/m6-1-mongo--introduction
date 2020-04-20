# Exercise 1

Before we start the exercises, let's confirm that there is nothing on our mongo server. Type following in the terminal that is connected to the mongo server:

```bash
show dbs
```

You should get back something like this:

```
admin      0.000GB
config     0.000GB
local      0.000GB
```

Once we start creating databases, they will appear in this list!

---

## Exercise 1.1 - Connect to Mongo and create a database.

1. Inside of `📁 exercises`, create a file called `exercise-1-1.js`
2. Next, we need to write some code that will connect us to the mongo database server.
3. We need to require the MongoClient like so at the top of the file.

```js
const { MongoClient } = require('mongodb');
```

5. Now we'll create a function that will
   - create the `client`
   - connect to the database server
   - create a database called `exercise_one`
   - disconnect from the server

When creating a `new` client we pass it the url of the database, as well as an options object. I've added an option that will soon become a new defaulta at which point we can remove it completely. (It also prevents us being yelled at in the terminal).

```js
const dbFunction = async (dbName) => {
  // create a new client
  const client = new MongoClient('mongodb://localhost:27017', {
    useUnifiedTopology: true,
  });
  // open the connection to the database server
  await client.connect();
  console.log('connected!');

  const db = client.db(dbName);

  // close the connection to the database server
  client.close();
  console.log('disconnected!');
};
```

6. We still need to call this function. Let's call it at the bottom of the file.

```js
dbFunction('exercise_one');
```

7. Now let's run this file from a new Terminal window. _Use the VS Code terminal for this_.

```bash
node exercises/exercise-1.js
```

If you see this in the terminal, it means that it worked.

```
connected!
disconnected!
```

8. Let's verify that we've actually created a database by running `show dbs` in the second terminal window (the one in which we ran that command earlier).

What do you see? Is `exercises` there? Is it in the list? _It isn't._ Why not?

Mongo will not actually create an empty db. We need to add some data in there for it to show up.

9. Go back to the createDatabase function and add this after the `connect` and before the `close` methods.

```js
await db.collection('one').insertOne({ name: 'Buck Rogers' });
```

10. Reverify! Run `show dbs` again. This time you should see

```
admin      0.000GB
config     0.000GB
exercises  0.000GB
local      0.000GB
```

11. But is the data there? Type this command: `use exercises`

12. and then the following: `db.one.find()` (`db` refers to `exercises` and `one` refers to the collection we created inside that database)

You should get this back _(the id will be different)_:

```
{ "_id" : ObjectId("5e98febee9b6840a209fe251"), "name" : "Buck Rogers" }
```

Run the function a few more times. Change the name in the object as well.

---

For reference: [MongoDB CRUD Documentation](http://mongodb.github.io/node-mongodb-native/3.5/reference/ecmascriptnext/crud/)

---

## Exercise 1.2 - Read the data

Let's print out all of the data in the collection to the console.

1. Create a file called `exercise-1-2.js`
2. You will need to replicate steps 1 to 4 from exercise 1 (require the `MongoClient` and declare the `client`)
3. Create a function that will return all of the data in the collection. We need to pass it `req`, `res`.

```js
const getCollection = async (req, res) => {
  res.status(200).json({ status: 200, connection: 'successful!' });
};
```

4. Create an endpoint in `server.js` that we can use to connect view the data. The endpoint should have 2 url params: `dbName` and `collection`. _Don't forget to require the function._

```js
.get('/ex-1/......', getCollection)
```

5. Test it out! You can use either Insomnia or the browser to confirm that your endpoint is working.

<img src='../__lecture/assets/ex-1-2-5.png' />

6. Now let's get the actual data in there! We will have to modigy the `getCollection` function. Fill in the blanks.

```js
const getCollection = async (req, res) => {
  // TODO: get the url params...
  // TODO: open the connection to the database server

  // TODO: declare "db"

  db.collection(collection)
    .find()
    .toArray((err, data) => {
      if (err) {
        // TODO: send error
      } else {
        // TODO: send result
        // TODO: close the connection to the database server
      }
    });
};
```

7. You should now be able to retrieve the data from that collection. w00t!
