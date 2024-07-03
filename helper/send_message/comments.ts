import { sendLarkMessage } from '@/utils/send_lark_message';
import { DiscussionCommentEvent, IssueCommentEvent, PullRequestReviewCommentEvent } from '@octokit/webhooks-types';

export default async function commentEvent(raw: IssueCommentEvent | DiscussionCommentEvent | PullRequestReviewCommentEvent) {
    const larkIds = [''];

    const message = {
        title: ``,
        content: [],
    };

    sendLarkMessage(larkIds, message);
}
