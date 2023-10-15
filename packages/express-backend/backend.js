import express from "express";
import cors from "cors";


const app = express();
const port = 8000;

const users = { 
   users_list : [
      { 
         id : 'xyz789',
         name : 'Charlie',
         job: 'Janitor',
      },
      {
         id : 'abc123', 
         name: 'Mac',
         job: 'Bouncer',
      },
      {
         id : 'ppp222', 
         name: 'Mac',
         job: 'Professor',
      }, 
      {
         id: 'yat999', 
         name: 'Dee',
         job: 'Aspring actress',
      },
      {
         id: 'zap555', 
         name: 'Dennis',
         job: 'Bartender',
      }
   ]
}

const findUserByName = (name) => { 
    return users['users_list']
        .filter( (user) => user['name'] === name); 
}

const findUserById = (id) =>
    users['users_list']
        .find( (user) => user['id'] === id);
//added ID gen for new users - still needs to refresh to display tho
const addUser = (user) => {
    
    users['users_list'].push(user);
    return user;
}

const delUser = (id) => {
    
	var user = users['users_list'].find( (user) => user['id'] === id);
    var indx = users['users_list'].indexOf(user)
    users['users_list'].splice(indx, 1);
}

const findUserByNameJob = (name, job) => { 
	return users['users_list'].find( (user) => user['job'] === job && user['name'] === name);
}

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
	res.send('Hello World!');
	
});

//extended users to fit requirements

app.get('/users', (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    if (name != undefined && job == undefined){
        let result = findUserByName(name);
        result = {users_list: result};
        res.send(result);
    } else if (name != undefined && job != undefined) {
	    let result = findUserByNameJob(name, job);
	    result = {users_list: result};
	    res.send(result);
    }
    else{
        res.send(users);
    }
});

app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined) {
        res.status(404).send('Resource not found.');
    } else {
        res.send(result);
    }
});

app.post('/users', (req, res) => {
    let userToAdd = req.body;
    userToAdd.id = '' + (Math.floor(Math.random() * 1000));
    //userToAdd.id = "100"
    res.status(201).send(addUser(userToAdd));
});


//uses find by ID to check user exists then runs delete by filtering NOT that specific ID
app.delete('/users', (req, res) => {
    const id = req.query.id; //or req.params.id
    let result = findUserById(id);
    if (result === undefined) {
        res.status(404).send('Resource not found.');
    } else {
        delUser(id)
        res.status(204).send();
    }
});


app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});

