import { getAllLarkIds } from '@/utils/get_user_info';
import { sendLarkMessage } from '@/utils/send_lark_message';
import { PushEvent } from '@octokit/webhooks-types';

export default async function sendPushMessage(raw: PushEvent) {
    const larkIds = getAllLarkIds();
    const message = {
        title: `@${raw.sender.login} push a commit in ${raw.repository.full_name}`,
        content: [
            [
                {
                    tag: 'text',
                    text: `commit: ${raw.head_commit?.message}`,
                },
            ],
            [
                {
                    tag: 'a',
                    href: raw.head_commit?.url,
                    text: 'open in browser',
                },
            ],
        ],
    };

    await sendLarkMessage(larkIds, message);
}
