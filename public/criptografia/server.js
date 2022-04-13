const express = require ('express');
const app = express();
const bcrypt= require('bcrypt');
app.use(express.json());

function inverterString(str) {
    var o = '';
    for (var i = str.length - 1; i >= 0; i--) {
        o += str[i];
    }
    return o;
}
const users = [];
app.get('/users',(req,res)=> {
    res.json(users)
})
app.post('/users',async(req,res)=>{
    try{      
const buf = Buffer.from(req.body.name, 'ascii')
const hashedPassword= await bcrypt.hash(req.body.password,10);
const user = {name:inverterString(buf.toString('Hex')),password:inverterString(hashedPassword)};
users.push( user);
res.status(201).send();
}
    catch{
       res.status(500).send();
    }
})

app.listen(3000);