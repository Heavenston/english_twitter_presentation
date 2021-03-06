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
        handle: `twitterCrisis${++userHandleCounter}`,
    };
}

function createTweet(
    nickname: string | null,
    data: { content: string } & Partial<TweetData>
): TweetData {
    return {
        user: nickname != null ? getNewUser(nickname) : Users.fake(),
        timestamp: Math.random() * 3 * 60 * 60 * 1000,
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
        //timestamp: t.timestamp + Math.random() * 24 * 60 * 60 * 1000,
        timestamp: t.timestamp,
        ...data,
    });

    if (t.commentList) t.commentList.push(tweet);
    else t.commentList = [tweet];
    t.showFullThread = true;

    return { addTweet: addTweet.bind(null, tweet) };
}

const startTweet: TweetData = {
    user: Users.jack,
    timestamp: Date.now(),
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

export default [
    startTweet,
    {
        user: Users.malo,
        timestamp: Date.now(),
        likes: -10,
        retweets: -100,
        quoteTweets: -553,

        content: `
POV about Article 3
        By Malo Legendre-Lemaire
`,
        commentList: [],
    },
];

addTweet(startTweet, null, {
    user: {
        ...getNewUser("Intro"),
        avatarUrl:
            "https://upload.wikimedia.org/wikipedia/commons/a/ac/Bundesarchiv_Bild_146-1996-027-04A%2C_Junkers_Ju_288_V_2.jpg",
    },

    content: `
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
                 Does the Twitter CEO???s departure
                   signal a platform identity crisis?
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
`,
    commentList: [],
})
// --------------------------------------------------------------------------------------------------------------------
// WHAT IS TWITTER
// --------------------------------------------------------------------------------------------------------------------
    .addTweet(null, {
        user: Users.twitter,
        content: `
---------------------------------------------------------------
                         ???? So, what is twitter ? ????
---------------------------------------------------------------

       A patform where you can send "tweets" that have a limit of 280 characters.
       It's basically a global wire system !
`,
    })
    .addTweet("Images!", {
        content: `With the tweet text can be joined image(s), videos, gifs, or even polls`,
        imageUrl: "https://www.epita.fr/wp-content/uploads/2017/08/EPITA-campus-rennes-2019.jpg",
        maxImageHeight: "250px",
    })
// --------------------------------------------------------------------------------------------------------------------
// Timeline
// --------------------------------------------------------------------------------------------------------------------
    .addTweet(null, {
        user: Users.jack,
        content: `
---------------------------------------------------------------
               ??????????? Jack Dorsey as CEO Of Twitter ????
---------------------------------------------------------------
`,
    })
    .addTweet("Timeline (not2scale)", {
        content: `
&nbsp???
??????????? 2006, Twitter is created -> Jack dorsey is CEO
  |
???? 2008, Jack Dorsey leaves (stays as a ChairMen)
  |
  |
??????????? 2015,  Jack Dorsey comes back as CEO
  |
  |
  |
???? 2021,  Jack Dorsey leaves Twitter completely
  |
 ???

`,
    })
// --------------------------------------------------------------------------------------------------------------------
// Jack Dorsey == Steve Jobs
// --------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------
// Twitter Monetization
// --------------------------------------------------------------------------------------------------------------------
    .addTweet("Money ????", {
        content: `
---------------------------------------------------------------
       ???? The problem with Twitter's monetization ????
---------------------------------------------------------------
`,
    })
    .addTweet("Money ????", {
        content: `
&nbsp   Ads were the principal revenue for Twitter. \
But it's users prefer to argue about if HTML is a programming language.

    So they aren't as interested by ads (i.e. compared to Instagram), which \
means companies prefer doing virtue-signalling on twitter.
`,
    })
// --------------------------------------------------------------------------------------------------------------------
// After Dorsey
// --------------------------------------------------------------------------------------------------------------------
    .addTweet("Twitter's Identity", {
        content: `
---------------------------------------------------------------
                 ???? Changes of Twitter's Identity ????
---------------------------------------------------------------
`,
    })
    .addTweet("Twitter's Identity", {
        content: `<center>\
Fleets (aka Stories)
17th November 2020 - 14th July 2021

Spaces
3rd May 2021

Twitter Blue
3rd June

(Ticketed) Spaces
3rd May
</center>`,
    })
// --------------------------------------------------------------------------------------------------------------------
// Conclusion
// --------------------------------------------------------------------------------------------------------------------
    .addTweet("", {
        content: `
---------------------------------------------------------------
<center>Is twitter going to have an identity crisis ?</center>\
---------------------------------------------------------------
`,
    })
    .addTweet("Ending", {
        content: `
Evidences are pointing toward Twitter not changing it's identity more after the leave of Jack than before.
`,
    })
    .addTweet("Ending", {
        content: `
---------------------------------------------------------------
                                 Any questions ?
---------------------------------------------------------------
`,
    })
    .addTweet("Ending", {
        content: `
---------------------------------------------------------------
<center>\
What's your opinion ?
Should twitter's uniqueness as a platform
be protected from any changes?
</center>\
---------------------------------------------------------------
`,
    })


