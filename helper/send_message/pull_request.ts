import { getAllLarkIds, getLarkIdsFromGithubIds } from '@/utils/get_user_info';
import { sendLarkMessage } from '@/utils/send_lark_message';
import { PullRequestEvent } from '@octokit/webhooks-types';

export default async function sendPullRequestMessage(raw: PullRequestEvent) {
    let larkIds = getAllLarkIds();
    const message = {
        title: `@${raw.sender.login} ${raw.action} a pull request in ${raw.repository.full_name} (#${raw.pull_request.number})`,
        content: [
            [
                {
                    tag: 'text',
                    text: `pull request: ${raw.pull_request.title}`,
                },
            ],
            [
                {
                    tag: 'a',
                    href: raw.pull_request.html_url,
                    text: 'open in browser',
                },
            ],
        ],
    };

    if (raw.action === 'assigned') {
        message.title = `@${raw.sender.login} assigned you a pull request in ${raw.repository.full_name} (#${raw.pull_request.number})`;
        larkIds = getLarkIdsFromGithubIds([raw.assignee.login]);
    }

    if (raw.action === 'review_requested') {
        message.title = `@${raw.sender.login} requested your review for a pull request in ${raw.repository.full_name} (#${raw.pull_request.number})`;
        larkIds = getLarkIdsFromGithubIds(raw.pull_request.requested_reviewers.map((item) => (item as any)?.login));
    }

    await sendLarkMessage(larkIds, message);
}
