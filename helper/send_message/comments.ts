import { getGithubIdsFromComment } from '@/utils/get_user_info';
import { sendLarkMessage } from '@/utils/send_lark_message';
import { DiscussionCommentEvent, IssueCommentEvent, PullRequestReviewCommentEvent } from '@octokit/webhooks-types';

export default async function commentEvent(raw: IssueCommentEvent | DiscussionCommentEvent | PullRequestReviewCommentEvent) {
    const larkIds = getGithubIdsFromComment(raw.comment.body);

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
        message.title = `@${raw.sender.login} ${raw.action} a comment in ${raw.issue.title} (issue #${raw.issue.number})`;
    } else if ('discussion' in raw) {
        message.title = `@${raw.sender.login} ${raw.action} a comment in ${raw.discussion.title} (discussion #${raw.discussion.number})`;
    } else if ('pull_request' in raw) {
        message.title = `@${raw.sender.login} ${raw.action} a comment in ${raw.pull_request.title} (pull request #${raw.pull_request.number})`;
    }

    await sendLarkMessage(larkIds, message);
}
