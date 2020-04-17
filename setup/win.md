# Set up MongoDB on Windows

1. Run the installer that you downloaded from [mongodb.com](https://mongodb.com)
1. Create a `data` folder in your Documents folder.
1. Inside of the `data` folder create a `db` folder.

## Create a Path to your MongoDB application

1. To do this, you will need to **Edit environment variables for your account**. _See gif below_

<img src='../__lecture/assets/mongo-setup-pc-1.gif' />

1. Select the Path variable
1. Click 'Edit'
1. Click Browse and locate your MongoDB installation

<img src='../__lecture/assets/mongo-setup-pc-2.gif' />

## Stop the Service!

On Windows, MongoDB was installed as a service and is currently running. We want to stop it and start it ourselves. It will allow us to use our own `data/db` folder(s) instead of the basic service. _You will need to do this after a computer restart._

To stop the MongoDB service open an Administrator PowerShell instance and type

```bash
net stop MongoDB
```

<img src='../__lecture/assets/mongo-setup-pc-3.png' />

## Start the Server

1. Open a new PowerShell
1. Type `mongod --dbpath <PATH_TO_DB>` to start the server

```bash
# Example
mongod --dbpath "C:\Users\gnome\Documents\data\db"
```

That is what my path looks like. You will need to edit it to match your own path.

**TIP:** If you choose to setup the `data/db` folder at the root of your `C:` drive you don't have to enter the path with the command. You can simply type `mongod`.

Once you have the mongo server running, you need to keep this window open to keep the server up.

Open a new PowerShell window to _use_ mongodb. In this window, type `mongo`. This will connect you to database server that you started in the previous step.

```bash
mongo
```

This is where you'll be able to run commands on the database.

Keep these two terminal windows open. We will connect to the running databases via Node and verify that our interactions are actually successful by querying the db from the second terminal.

Now off to the exercises!!
