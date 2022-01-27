<script lang="ts">
    import Tweet from "./templates/tweet.svelte";
    import Users from "./users";
</script>

<div class="container">
    <div class="feed">
        <Tweet user={Users.jack} isMain timestamp={1638200880000} likes={312200} retweets={66900} quoteTweets={37900}>
            not sure anyone has heard but,<br/>
            <br/>
            I resigned from Twitter
        </Tweet>
        <Tweet user={{...Users.fake, verified: true}} timestamp={Date.now() - 60 * 60 * 1000}>
            Nobody cares<br/><br/>+ ratio
        </Tweet>
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
    }
</style>
