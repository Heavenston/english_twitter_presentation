<script lang="ts">
    import type { TweetData, TwitterUser } from "../types";
    import Tweet from "../templates/tweet.svelte";

    export let tweet: TweetData;
    export let replyingTo: TwitterUser | null = null;
</script>

<Tweet 
    user={tweet.user}
    timestamp={tweet.timestamp}
    likes={tweet.likes}
    retweets={tweet.retweets}
    quoteTweets={tweet.quoteTweets}

    {replyingTo}
    showReplyLine={tweet.commentList && tweet.commentList.length > 0}
>
    <div style="white-space: pre-wrap;">{@html tweet.content.trim()}</div>
</Tweet>

{#if tweet.commentList && tweet.commentList.length > 0}
    <svelte:self tweet={tweet.commentList[tweet.mainComment ?? 0]} replyingTo={tweet.user} />
{/if}
