import type { TweetData } from "./types";
import Users from "./users";

const troll = { ...Users.fake(), verified: true };

type AddTweetResult = {
    addTweet: (
        data: { content: string } & Partial<TweetData>
    ) => AddTweetResult;
};

function addTweet(
    t: TweetData,
    data: { content: string } & Partial<TweetData>
): AddTweetResult {
    const tweet = {
        user: Users.jack,
        timestamp: 1048806000000 + Math.random() * 24 * 60 * 60 * 1000,
        likes: Math.random() * 9999 + 420000,
        retweets: Math.random() * 9999 + 210000,
        quoteTweets: Math.random() * 9999 + 210000,

        ...data,

        commentList: [],
    };

    if (t.commentList) t.commentList.push(tweet);
    else t.commentList = [tweet];

    return { addTweet: addTweet.bind(null, tweet) };
}

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
    commentList: [],
};

addTweet(startTweet, {
    user: Users.twitter,

    showFullThread: true,
    content: "absolute legend",
})
    .addTweet({
        user: Users.twitter,
        showFullThread: true,

        content: "Maybe",
    })
    .addTweet({
        user: Users.twitter,
        showFullThread: true,

        content: "Not",
    });

addTweet(startTweet, {
    user: troll,

    content: `
Nobody cares

+ ratio
`,
}).addTweet({
    user: Users.fake(),
    content: "Please stop",
});

export default [startTweet];
