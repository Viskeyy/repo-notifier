import UserInfoMapping from '@/mapping.json';

export const getLarkIdsFromGithubIds = (githubIds: string[]) => {
    const larkIds: string[] = [];
    UserInfoMapping.filter((item) => githubIds.includes(item.githubId)).forEach((item) => larkIds.push(item.larkId));
    return larkIds;
};

export const getGithubIdsFromComment = (comment: string) => {};

export const getGithubUserInfo = async (githubId: string) => {
    const res = await fetch(`https://api.github.com/users/${githubId}`);
    const userInfo = await res.json();
    return userInfo;
};
