<script lang="ts">
    import VerifiedMark from "../components/verifiedMark.svelte";
    import LikeIcon from "../components/likeIcon.svelte";
    import RetweetIcon from "../components/retweetIcon.svelte";
    import ShareIcon from "../components/shareIcon.svelte";
    import CommentIcon from "../components/commentIcon.svelte";

    import dayjs from "dayjs";
    import type { TwitterUser } from "../types";
    import { onMount } from "svelte/internal";

    export let containerEl: HTMLDivElement | null = null;

    export let user: TwitterUser;
    export let isMain = false;
    export let timestamp = Date.now();
    export let replyingTo: TwitterUser | null = null;
    export let showReplyLine = false;
    export let showThisThread: boolean = false;
    export let comments: number = 0;
    export let retweets: number = 0;
    export let quoteTweets: number = 0;
    export let likes: number = 0;
    export let imageUrl: string | null = null;
    export let maxImageHeight: string | null = null;

    $: date = dayjs(timestamp);
    $: nowDate = dayjs();

    let dateText = "";
    $: if (isMain) {
        dateText = date.format("hh:mm · MMM D, YYYY");
    } else {
        const diff = +nowDate - +date;
        if (diff < 60 * 1000) { // Under a minute (show seconds)
            dateText = `${Math.round(diff / 1000)}s`;
        }
        else if (diff < 60 * 60 * 1000) { // Under an hour (show minutes)
            dateText = `${Math.round(diff / (60 * 1000))}m`;
        }
        else if (diff < 24 * 60 * 60 * 1000) { // Under 24 hours (show shours)
            dateText = `${Math.round(diff / (60 * 60 * 1000))}h`;
        }
        else {
            dateText = date.format("MMM D, YYYY");
        }
    }

    onMount(() => {
        const t = setInterval(() => {
            nowDate = dayjs();
        }, 500);

        return () => clearInterval(t);
    });

    function formatStat(n: number) {
        if (n > 1000) {
            return `${Math.round(n / 100) / 10}K`;
        }
        else {
            return n.toString();
        }
    }
</script>

{#if isMain}
    <div class="tweet main" bind:this={containerEl}>
        <div class="header smol">
            <span class:hexagonal={!!user.hexagonalPfp} class="avatar" style="background-image: url({user.avatarUrl});" />
            <span class="nameContainer">
                <span class="important name">
                    {user.nickname}
                    {#if user.verified}<VerifiedMark />{/if}
                </span>
                <span class="notImportant handle">@{user.handle}</span>
            </span>
        </div>
        {#if replyingTo !== null}
            <div class="smol notImportant replyingTo">Replying to <span class="linkLike">@{replyingTo.handle}</span></div>
        {/if}
        <div class="content">
            <slot></slot>
        </div>
        {#if imageUrl}
            <img src={imageUrl} style={maxImageHeight ? `max-height: ${maxImageHeight};` : ""} class="embed" alt="Picsum" />
        {/if}
        <div class="notImportant smol date">
            {dateText} · Twitter For Malo
        </div>
        <div class="stats smol">
            <span>
                <span class="important">{formatStat(retweets)}</span>
                <span class="notImportant">Retweets</span>
            </span>
            <span>
                <span class="important">{formatStat(quoteTweets)}</span>
                <span class="notImportant">Quote Tweets</span>
            </span>
            <span>
                <span class="important">{formatStat(likes)}</span>
                <span class="notImportant">Likes</span>
            </span>
        </div>
        <div class="actions smol notImportant">
            <span>
                <span><CommentIcon/></span>
            </span>
            <span>
                <span><RetweetIcon/></span>
            </span>
            <span>
                <span><LikeIcon/></span>
            </span>
            <span>
                <span><ShareIcon/></span>
            </span>
        </div>
    </div>
{:else}
    <div class="tweet" class:hasReplyLine={showReplyLine} bind:this={containerEl}>
        <div class="contentBand">
            <div class="avatarSide">
                <div class:hexagonal={!!user.hexagonalPfp} class="avatar" style="background-image: url({user.avatarUrl});" />
                {#if showReplyLine || showThisThread}
                    <div class="replyLine" class:isForShowThread={showThisThread} />
                {/if}
            </div>
            <div class="mainSide">
                <div class="nameContainer">
                    <span class="important name">
                        {user.nickname}
                        {#if user.verified}<VerifiedMark />{/if}
                    </span>
                    <span class="notImportant handle">@{user.handle}</span>
                    <span class="notImportant date"> · {dateText}</span>
                </div>
                {#if replyingTo !== null}
                    <div class="smol replyingTo notImportant">Replying to <span class="linkLike">@{replyingTo.handle}</span></div>
                {/if}
                <div class="content">
                    <slot></slot>
                </div>
                {#if imageUrl}
                    <img src={imageUrl} style={maxImageHeight ? `max-height: ${maxImageHeight};` : ""} class="embed" alt="Picsum" />
                {/if}
                <div class="stats smol notImportant">
                    <span>
                        <span><CommentIcon/></span>
                        <span>{formatStat(comments)}</span>
                    </span>
                    <span>
                        <span><RetweetIcon/></span>
                        <span>{formatStat(retweets + quoteTweets)}</span>
                    </span>
                    <span>
                        <span><LikeIcon/></span>
                        <span>{formatStat(likes)}</span>
                    </span>
                    <span>
                        <span><ShareIcon/></span>
                    </span>
                </div>
            </div>
        </div>
        {#if showThisThread}
            <div class="thisThread">
                <div class:hexagonal={!!user.hexagonalPfp} class="avatar" style="background-image: url({user.avatarUrl});" />
                <div class="linkLike text">Show this thread</div>
            </div>
        {/if}
    </div>
{/if}


<style lang="scss">
.tweet {
    color: white;
    font-size: 15px;
    font-weight: 400;
    line-height: 20px;

    padding-top: 12px;
    padding-right: 16px;
    padding-left: 16px;

    border-style: solid;
    border-color: rgb(56, 68, 77);
    border-width: 0 0 1px 0;

    .avatar {
        display: inline-block;
        width: 48px;
        height: 48px;
        background-position: center;
        background-size: cover;
        border-radius: 50%;

        &.hexagonal {
            border-radius: 0;
            clip-path: url(#hex-hw-shapeclip-clipconfig);
        }
    }

    .content {
        overflow-wrap: break-word;
    }

    .embed {
        width: 100%;
        height: auto;

        border-radius: 16px;
        margin-top: 12px;

        object-fit: cover;
        object-position: center top;
    }
}

.tweet.main {
    font-size: 23px;
    font-weight: 400;
    line-height: 28px;

    padding-bottom: 0;

    .header {
        display: inline-flex;
        flex-direction: row;

        margin-bottom: 16px;
    }

    .avatar {
        margin-right: 12px;
    }

    .replyingTo {
        margin-bottom: 16px;
    }

    .nameContainer {
        display: inline-flex;
        flex-direction: column;
        justify-content: center;
        align-items: stretch;
    }

    .date {
        margin-top: 16px;
        margin-bottom: 16px;
    }


    .stats {
        display: flex;
        gap: 20px;

        padding: 16px 4px 16px 4px;
        border-top: 1px solid rgb(56, 68, 77);
    }

    .actions {
        display: flex;
        width: 100%;
        justify-content: space-around;
        flex-direction: row;

        padding: 16px 4px 16px 4px;
        border-top: 1px solid rgb(56, 68, 77);
    }

}

.tweet:not(.main) {
    display: flex;
    flex-direction: column;

    .mainSide {
        padding-bottom: 12px;
    }

    .contentBand {
        display: flex;
    }

    .stats {
        display: flex;
        width: 425px;
        justify-content: space-between;
        flex-direction: row;

        margin-top: 12px;
    }

    .avatarSide {
        display: flex;
        flex-direction: column;
        align-items: center;

        margin-right: 12px;
    }

    &.hasReplyLine {
        border-width: 0;
        padding-bottom: 0;
    }

    .replyLine {
        margin-top: 4px;
        margin-bottom: -9px;

        &.isForShowThread {
            margin-bottom: 1px;
        }

        background-color: #3d5466;
        width: 2px;
        flex-grow: 1;
    }

    .thisThread {
        display: flex;

        padding-top: 2px;
        padding-bottom: 2px;
        padding-left: 8px;

        .avatar {
            display: inline-block;

            height: 32px;
            width: 32px;

            margin-right: 20px;
        }

        .text {
            display: inline-block;

            padding: 8px 0;
            flex-grow: 1;
        }
    }
}

.smol {
    font-size: 15px;
    line-height: 20px;
}

.important {
    font-weight: 700;
}

.notImportant {
    color: #8899A6;
}

.linkLike {
    color: #1d9bf0;
}
</style>
