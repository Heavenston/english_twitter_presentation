<script lang="ts">
    import Tweet from "./templates/tweet.svelte";
    import ThreadDisplayer from "./components/threadDisplayer.svelte";

    import type { TweetData } from "./types";
    import { onMount, afterUpdate } from "svelte/internal";
    import { spring } from 'svelte/motion';
    import tweets from "./tweets";

    let showThreadMode: null | number = 0;
    let previousTweets: TweetData[] = [];
    let selectedTweet: TweetData | null = null;

    $: console.log(`Selected tweet: `, selectedTweet);

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
                if (showThreadMode != null) {
                    selectedTweet = tweets[showThreadMode];
                    showThreadMode = null;
                }
                else {
                    let a = selectedTweet;

                    if (a?.commentList && a.commentList.length > 0) {
                        const nextIndex = a.mainComment ?? 0;
                        previousTweets = [...previousTweets, a];
                        selectedTweet = {...a.commentList[nextIndex]};
                    }
                }
            }
            if (ev.code == "ArrowLeft") {
                ev.preventDefault();
                if (previousTweets.length > 0) {
                    previousTweets = [...previousTweets];
                    const n = previousTweets.pop();
                    if (n != undefined)
                        selectedTweet = {...n};
                }
                else if (showThreadMode === null) {
                    showThreadMode = tweets.findIndex(a => a === selectedTweet);
                    selectedTweet = null;
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
        {#if showThreadMode !== null}
            {#each tweets as { content, commentList: _, showFullThread, ...props}, i}
                {#if i === showThreadMode}
                    <Tweet
                        {...props}
                        showThisThread
                        replyingTo={previousTweets[previousTweets.length-1]?.user ?? null}
                        bind:containerEl={selectedTweetElement}
                    >
                        <div style="white-space: pre-wrap;">{content.trim()}</div>
                    </Tweet>
                {:else}
                    <Tweet
                        {...props}
                        replyingTo={previousTweets[previousTweets.length-1]?.user ?? null}
                    >
                        <div style="white-space: pre-wrap;">{content.trim()}</div>
                    </Tweet>
                {/if}
            {/each}
        {:else}
            {#each previousTweets as { content, commentList: _, showFullThread: _, ...props}, i}
                <Tweet
                    {...props}
                    replyingTo={i > 0 ? previousTweets[i-1].user : null}
                    showReplyLine
                >
                    <div style="white-space: pre-wrap;">{content.trim()}</div>
                </Tweet>
            {/each}
            {#each selectedTweet ? [selectedTweet] : [] as { content, commentList: _, showFullThread: _, ...props}}
                <Tweet
                    {...props}
                    isMain={!showThreadMode}
                    replyingTo={previousTweets[previousTweets.length-1]?.user ?? null}
                    bind:containerEl={selectedTweetElement}
                >
                    <div style="white-space: pre-wrap;">{content.trim()}</div>
                </Tweet>
            {/each}
            {#each selectedTweet?.commentList ?? [] as tweet}
                {@const { content, commentList: _, showFullThread, ...props } = tweet}

                {#if showFullThread}
                    <ThreadDisplayer tweet={tweet} replyingTo={selectedTweet.user} />
                {:else}
                    <Tweet 
                        {...props}
                        replyingTo={selectedTweet?.user}
                    >
                        <div style="white-space: pre-wrap;">{content.trim()}</div>
                    </Tweet>
                {/if}
            {/each}
        {/if}
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
