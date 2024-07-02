import {
    CommitCommentEvent,
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

export type EventTypes =
    | CommitCommentEvent
    | DiscussionCommentEvent
    | DiscussionEvent
    | IssueCommentEvent
    | IssuesEvent
    | PullRequestEvent
    | PullRequestReviewCommentEvent
    | PullRequestReviewEvent
    | PushEvent
    | StarEvent;
