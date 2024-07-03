import { LARK_GET_ACCESS_TOKEN_URL, LARK_NOTIFY_URL } from '@/constants/constant';

const accessToken = { token: '', expire: 0 };

const getLarkAccessToken = async () => {
    try {
        const res = await fetch(LARK_GET_ACCESS_TOKEN_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                app_id: process.env.LARK_BOT_APP_ID,
                app_secret: process.env.LARK_BOT_APP_SECRET,
            }),
        });

        const data = await res.json();
        return data.tenant_access_token;
    } catch (error) {
        console.error('Failed to get Lark access token:', error);
        throw error;
    }
};

const accessTokenCache = async () => {
    if (accessToken.expire < Date.now().valueOf()) {
        accessToken.token = await getLarkAccessToken();
        accessToken.expire = Date.now().valueOf() + 2 * 60 * 60 * 1000;
    }

    return accessToken.token;
};

export const sendLarkMessage = async (larkIds: string[] | undefined, message: any) => {
    if (!larkIds || larkIds.length === 0) return;

    const accessToken = accessTokenCache();

    accessToken &&
        (await fetch(LARK_NOTIFY_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                content: { post: { zh_cn: message } },
                msg_type: 'post',
                user_ids: larkIds,
            }),
        }));
};
