import type { TwitterUser } from "./types";

const users: {
    fake: (
        nickname?: string,
        handle?: string,
        verified?: boolean
    ) => TwitterUser;
    jack: TwitterUser;
    twitter: TwitterUser;
} = {
    fake: (
        nickname = "User",
        handle = nickname.toLowerCase(),
        verified = false
    ) => ({
        nickname,
        handle,
        verified,
        avatarUrl: `https://picsum.photos/seed/${Math.floor(
            Math.random() * 5000
        )}/200`,
    }),
    jack: {
        nickname: "jack⚡️",
        handle: "jack",
        verified: true,
        avatarUrl:
            "https://pbs.twimg.com/profile_images/1115644092329758721/AFjOr-K8_normal.jpg",
    },
    twitter: {
        nickname: "Twitter",
        handle: "twitter",
        verified: true,
        avatarUrl:
            "https://pbs.twimg.com/profile_images/1486805599367180290/Lp3amoqK_400x400.jpg",
        hexagonalPfp: true,
    },
};

export default users;
