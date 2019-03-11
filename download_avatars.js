var request = require('request');
var dotenv = require('dotenv').config();
var key = process.env.secretkey;
var fs = require('fs');
var owner = process.argv[2];
var repo = process.argv[3];

function getRepoContributors(repoOwner, repoName, cb) {


  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
    'User-Agent': 'request',
    'Authorization': 'token ' + key
    }
  };
//passing data to callback in json style
  request(options, function(err, res, body) {
    if (!err){
    var data = JSON.parse(body);

    cb(data);
    }
  });
}


function downloadImageByURL(url, filePath) {
  request.get(url)
         .on('error', function (error){
            throw err;
         })
         .on('response', function (response){
          console.log('Downloading image...');
        })
         //saving image with designated filepath
         .pipe(fs.createWriteStream(filePath))
         .on('finish', function (){
          console.log('Download completed.');
         });

}

console.log('Welcome to the GitHub Avatar Downloader!');

getRepoContributors(owner, repo, function(result) {
  //in case of missing input
  if (process.argv.length > 4 || !owner || !repo){
    console.log('input error!');
  } else {
  for (let i = 0; i < result.length; i++){
    //create folder for avatar if folder doesn't exist
    if(!fs.existsSync('avatars/')){
      fs.mkdir('avatars/',function (err){
        if (err) {
          return console.error(err);
        }
        console.log("Folder created.")
      });
    }
    var path = "avatars/" + result[i].login + ".jpg";
    var url = result[i].avatar_url;
    console.log("file path: ", path );
    console.log("Avatar URL:", url);
    //loop and output images
    downloadImageByURL(url, path);
    } console.log('file path do not exist');
  }

});