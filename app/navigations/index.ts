interface RouteRecord {
    displayName: string;
    icon?: any;
    pageName: string;
    path: string;
}

const navigations: RouteRecord[] =
[
    {
        displayName: "首页",
        icon: "heroicons:home",
        pageName: "home",
        path: "/",
    },
    {
        displayName: "介绍",
        icon: "heroicons:user-circle",
        pageName: "profile",
        path: "/profile",
    },
    {
        displayName: "关于",
        icon: "heroicons:information-circle",
        pageName: "about",
        path: "/about",
    }
]

export {navigations}