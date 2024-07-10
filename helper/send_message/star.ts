import { getAllLarkIds, getGithubUserInfo } from '@/utils/get_user_info';
import { sendLarkMessage } from '@/utils/send_lark_message';
import { StarEvent } from '@octokit/webhooks-types';

export default async function sendStarMessage(raw: StarEvent) {
    if (raw.action === 'deleted') return;

    const senderInfo = await getGithubUserInfo(raw.sender.login);

    const larkIds = getAllLarkIds();
    const message = {
        title: `@${raw.sender.login} star ${raw.repository.full_name}`,
        content: [
            [
                {
                    tag: 'a',
                    href: raw.sender.html_url,
                    text: `${raw.sender.login} github homepage`,
                },
            ],
            [
                {
                    tag: 'text',
                    text: `${raw.sender.login} has ${senderInfo.followers} followers`,
                },
            ],
        ],
    };

    await sendLarkMessage(larkIds, message);
}
