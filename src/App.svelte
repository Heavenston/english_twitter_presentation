<script lang="ts">
    import type { TweetData } from "./types";
    import Tweet from "./templates/tweet.svelte";
    import Users from "./users";
    import { onMount, afterUpdate } from "svelte/internal";
    import { spring } from 'svelte/motion';
    import tweets from "./tweets";

    let previousTweets: TweetData[] = [];
    let selectedTweet = tweets[0];

    let selectedTweetElement: HTMLDivElement | null = null;
    let feed: HTMLDivElement | null = null;

    let scrollSpring = spring(0, { stiffness: 0.3, damping: 1.0 });
    $: if (feed !== null) {
        feed.scrollTop = $scrollSpring;
    };

    function updateScroll() {
        if (selectedTweetElement !== null && feed !== null) {
            const clientRect = selectedTweetElement.getBoundingClientRect();
            scrollSpring.set(clientRect.top + feed.scrollTop - 50);
        }
    }

    onMount(() => {
        const keyDownListener = (ev: KeyboardEvent) => {
            if (ev.code == "Space" || ev.code == "ArrowRight") {
                ev.preventDefault();
                let a = selectedTweet;

                if (a?.comments !== undefined && a.comments.length > 0) {
                    previousTweets = [...previousTweets, a];
                    selectedTweet = a.comments[0];
                }
            }
            if (ev.code == "ArrowLeft") {
                ev.preventDefault();
                if (previousTweets.length > 0) {
                    previousTweets = [...previousTweets];
                    const n = previousTweets.pop();
                    if (n != undefined)
                        selectedTweet = n;
                }
            }
        }
        document.addEventListener("keydown", keyDownListener);
        window.addEventListener("resize", updateScroll);

        return () => {
            document.removeEventListener("keydown", keyDownListener);
            document.removeEventListener("resize", updateScroll);
        };
    });

    afterUpdate(updateScroll);
</script>

<div class="container">
    <div class="feed" bind:this={feed}>
        <div class="scrollForcer" />
        {#each previousTweets as { content, comments: _, ...tweet}, i}
            <Tweet
                {...tweet}
                replyingTo={i > 0 ? previousTweets[i-1].user : null}
                showReplyLine
            >
                <div style="white-space: pre-wrap;">{content}</div>
            </Tweet>
        {/each}
        {#each selectedTweet ? [selectedTweet] : [] as { content, comments: _, ...tweet}}
            <Tweet
                {...tweet}
                isMain
                replyingTo={previousTweets[previousTweets.length-1]?.user ?? null}
                bind:containerEl={selectedTweetElement}
            >
                <div style="white-space: pre-wrap;">{content}</div>
            </Tweet>
        {/each}
        {#each selectedTweet?.comments ?? [] as { content, comments: _, ...tweet }}
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

        overflow-y: hidden;
    }

    .scrollForcer {
        height: 100%;
    }
</style>
