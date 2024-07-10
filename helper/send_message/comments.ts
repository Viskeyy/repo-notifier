import { getLarkIdsFromComment } from '@/utils/get_user_info';
import { sendLarkMessage } from '@/utils/send_lark_message';
import { DiscussionCommentEvent, IssueCommentEvent, PullRequestReviewCommentEvent } from '@octokit/webhooks-types';

export default async function sendCommentMessage(raw: IssueCommentEvent | DiscussionCommentEvent | PullRequestReviewCommentEvent) {
    const larkIds = getLarkIdsFromComment(raw.comment.body);
    const message = {
        title: `${raw.sender.login} $${raw.action} a comment`,
        content: [
            [
                {
                    tag: 'text',
                    text: `@${raw.sender.login}: ${raw.comment.body}`,
                },
            ],
            [
                {
                    tag: 'a',
                    href: raw.comment.html_url,
                    text: 'open in browser',
                },
            ],
        ],
    };

    if ('issue' in raw) {
        message.title = `@${raw.sender.login} ${raw.action} a comment in ${raw.issue.title} (${raw.repository.full_name} issue #${raw.issue.number})`;
    } else if ('discussion' in raw) {
        message.title = `@${raw.sender.login} ${raw.action} a comment in ${raw.discussion.title} (${raw.repository.full_name} discussion #${raw.discussion.number})`;
    } else if ('pull_request' in raw) {
        message.title = `@${raw.sender.login} ${raw.action} a comment in ${raw.pull_request.title} (${raw.repository.full_name} pull request #${raw.pull_request.number})`;
    }

    await sendLarkMessage(larkIds, message);
}
