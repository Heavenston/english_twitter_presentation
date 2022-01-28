import type { TweetData } from "./types";
import Users from "./users";

const troll = { ...Users.fake(), verified: true };

const startTweet: TweetData = {
    user: Users.jack,
    timestamp: 1638200880000,
    likes: 312200,
    retweets: 66900,
    quoteTweets: 37900,

    imageUrl:
        "https://pbs.twimg.com/media/FFX1IQ0WUAEqaLH?format=jpg&name=large",
    maxImageHeight: "200px",

    content: `
Not sure anyone has heard but,

I resigned from Twitter
`,
    comments: [],
};

startTweet.comments?.push({
    user: Users.twitter,
    timestamp: Date.now(),
    likes: 24600,
    retweets: 1219,
    quoteTweets: 153,

    content: "absolute legend",
    comments: [],
});

startTweet.comments?.push({
    user: troll,
    timestamp: Date.now(),
    likes: 312200,
    retweets: 66900,
    quoteTweets: 37900,

    content: `
Nobody cares

+ ratio
`,

    comments: [
        {
            user: Users.fake(),
            timestamp: Date.now(),
            likes: 312200,
            retweets: 66900,
            quoteTweets: 37900,

            content: "Please stop",
        },
    ],
});

export default [startTweet];
