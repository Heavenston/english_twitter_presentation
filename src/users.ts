import type { TwitterUser } from "./types";

const users: {
    jack: TwitterUser;
    fake: TwitterUser;
} = {
    fake: {
        nickname: "User",
        handle: "user",
        verified: false,
        avatarUrl: "https://thispersondoesnotexist.com/image",
    },
    jack: {
        nickname: "jack⚡️",
        handle: "jack",
        verified: true,
        avatarUrl:
            "https://pbs.twimg.com/profile_images/1115644092329758721/AFjOr-K8_normal.jpg",
    },
};

export default users;
