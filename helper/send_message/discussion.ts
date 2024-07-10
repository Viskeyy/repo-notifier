import { getAllLarkIds } from '@/utils/get_user_info';
import { sendLarkMessage } from '@/utils/send_lark_message';
import { DiscussionEvent } from '@octokit/webhooks-types';

export default async function sendDiscussionMessage(raw: DiscussionEvent) {
    const larkIds = getAllLarkIds();
    const message = {
        title: `@${raw.sender.login} ${raw.action} a discussion in ${raw.repository.full_name} (discussion #${raw.discussion.number})`,
        content: [
            [
                {
                    tag: 'text',
                    text: `Discussion: ${raw.discussion.title}`,
                },
            ],
            [
                {
                    tag: 'a',
                    href: raw.discussion.html_url,
                    text: 'open in browser',
                },
            ],
        ],
    };

    await sendLarkMessage(larkIds, message);
}
