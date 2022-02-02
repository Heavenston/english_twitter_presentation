import type { TweetData, TwitterUser } from "./types";
import Users from "./users";

const troll = { ...Users.fake(), verified: true };

type AddTweetResult = {
    addTweet: (
        username: string | null,
        data: { content: string } & Partial<TweetData>
    ) => AddTweetResult;
};

let userHandleCounter = 0;
function getNewUser(nickname: string): TwitterUser {
    return {
        ...Users.fake(),
        nickname,
        handle: `twitterCrisis${userHandleCounter++}`,
    };
}

function createTweet(
    nickname: string | null,
    data: { content: string } & Partial<TweetData>
): TweetData {
    return {
        user: nickname ? getNewUser(nickname) : Users.fake(),
        timestamp: Math.random() * 24 * 60 * 60 * 1000,
        likes: Math.random() * 9999 + 420000,
        retweets: Math.random() * 9999 + 420000,
        quoteTweets: Math.random() * 9999 + 420000,

        ...data,
    };
}

function addTweet(
    t: TweetData,
    nickname: string | null,
    data: { content: string } & Partial<TweetData>
): AddTweetResult {
    const tweet = createTweet(nickname, {
        timestamp: t.timestamp + Math.random() * 24 * 60 * 60 * 1000,
        ...data,
    });

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

addTweet(startTweet, "Title", {
    imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/a/ac/Bundesarchiv_Bild_146-1996-027-04A%2C_Junkers_Ju_288_V_2.jpg",
    maxImageHeight: "250px",

    content: `
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
                 Does the Twitter CEO’s departure
                   signal a platform identity crisis?
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
`,
    commentList: [],
}).addTweet("History", {
    content: "hi",
});

export default [startTweet];
