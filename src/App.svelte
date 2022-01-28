<script lang="ts">
    import type { TwitterUser, TweetData } from "./types";
    import Tweet from "./templates/tweet.svelte";
    import Users from "./users";

    const troll = {...Users.fake(), verified: true};

    const tweets: TweetData[] = [
        {
            user: Users.jack,
            timestamp: 1638200880000,
            likes: 312200,
            retweets: 66900,
            quoteTweets: 37900,

            content: "Not sure anyone has heard but,\n\nI resigned from Twitter",

            comments: [
                {
                    user: troll,
                    timestamp: Date.now() - 60 * 60 * 1000,

                    content: "Nobody cares\n\n+ ratio",

                    comments: [
                        {
                            user: Users.fake(),
                            timestamp: Date.now() - 60 * 60 * 1000,

                            content: "This is annoying"
                        },
                        {
                            user: Users.fake(),
                            timestamp: Date.now() - 60 * 60 * 1000,

                            content: "Please stop"
                        },
                    ]
                },
            ],
        },
    ];

    let previousTweet: TweetData | null = tweets[0];
    let selectedTweet = tweets[0].comments?.[0];
</script>

<div class="container">
    <div class="feed">
        <div class="scrollForcer" />
        {#each previousTweet ? [previousTweet] : [] as { content, comments: _, ...tweet}}
            <Tweet
                {...tweet}
                showReplyLine
            >
                <div style="white-space: pre-wrap;">{content}</div>
            </Tweet>
        {/each}
        {#each selectedTweet ? [selectedTweet] : [] as { content, comments: _, ...tweet}}
            <Tweet
                {...tweet}
                isMain
                replyingTo={previousTweet?.user ?? null}
            >
                <div style="white-space: pre-wrap;">{content}</div>
            </Tweet>
        {/each}
        {#each selectedTweet?.comments ?? [] as { content, comments: _, ...tweet }, i}
            <Tweet 
                {...tweet}
                replyingTo={selectedTweet?.user}
            >
                <div style="white-space: pre-wrap;">{content}</div>
            </Tweet>
        {/each}
        <div class="scrollForcer" />
    </div>
</div>

<style>
    @font-face {
        font-family: "TwitterChirp";
        src: url("/chirp-regular-web.woff") format("woff");
    }

    :global(body) {
        font-family: TwitterChirp, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }

    .container {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;

        background-color: rgba(21,32,43,1.00);

        display: flex;
        justify-content: center;

        font-size: 10px;
    }

    .feed {
        border-style: solid;
        border-color: rgb(56, 68, 77);
        border-width: 0 1px 0 1px;

        width: 600px;

        overflow-y: auto;
    }

    .scrollForcer {
        height: 100vh;
    }
</style>
