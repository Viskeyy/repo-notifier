# Repo-Notifier

Repo-Notifier 是一个功能强大的 Web 应用程序，当您的 GitHub 仓库发生新提交或其他事件时，会通过飞书通知相关用户，确保您不会错过任何重要信息。当前仅支持飞书通知。

## 功能

Repo-Notifier 可在 GitHub 仓库发生 `push` 等事件时，通过飞书机器人向指定用户发送消息，避免因沟通不及时或遗漏重要信息带来的问题。

### 支持的事件类型

目前，Repo-Notifier 支持以下事件类型：

* discussion
* discussion_comment
* issue_comment
* issues
* pull_request
* pull_request_review
* pull_request_review_comment
* push
* star

### 支持的事件动作

目前，Repo-Notifier 支持以下事件动作：

* answered
* assigned
* closed
* created
* deleted
* dismissed
* edited
* opened
* reopened
* review_requested
* submitted

### 自定义事件类型

在项目根目录的 `constant/constant.ts` 文件中，`ACCEPT_EVENT_TYPES` 列出了 Repo-Notifier 支持的事件类型。添加新事件类型后，需要在 `helper/handle_event.ts` 文件中编写相应的事件处理代码，并在 `helper/send_message` 目录下新增事件处理文件。完成后重新部署项目以使新的事件处理代码生效。

### 自定义事件动作

在项目根目录的 `constant/constant.ts` 文件中，`ACCEPT_EVENT_ACTIONS` 列出了 Repo-Notifier 支持的事件动作。如果需要单独处理事件的特定动作，可以参考 `helper/send_message/issues.ts` 文件编写代码，完成后重新部署项目。

## 前置需求

1. 创建飞书机器人，所有通知均通过该机器人发送。可在 [飞书开放平台](https://open.feishu.cn/app) 创建。创建完成后获取机器人的 `AppID` 和 `AppSecret`，用于请求 `tenant_access_token` 获取飞书用户信息和发送通知。
2. 配置机器人权限，参考 [申请 API 权限](https://open.feishu.cn/document/server-docs/application-scope/introduction)、[批量发送消息](https://open.feishu.cn/document/server-docs/im-v1/batch_message/send-messages-in-batches) 和 [批量获取用户信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/user/batch) 配置相应权限。
3. 获取飞书用户信息：
   1. 获取机器人的 `tenant_access_token`，参考 [自建应用获取 accessToken](https://open.feishu.cn/document/server-docs/authentication-management/access-token/tenant_access_token_internal)。
   2. 获取部门 ID，参考 [搜索部门](https://open.feishu.cn/document/server-docs/contact-v3/department/search)。
   3. 获取部门直属用户列表，参考 [获取部门直属用户列表](https://open.feishu.cn/document/server-docs/contact-v3/user/find_by_department)。
   4. 保存用户信息中的 `user_id` 字段，并与用户的 `githubId` 映射，按以下格式写入项目根目录的 `mapping.json` 文件：

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

4. 完成 `mapping.json` 的编写后，部署项目，并在环境变量中配置机器人的 `AppID` 和 `AppSecret`：

    ```env
    LARK_BOT_APP_ID=
    LARK_BOT_APP_SECRET=
    ```

5. 在 GitHub 中填写 webhook 接收地址。在完成部署后，可以获取项目域名，`https://<your_domain>/api/handle-webhook` 即为 GitHub 仓库的 webhook 接收地址，填写到 GitHub 仓库的 webhook 配置中即可。
![configure-webhook](https://cdn.jsdelivr.net/gh/Viskeyy/uPic@master/uPic/0710-2u6eD1.jpg)

6. 在 GitHub 仓库中填写 webhook 后，可以尝试对该仓库进行一些操作，以查看是否能正常接收通知。
