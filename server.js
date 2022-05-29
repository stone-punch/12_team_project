const express = require('express');
const app = express();
var port = app.listen(process.env.PORT || 5050);

app.use(express.static('public'));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/login.html")
})

app.use('/', express.static(__dirname));

app.listen(port, function() {
    console.log('start! express server');
})

app.get((req,res)=>{
	res.status(404).send('not found');
});