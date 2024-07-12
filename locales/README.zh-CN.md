# Repo-Notifier

Repo-Notifier 是一个 web 应用，它可以帮助您在仓库有新提交（或其他事件）触发时发送通知，将事件内容发送给指定用户，暂时只支持发送飞书通知。

## 功能

当 GitHub 仓库触发 `push` 等其他事件时，Repo-Notifier 会通过飞书机器人向指定的飞书用户发送消息，从而避免因沟通不及时或遗漏重要消息引起的问题。

### 支持的事件类型

目前 Repo-Notifier 支持以下事件类型：

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

目前 Repo-Notifier 支持以下事件动作：

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

在根目录下的 `constant/constant.ts` 文件中, `ACCEPT_EVENT_TYPES` 表示 Repo-Notifier 支持的事件类型。在添加完新的事件类型后，还需要编写对应的事件处理代码。在 `helper/handle_event.ts` 文件中，添加判断，并在 `helper/send_message` 文件夹参考其他文件新增新事件的处理文件。编写完成后需要重新部署，
以使新的事件处理代码生效。

### 自定义事件动作

在根目录下的 `constant/constant.ts` 文件中，`ACCEPT_EVENT_ACTIONS` 表示 Repo-Notifier 支持的事件动作。如需要单独处理事件的特定动作，可以参考 `helper/send_message/issues.ts` 文件编写代码。编写完成后同样需要重新部署项目。

## 前置需求

1. 首先需要创建一个飞书机器人，所有通知都是通过这个机器人进行发送的。可以在[飞书开放平台](https://open.feishu.cn/app)进行创建。创建完成后需要机器人的 `AppID` 和 `AppSecret`，用于请求 `tenant_access_token` 以获取飞书用户信息和发送通知。
2. 配置机器人权限。要想使机器人发送消息，还需要配置机器人的权限。参考[申请 API 权限](https://open.feishu.cn/document/server-docs/application-scope/introduction)以及[批量发送消息](https://open.feishu.cn/document/server-docs/im-v1/batch_message/send-messages-in-batches)和[批量获取用户信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/user/batch)配置对应的权限。
3. 获取飞书用户信息。在配置完权限后，可以通过 HTTP 请求获取到用户的 `user_id`，用于发送消息。参考[获取部门直属用户列表](https://open.feishu.cn/document/server-docs/contact-v3/user/find_by_department)获得指定部门下的所有用户的 `user_id`。详细步骤为：
    1. 获取机器人的 `tenant_access_token`，也可通过其他 HTTP 请求工具获取，参考[自建应用获取 accessToken](https://open.feishu.cn/document/server-docs/authentication-management/access-token/tenant_access_token_internal)

    2. 获取部门 id，参考[搜索部门](https://open.feishu.cn/document/server-docs/contact-v3/department/search)获取部门 id。
    3. 获取直属部门用户列表，参考[获取部门直属用户列表](https://open.feishu.cn/document/server-docs/contact-v3/user/find_by_department)发送 HTTP 请求获取用户信息。
    4. 保存用户信息中的 `user_id` 字段，并与用户的 `githubId` 进行映射，并按照下面的格式写入项目根目录下的 `mapping.json` 文件中（`larkId` 表示飞书用户的 `user_id`，`githubId` 表示对应的用户的 GitHub username）。

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

4. 完成 `mapping.json` 的编写后，就可以部署项目。需要在项目的环境变量中配置机器人的 `AppID` 和 `AppSecret`：

    ```env
    LARK_BOT_APP_ID=
    LARK_BOT_APP_SECRET=
    ``

5. 在 GitHub 中填写 webhook 接收地址。在完成部署后，可以获取到项目域名，`https://<your_domain>/api/handle-webhook` 即为 GitHub 仓库的 webhook 接收地址，填写到 GitHub 仓库的 webhook 配置中即可。
![configure-webhook](https://cdn.jsdelivr.net/gh/Viskeyy/uPic@master/uPic/0710-2u6eD1.jpg)
