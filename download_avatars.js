var request = require('request');
var secrets = require('./secrets');
var fs = require('fs');
var owner = process.argv[2];
var repo = process.argv[3];

function getRepoContributors(repoOwner, repoName, cb) {


  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
    'User-Agent': 'request',
    'Authorization': 'token ' + secrets.GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body) {
    var data = JSON.parse(body);

    cb(err, data);
  // ...

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
         .pipe(fs.createWriteStream(filePath))
         .on('finish', function (){
          console.log('Download completed.');
         });
           // ...
}

console.log('Welcome to the GitHub Avatar Downloader!');
getRepoContributors(owner, repo, function(err, result) {
  if (!owner || !repo){
    console.log('missing information!');
  } else {
  for (let i = 0; i < result.length; i++){
    var path = "avatars/" + result[i].login + ".jpg";
    var url = result[i].avatar_url;
    console.log("file path: ", path );
    console.log("Avatar URL:", url);
    downloadImageByURL(url, path);
  }
  }
});