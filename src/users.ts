import type { TwitterUser } from "./types";

const users: {
    fake: () => TwitterUser;
    jack: TwitterUser;
    twitter: TwitterUser;
    malo: TwitterUser;
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
    twitter: {
        nickname: "Twitter",
        handle: "twitter",
        verified: true,
        avatarUrl:
            "https://pbs.twimg.com/profile_images/1486805599367180290/Lp3amoqK_400x400.jpg",
        hexagonalPfp: true,
    },
    malo: {
        nickname: "Malo",
        handle: "malolegendrelemaire",
        verified: true,
        avatarUrl:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaKY4FMHglN_HQ13F2mUGFPMTx0wgfg4tk8g&usqp=CAU",
    },
};

export default users;
