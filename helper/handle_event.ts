import { EventTypes } from '@/types/types';
import {
    DiscussionCommentEvent,
    DiscussionEvent,
    IssueCommentEvent,
    IssuesEvent,
    PullRequestEvent,
    PullRequestReviewCommentEvent,
    PullRequestReviewEvent,
    PushEvent,
    StarEvent,
} from '@octokit/webhooks-types';
import {
    sendCommentMessage,
    sendDiscussionMessage,
    sendIssueMessage,
    sendPullRequestMessage,
    sendPullRequestReviewMessage,
    sendPushMessage,
    sendStarMessage,
} from './send_message';

export const handleEvent = (eventType: string, raw: EventTypes) => {
    let eventTitle;
    let rawData;
    let ts;

    switch (eventType) {
        case 'discussion_comment':
        case 'issue_comment':
        case 'pull_request_review_comment':
            rawData = raw as DiscussionCommentEvent | IssueCommentEvent | PullRequestReviewCommentEvent;
            eventTitle = rawData?.comment?.body;
            ts = rawData?.comment?.updated_at;
            sendCommentMessage(rawData);
            break;

        case 'discussion':
            rawData = raw as DiscussionEvent;
            eventTitle = rawData?.discussion?.title;
            ts = rawData?.discussion?.updated_at;
            sendDiscussionMessage(rawData);
            break;

        case 'issues':
            rawData = raw as IssuesEvent;
            eventTitle = rawData?.issue?.title;
            ts = rawData?.issue?.updated_at;
            sendIssueMessage(rawData);
            break;

        case 'pull_request':
            rawData = raw as PullRequestEvent;
            eventTitle = rawData?.pull_request?.title;
            ts = rawData?.action === 'closed' ? rawData?.pull_request?.closed_at : rawData?.pull_request?.updated_at;
            sendPullRequestMessage(rawData);
            break;

        case 'pull_request_review':
            rawData = raw as PullRequestReviewEvent;
            eventTitle = rawData?.review?.body;
            ts = rawData?.review?.submitted_at;
            sendPullRequestReviewMessage(rawData);
            break;

        case 'push':
            rawData = raw as PushEvent;
            eventTitle = rawData.head_commit?.message;
            ts = rawData.head_commit?.timestamp;
            sendPushMessage(rawData);
            break;

        case 'star':
            rawData = raw as StarEvent;
            eventTitle = `Star ${rawData?.action}`;
            ts = rawData?.starred_at;
            sendStarMessage(rawData);
            break;

        default:
            break;
    }

    return { eventTitle, ts };
};
