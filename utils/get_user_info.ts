import userInfoMapping from '@/mapping.json';

export const getAllLarkIds = () => {
    return userInfoMapping.map((item) => item.larkId);
};

export const getLarkIdsFromGithubIds = (githubIds: string[]) => {
    const larkIds: string[] = [];
    userInfoMapping.filter((item) => githubIds.includes(item.githubId)).forEach((item) => larkIds.push(item.larkId));
    return larkIds;
};

export const getLarkIdsFromComment = (comment: string) => {
    const larkIds = userInfoMapping.filter((item) => comment.includes(item.githubId)).map((item) => item.larkId);
    return larkIds;
};

export const getGithubUserInfo = async (githubId: string) => {
    const res = await fetch(`https://api.github.com/users/${githubId}`);
    const userInfo = await res.json();
    return userInfo;
};
