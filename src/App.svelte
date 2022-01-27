<script lang="ts">
    import Tweet from "./templates/tweet.svelte";
    import Users from "./users";

    const troll = {...Users.fake(), verified: true};

    const tweets = [
        {
            user: Users.jack,
            timestamp: 1638200880000,
            likes: 312200,
            retweets: 66900,
            quoteTweets: 37900,

            content: "Not sure anyone has heard but,\n\nI resigned from Twitter",
        },
        {
            user: troll,
            timestamp: Date.now() - 60 * 60 * 1000,

            content: "Nobody cares\n\n+ ratio"
        },
        {
            user: Users.fake(),
            timestamp: Date.now() - 60 * 60 * 1000,

            content: "This is annoying"
        },
        {
            user: Users.fake(),
            timestamp: Date.now() - 60 * 60 * 1000,

            content: "Please stop"
        }
    ];

    let selectedTweet = 0;
</script>

<div class="container">
    <div class="feed">
        {#each tweets as { content, ...tweet }, i}
            {#if Math.abs(i-selectedTweet) <= 1}
                <Tweet 
                    {...tweet}
                    isMain={i == selectedTweet}
                    showReplyLine={i < selectedTweet}
                    replyingTo={i > 0 ? tweets[i-1].user : null}
                >
                    <div style="white-space: pre-wrap;">{content}</div>
                </Tweet>
            {/if}
        {/each}
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
</style>
