
# Repo-Notifier

Repo-Notifier is a powerful web application designed to notify you whenever there is a new commit or other events in your repository. It currently supports notifications via Lark.

## Features

Repo-Notifier sends messages through a Lark bot to designated users when events such as `push` occur in a GitHub repository, preventing any miscommunication or overlooked important messages.

### Supported Event Types

Repo-Notifier currently supports the following event types:

- discussion
- discussion_comment
- issue_comment
- issues
- pull_request
- pull_request_review
- pull_request_review_comment
- push
- star

### Supported Event Actions

Repo-Notifier currently supports the following event actions:

- answered
- assigned
- closed
- created
- deleted
- dismissed
- edited
- opened
- reopened
- review_requested
- submitted

### Custom Event Types

In the project's root directory, the `constant/constant.ts` file lists the supported event types in `ACCEPT_EVENT_TYPES`. After adding new event types, corresponding event handling code must be written in the `helper/handle_event.ts` file and new event handling files added in the `helper/send_message` folder. Redeploy the project to activate the new event handling code.

### Custom Event Actions

In the project's root directory, the `constant/constant.ts` file lists the supported event actions in `ACCEPT_EVENT_ACTIONS`. To handle specific event actions, refer to the `helper/send_message/issues.ts` file for coding guidelines, and redeploy the project upon completion.

## Prerequisites

1. Create a Lark bot, as all notifications are sent through this bot. Create it on the [Lark Open Platform](https://open.feishu.cn/app). After creation, obtain the bot's `AppID` and `AppSecret` for requesting the `tenant_access_token` to fetch Lark user information and send notifications.
2. Configure bot permissions by referring to [Request API Permissions](https://open.feishu.cn/document/server-docs/application-scope/introduction), [Batch Send Messages](https://open.feishu.cn/document/server-docs/im-v1/batch_message/send-messages-in-batches), and [Batch Get User Information](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/user/batch) to set up corresponding permissions.
3. Fetch Lark user information:
   1. Obtain the bot's `tenant_access_token` by referring to [Obtain Tenant Access Token for Internal Applications](https://open.feishu.cn/document/server-docs/authentication-management/access-token/tenant_access_token_internal).
   2. Obtain the department ID by referring to [Search Departments](https://open.feishu.cn/document/server-docs/contact-v3/department/search).
   3. Obtain the list of users directly under a department by referring to [Get Department Users](https://open.feishu.cn/document/server-docs/contact-v3/user/find_by_department).
   4. Save the `user_id` field from user information and map it to the `githubId`. Write it into the `mapping.json` file in the project root directory as follows:

      ```json
      [
        {
          "githubId": "A_githubId",
          "larkId": "A_user_id"
        },
        {
          "githubId": "B_githubId",
          "larkId": "B_user_id"
        }
      ]
      ```

4. After writing `mapping.json`, deploy the project and configure the bot's `AppID` and `AppSecret` in the environment variables:

    ```env
    LARK_BOT_APP_ID=
    LARK_BOT_APP_SECRET=
    ```

5. Fill in the webhook URL in GitHub. After deploying the project, get the project domain name. `https://<your_domain>/api/handle-webhook` is the webhook URL for the GitHub repository, which should be filled in the webhook configuration in the GitHub repository.
![configure-webhook](https://cdn.jsdelivr.net/gh/Viskeyy/uPic@master/uPic/0710-2u6eD1.jpg)

6. After filling in the webhook in the GitHub repository, try performing some operations on the repository to see if notifications are received correctly.
