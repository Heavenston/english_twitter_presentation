<script lang="ts">
    import VerifiedMark from "../components/verifiedMark.svelte";
    import dayjs from "dayjs";
    import type { TwitterUser } from "../types";

    export let user: TwitterUser;
    export let isMain = false;
    export let timestamp = Date.now();
    export let repliedTo: TwitterUser | null = null;
    export let comments: number = 0;
    export let retweets: number = 0;
    export let quoteTweets: number = 0;
    export let likes: number = 0;

    $: date = dayjs(timestamp);
    $: nowDate = dayjs();

    $: dateText = "";
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
    }

    $: {
        timestamp;
        nowDate = dayjs();
    };

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
    <div class="tweet main">
        <div class="header smol">
            <span class="avatar" style="background-image: url({user.avatarUrl});" />
            <span class="nameContainer">
                <span class="important name">
                    {user.nickname}
                    {#if user.verified}<VerifiedMark />{/if}
                </span>
                <span class="notImportant handle">@{user.handle}</span>
            </span>
        </div>
        <div class="content">
            <slot></slot>
        </div>
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
    </div>
{:else}
    <div class="tweet">
        <div class="avatarSide">
            <span class="avatar" style="background-image: url({user.avatarUrl});" />
        </div>
        <div class="mainSide">
            <span class="nameContainer">
                <span class="name">
                    {user.nickname}
                    {#if user.verified}<VerifiedMark />{/if}
                </span>
                <span class="notImportant handle">@{user.handle}</span>
                <span class="notImportant date"> · {dateText}</span>
            </span>
            <div class="content">
                <slot></slot>
            </div>
        </div>
    </div>
{/if}


<style lang="scss">
.tweet {
    color: white;
    font-size: 15px;
    font-weight: 400;
    line-height: 20px;

    padding-top: 12px;
    padding-bottom: 12px;
    padding-right: 16px;
    padding-left: 16px;

    border-style: solid;
    border-color: rgb(56, 68, 77);
    border-width: 0px 0 1px 0px;

    .avatar {
        display: inline-block;
        width: 48px;
        height: 48px;
        background-position: center;
        background-size: cover;
        border-radius: 50%;

        margin-right: 12px;
    }

    .content {
        overflow-wrap: break-word;
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
}

.tweet:not(.main) {
    display: flex;
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
</style>
