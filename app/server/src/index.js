require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan')('tiny');
const compression = require('compression')();

const app = express();

app.use(morgan);
app.use(compression);
app.use(cors());
app.use(helmet());

const Twitter = require('twitter');

const twitterClient = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

app.get('/tweets', async (req, res) => {
  const { screen_name } = req.query;
  const payload = { screen_name, count: 10 };
  twitterClient.get(
    'statuses/user_timeline',
    payload,
    async (error, tweets) => {
      if (!error) {
        await res.json(tweets);
      }
    }
  );
});

app.listen(3000, () => {
  console.log('Listening at http://localhost:3000'); // eslint-disable-line
});
