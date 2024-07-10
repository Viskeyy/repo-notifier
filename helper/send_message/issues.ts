import { getAllLarkIds } from '@/utils/get_user_info';
import { sendLarkMessage } from '@/utils/send_lark_message';
import { IssuesEvent } from '@octokit/webhooks-types';

export default async function sendIssueMessage(raw: IssuesEvent) {
    let larkIds = getAllLarkIds();
    const message = {
        title: `@${raw.sender.login} ${raw.action} an issue in ${raw.repository.full_name} (issue #${raw.issue.number})`,
        content: [
            [
                {
                    tag: 'text',
                    text: `@${raw.sender.login}: ${raw.issue.title}`,
                },
            ],
            [
                {
                    tag: 'a',
                    href: raw.issue.html_url,
                    text: 'open in browser',
                },
            ],
        ],
    };

    if (raw.action === 'assigned') {
        message.title = `@${raw.sender.login} assigned you to an issue in ${raw.repository.full_name} (issue #${raw.issue.number})`;
        larkIds = larkIds.filter((id) => id !== raw?.assignee?.login);
    }

    await sendLarkMessage(larkIds, message);
}
