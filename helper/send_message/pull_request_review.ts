import { sendLarkMessage } from '@/utils/send_lark_message';
import { PullRequestReviewEvent } from '@octokit/webhooks-types';

export default async function sendPullRequestReviewMessage(raw: PullRequestReviewEvent) {
    const larkIds = [raw.pull_request.user.login];
    const message = {
        title: `@${raw.sender.login} ${raw.action} you a pull request in ${raw.repository.full_name} (#${raw.pull_request.number})`,
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
                    href: raw.review.html_url,
                    text: 'open in browser',
                },
            ],
        ],
    };

    await sendLarkMessage(larkIds, message);
}
