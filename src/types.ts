export interface TwitterUser {
    nickname: string;
    avatarUrl: string;
    hexagonalPfp?: boolean;
    handle: string;
    verified: boolean;
}

export interface TweetData {
    user: TwitterUser;
    timestamp: number;
    likes?: number;
    retweets?: number;
    quoteTweets?: number;
    imageUrl?: string;
    maxImageHeight?: string;
    showFullThread?: boolean;

    mainComment?: number;
    commentList?: TweetData[];
    content: string;
}
