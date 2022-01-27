import type { TwitterUser } from "./types";

const users: {
    jack: TwitterUser;
    fake: () => TwitterUser;
} = {
    fake: () => ({
        nickname: "User",
        handle: "user",
        verified: false,
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
};

export default users;
