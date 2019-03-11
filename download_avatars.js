var request = require('request');
var secrets = require('./secrets');
var fs = require('fs');

function getRepoContributors(repoOwner, repoName, cb) {

  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
    'User-Agent': 'request',
    'Authorization': 'token ' + secrets.GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body) {
    // if (!err && res.statusCode == 200){
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
          console.log('Download completed.')
         });
           // ...
}

downloadImageByURL('https://avatars3.githubusercontent.com/u/1199584?v=4', "test.jpg")

// console.log('Welcome to the GitHub Avatar Downloader!');
// getRepoContributors("jquery", "jquery", function(err, result) {
//   for (let i = 0; i < result.length; i++){
//    // var avatar = result[i][avatar_url];
//   console.log("Errors:", err);
//   console.log("Result:", result[i]["avatar_url"]);
// }
// });