//         _
// ___ ___| |_ _  _ _ __
//(_-</ -_)  _| || | '_ \
///__/\___|\__|\_,_| .__/
//                 |_|
var express = require("express");
var cors = require('cors');
var bodyParser = require("body-parser");
var config = require('./youtubed_config.json');
var api = express();
var app = express();
var api_port = config.api_port;
var app_port = config.app_port;
app.use(express.static('../dist/youtubed'));
api.use(cors());
api.use(bodyParser.json());


//  __              _   _
// / _|_  _ _ _  __| |_(_)___ _ _  ___
//|  _| || | ' \/ _|  _| / _ \ ' \(_-<
//|_|  \_,_|_||_\__|\__|_\___/_||_/__/
//
var notify = function(notification_type, info){
  //return nothing if notify is disabled
  if (!config.notifications.active) {
    return;
  }
  //slack integration setup and call
  if ( config.notifications.type == "slack" ) {
    let Slack = require('node-slackr');
    let slack_config = config.notifications.slack[notification_type];
    let slack = new Slack(slack_config.url, slack_config.config);
    let msg = slack_config.message;
    Object.keys(info).forEach(key => {
      var regEx = new RegExp('\\@' + key, 'i');
      msg = msg.replace(regEx, info[key]);
    });
    slack.notify(msg);
  }
};


//              _
// _ _ ___ _  _| |_ ___ ___
//| '_/ _ \ || |  _/ -_|_-<
//|_| \___/\_,_|\__\___/__/
//
api.get("/api/info", function(req, res) {
  try{
    var youtubed = require("youtube-dl");
    youtubed.getInfo(req.query.url, [], function(err, info) {
      if (err) throw err;
      res.send(info);
    });
    //res.send(true);
  }catch(error) {
    console.error(error);
  }
});

api.get("/api/download", function(req, res) {
  try{
    var youtubed = require("youtube-dl");
    var fs = require('fs');
    var video = youtubed(req.query.url,
    // Optional arguments passed to youtube-dl.
    ['--format=' + req.query.format],
    // Additional options can be given for calling `child_process.execFile()`.
    { cwd: "./" });

    let vidInfo = null;

    video.on('info', info => {
      vidInfo = info;
      notify("create", vidInfo);
      console.info('Download Started');
      console.info('filename: ' + vidInfo.filename);
      console.info('filesize: ' + vidInfo.size);
    });
    video.on('end', function complete() {
      console.info('Download Competed');
      console.info(vidInfo);
      notify("complete", vidInfo);
    });
    video.on('error', error => {
      console.info('Download Failed');
      console.info(error);
      notify("failed", vidInfo);
    });
    video.pipe(fs.createWriteStream(config.download_directory + "/" + req.query.filename));
    res.send(true);
  }catch(error) {
    console.error(error);
    res.send(false);
  }
});



// ___ ___ _ ___ _____ _ _ ___
//(_-</ -_) '_\ V / -_) '_(_-<
///__/\___|_|  \_/\___|_| /__/
//
api.listen(api_port, () => console.info(`API listening on port ${api_port}!`));
app.listen(app_port, () => console.info(`App listening on port ${app_port}!`));