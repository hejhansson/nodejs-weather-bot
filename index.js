var request = require('request'),
    cheerio = require('cheerio'),
    chalk = require('chalk'),
    tweet, url = "https://www.skistar.com/sv/trysil/",
    TwitterBot = require("node-twitterbot").TwitterBot,
    config = require('dotenv').config();

    var Bot = new TwitterBot({
      "consumer_secret": process.env.consumer_secret,
      "consumer_key": process.env.consumer_key,
      "access_token": process.env.access_token,
      "access_token_secret": process.env.access_token_secret
    });

    process.stdin.setEncoding('utf8');
    process.stdin.on('data', function (chunk) {
      console.log("Enter was pressed. Closing script...");
      process.exit();
    });

    console.log("Script is running. Close with any key.");

    setInterval(function(){
      request(url, function (error, response, body) {
        if (!error) {
    		  var $ = cheerio.load(body),
    			TEMPERATRUE_TOP = $("p.top").clone().children().remove().end().text(),
          TEMPERATRUE_VALLEY = $("p.valley").clone().children().remove().end().text(),
          SNOW_DEPTH = $('.depth p').text(),
          OPEN_SLOPES = $('.slopes p').text(),
          TOTAL_SLOPES = $('.slopes p span').text(),
          OPEN_LIFTS = $('.lifts p').text();

          tweet = "It's" + TEMPERATRUE_TOP + " on the top and" + TEMPERATRUE_VALLEY + " in the valley. Snow depth: " + SNOW_DEPTH + ". Open slopes: " + OPEN_SLOPES + ". Open lifts: " + OPEN_LIFTS + ". #trysil";
          Bot.tweet(tweet);

          var date = new Date();
          console.log("Log: Sent a tweet -- " + date.toISOString(Date.now() ) );

      	} else {
      		console.log("Oops! Something went wrong. Srsly sry.");
      	}
      });

  }, 7200000);
