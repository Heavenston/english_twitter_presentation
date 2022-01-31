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

    mainComment: 1,
    commentList: [],
};

startTweet.commentList?.push({
    user: troll,
    timestamp: Date.now(),
    likes: 312200,
    retweets: 66900,
    quoteTweets: 37900,
    showFullThread: true,

    content: `
Nobody cares

+ ratio
`,

    commentList: [
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

startTweet.commentList?.push({
    user: Users.twitter,
    timestamp: Date.now(),
    likes: 24600,
    retweets: 1219,
    quoteTweets: 153,
    showFullThread: true,

    content: "absolute legend",
    commentList: [
        {
            user: Users.twitter,
            timestamp: Date.now(),
            likes: 0,
            retweets: 0,
            quoteTweets: 1,
            showFullThread: true,

            content: "Maybe",
            commentList: [
                {
                    user: Users.twitter,
                    timestamp: Date.now(),
                    likes: 0,
                    retweets: 0,
                    quoteTweets: 2,
                    showFullThread: true,

                    content: "Not",
                },
            ],
        },
    ],
});

export default [startTweet];
