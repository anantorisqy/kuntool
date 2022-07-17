const express = require('express');
const axios = require('axios');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser')


const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function(req,res){
  let html = ` <center>
<h1>Add Anime by Title</h1>
<form action="/list" method="post">
  <label for="fname">Judul Anime:</label>
  <input type="text" id="fname" name="title"><br><br>
  <input type="submit" value="Submit">
</form> </center>`
    res.send(html)
})
app.post('/auth', (async (req, res) => {
    try {
  var endpoint = req.body.endpoint
      console.log(endpoint)
  let d = await axios.get(`https://kusonime-scrapper.glitch.me/api/anime/${endpoint}`)
     let data = d.data
    let title = data.title
    let thumbnail = data.thumbnail
    let japanese = data.japanese
   
      let type = data.type
      let status = data.status
      let episode = data.total_eps
      let score = data.score
        let durasi = data.durasi
      let sinopsis = data.sinopsis
      let dla = data.list_download[0][1]
      let ldl = ``
        for (let i = 0; i < dla.length; i++){
  ldl += `<a href="${dla[i].link_download[0].link}">${dla[i].resolusi}</a> | `
    }
  let html = `

       <div class="separator" style="clear: both; text-align: center;">
<a imageanchor="1" style="margin-left: 1em; margin-right: 1em;" href="${thumbnail}">
  <img border="0" data-original-height="410" data-original-width="750" src="${thumbnail}"></a></div>
<a name="more"></a><br>
<br>
<br>
<h1 class="ng-binding">Info Anime ${title}</h1>
<hr align="center" color="green" size="2" width="90%">
<table align="left">
<tbody>
<tr valign="top">
<td><center>
</center>
</td></tr>
<tr>
</tr>
<tr>

</tr>
</tbody>
</table>
<br><table class="otable" style="width: 100%;">
<tbody>
<tr valign="top">
<td width="30%">Title</td>
<td>: </td>
<td class="ng-binding">${title}(${japanese})</td></tr>
<tr valign="top">
<td width="30%">Type </td>
<td>: </td>
<td class="ng-binding">${type}</td>
</tr>
<tr valign="top">
<td width="30%">Status </td>
<td>: </td>
<td class="ng-binding">${status}</td>
</tr><tr valign="top">
<td width="30%">Episode </td>
<td>: </td>
<td class="ng-binding">${episode}</td>
</tr>
<tr valign="top">
<td width="30%">Score </td>
<td>: </td>
<td class="ng-binding">${score}</td>
</tr>
<tr valign="top">
<td width="30%">Durasi </td>
<td>: </td>
<td class="ng-binding">${durasi}</td>
</tr>

</tbody>
</table>
<center class="ng-binding">
<h1>Sinopsis</h1>
<hr align="center" color="green" size="2" width="90%">
<br>
${sinopsis}
</center>
<br>
<center class="ng-binding">
<h1>
Link Download</h1>
<hr align="center" color="green" size="2" width="90%">
<br>
</center>
<center class="ng-binding">
${ldl}</center>

    
  `
      res.send(`<center><h1>${title}</h1></h1><br><textarea>${html}</textarea>`)
       } catch (e) {
    console.log(e)
    let errorz = { status: "404" }
res.send(errorz)
}
}))
app.post('/list', (async (req, res) => {
    try {
  var title = req.body.title
  let d = await axios.get(`https://kusonime-scrapper.glitch.me/api/cari/${title}`)
      let data = d.data
      let option = ``
        for (let i = 0; i < data.length; i++){
    option += `
    <option value="${data[i].link.endpoint}">${data[i].title}</option>
  `
        }
      let html = `
 <form action="/auth" method="post">
  <label for="cars">Choose a Title Anime:</label>
  <select id="cars" name="endpoint">
   ${option}
  </select>
  <input type="submit" value="Submit">
</form> 
`
      res.send(html)
      } catch (e) {
    console.log(e)
    let errorz = { status: "404" }
res.send(errorz)
}
}))
app.listen(80, function(){
    console.log(`Localhost:8000`)
  });
  
  module.exports = app;