export interface TwitterUser {
    nickname: string;
    avatarUrl: string;
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

    comments?: TweetData[];
    content: string;
}
