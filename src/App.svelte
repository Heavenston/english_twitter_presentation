<script lang="ts">
    import Tweet from "./templates/tweet.svelte";
    import ThreadDisplayer from "./components/threadDisplayer.svelte";

    import type { TweetData } from "./types";
    import { onMount, afterUpdate } from "svelte/internal";
    import { spring } from "svelte/motion";
    import tweets from "./tweets";

    const startTime = Date.now();

    let selectedTweetPath: string =
        sessionStorage.getItem("selectedTweetPath") ?? "$0";
    $: sessionStorage.setItem("selectedTweetPath", selectedTweetPath);

    let showThreadMode: null | number = 0;
    let previousTweets: TweetData[] = [];
    let selectedTweet: TweetData | null = null;

    {
        if (selectedTweetPath.startsWith("$")) {
            selectedTweet = null;
            showThreadMode = parseInt(selectedTweetPath.slice(1));
        } else {
            showThreadMode = null;
            let path = selectedTweetPath.split(";");
            let t: TweetData[] = tweets;
            for (const p of path) {
                if (selectedTweet) previousTweets.push(selectedTweet);
                selectedTweet = t[parseInt(p)];
                t = selectedTweet.commentList ?? [];
            }
        }
    }

    $: console.log(`Selected tweet: `, selectedTweet);

    let selectedTweetElement: HTMLDivElement | null = null;
    let feed: HTMLDivElement | null = null;

    let scrollSpring = spring(0, { stiffness: 0.3, damping: 1.0, precision: 2 });
    $: if (feed !== null) {
        feed.scrollTop = $scrollSpring;
    }

    function updateScroll() {
        if (selectedTweetElement === null || feed === null) return;
        const clientRect = selectedTweetElement.getBoundingClientRect();
        scrollSpring.set(clientRect.top + feed.scrollTop - 25, { hard: Date.now() - startTime < 1000 });
    }

    onMount(() => {
        function nextSlide() {
            if (showThreadMode != null) {
                selectedTweet = tweets[showThreadMode];
                selectedTweetPath = showThreadMode.toString();
                showThreadMode = null;
                return;
            }
            let a = selectedTweet;

            if (a?.commentList && a.commentList.length > 0) {
                const nextIndex = a.mainComment ?? 0;
                previousTweets = [...previousTweets, a];
                selectedTweet = a.commentList[nextIndex];
                selectedTweetPath += ";" + nextIndex;
            }
        }
        function previousSlide() {
            if (previousTweets.length > 0) {
                previousTweets = [...previousTweets];
                const n = previousTweets.pop();
                if (n != undefined) selectedTweet = n;
                selectedTweetPath = selectedTweetPath
                    .split(";")
                    .slice(0, -1)
                    .join(";");
            } else if (showThreadMode === null) {
                showThreadMode = tweets.findIndex(a => a === selectedTweet);
                selectedTweet = null;
                selectedTweetPath = "$" + showThreadMode;
            }
        }

        const keyDownListener = (ev: KeyboardEvent) => {
            if (ev.code == "Space" || ev.code == "ArrowRight") {
                ev.preventDefault();
                nextSlide();
            }
            if (ev.code == "ArrowLeft") {
                ev.preventDefault();
                previousSlide();
            }
        };
        const clickListener = (ev: MouseEvent) => {
            ev.preventDefault();
            if (ev.clientX < window.innerWidth / 2)
                previousSlide();
            else
                nextSlide();
        }

        document.addEventListener("keydown", keyDownListener);
        window.addEventListener("resize", updateScroll);
        document.addEventListener("click", clickListener);

        return () => {
            document.removeEventListener("keydown", keyDownListener);
            window.removeEventListener("resize", updateScroll);
            document.removeEventListener("click", clickListener);

        };
    });

    afterUpdate(updateScroll);
</script>

<div class="container">
    <div class="feed" bind:this={feed}>
        <div class="scrollForcer" />
        {#if showThreadMode !== null}
            {#each tweets as { content, commentList: _, showFullThread, ...props }, i}
                {#if i === showThreadMode}
                    <Tweet
                        {...props}
                        showThisThread
                        replyingTo={previousTweets[previousTweets.length - 1]
                            ?.user ?? null}
                        bind:containerEl={selectedTweetElement}
                    >
                        <div style="white-space: pre-wrap;">
                            {@html content.trim()}
                        </div>
                    </Tweet>
                {:else}
                    <Tweet
                        {...props}
                        replyingTo={previousTweets[previousTweets.length - 1]
                            ?.user ?? null}
                    >
                        <div style="white-space: pre-wrap;">
                            {@html content.trim()}
                        </div>
                    </Tweet>
                {/if}
            {/each}
        {:else}
            {#each previousTweets as { content, commentList, showFullThread, ...props }, i}
                <Tweet
                    {...props}
                    replyingTo={i > 0 ? previousTweets[i - 1].user : null}
                    showReplyLine
                >
                    <div style="white-space: pre-wrap;">{@html content.trim()}</div>
                </Tweet>
            {/each}
            {#each selectedTweet ? [selectedTweet] : [] as { content, commentList, showFullThread, ...props }}
                <Tweet
                    {...props}
                    isMain={!showThreadMode}
                    replyingTo={previousTweets[previousTweets.length - 1]
                        ?.user ?? null}
                    bind:containerEl={selectedTweetElement}
                >
                    <div style="white-space: pre-wrap;">{@html content.trim()}</div>
                </Tweet>
            {/each}
            {#each selectedTweet?.commentList ?? [] as tweet}
                {@const {
                    content,
                    commentList: _,
                    showFullThread,
                    ...props
                } = tweet}

                {#if showFullThread}
                    <ThreadDisplayer {tweet} replyingTo={selectedTweet?.user} />
                {:else}
                    <Tweet {...props} replyingTo={selectedTweet?.user}>
                        <div style="white-space: pre-wrap;">
                            {@html content.trim()}
                        </div>
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
        font-family: TwitterChirp, -apple-system, BlinkMacSystemFont, "Segoe UI",
            Roboto, Helvetica, Arial, sans-serif;
    }

    .container {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;

        background-color: rgba(21, 32, 43, 1);

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
