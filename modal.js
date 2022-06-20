const { App } = require("@slack/bolt");
const axiosBase = require("axios");
const incharges = require("./roles.json");
require("dotenv").config();
const modal = (token, signing, port, call, incharge) => {
  const app = new App({
    token: token,
    signingSecret: signing,
  });
  app.shortcut(call, async ({ ack, body, context }) => {
    // グローバルショートカットリクエストの確認
    await ack();
    try {
      const ary = incharges[incharge];
      const todays = new Date();
      const today =
        todays.getFullYear() +
        "-" +
        `${todays.getMonth() + 1}` +
        "-" +
        todays.getDate();
      let pulldown = [];
      for (i = 0; i < ary.length; i++) {
        let kari = {
          text: {
            type: "plain_text",
            text: ary[i],
            emoji: true,
          },
          value: ary[i],
        };
        pulldown.push(kari);
      }
      // 組み込みの WebClient を使って views.open API メソッドを呼び出す
      const result = await app.client.views.open({
        // `context` オブジェクトに保持されたトークンを使用
        token: context.botToken,
        trigger_id: body.trigger_id,
        view: {
          type: "modal",
          callback_id: "createRec",
          title: {
            type: "plain_text",
            text: "議事録作成",
            emoji: true,
          },
          submit: {
            type: "plain_text",
            text: "作成する",
            emoji: true,
          },
          close: {
            type: "plain_text",
            text: "閉じる",
            emoji: true,
          },
          blocks: [
            {
              type: "section",
              text: {
                type: "mrkdwn",
                text: "議事録を作成します。日時と担当名を選んでください。",
              },
            },
            {
              type: "divider",
            },
            {
              type: "input",
              block_id: "incharge",
              element: {
                type: "static_select",
                placeholder: {
                  type: "plain_text",
                  text: "Select an item",
                  emoji: true,
                },
                options: pulldown,
                action_id: "selectIncharge",
              },
              label: {
                type: "plain_text",
                text: "担当名",
                emoji: true,
              },
            },
            {
              type: "input",
              block_id: "date",
              element: {
                type: "datepicker",
                initial_date: today, //今日にしてもいいかも
                placeholder: {
                  type: "plain_text",
                  text: "Select a date",
                  emoji: true,
                },
                action_id: "selectDate",
              },
              label: {
                type: "plain_text",
                text: "mtgする日を選ぶ",
                emoji: true,
              },
            },
            {
              type: "input",
              block_id: "startTime",
              element: {
                type: "timepicker",
                initial_time: "21:00",
                placeholder: {
                  type: "plain_text",
                  text: "Select time",
                  emoji: true,
                },
                action_id: "selectTime",
              },
              label: {
                type: "plain_text",
                text: "開始時刻を選ぶ",
                emoji: true,
              },
            },
            {
              type: "input",
              block_id: "place",
              element: {
                type: "static_select",
                placeholder: {
                  type: "plain_text",
                  text: "Select an item",
                  emoji: true,
                },
                options: [
                  {
                    text: {
                      type: "plain_text",
                      text: "キャンロビ",
                      emoji: true,
                    },
                    value: "キャンロビ",
                  },
                  {
                    text: {
                      type: "plain_text",
                      text: "A103",
                      emoji: true,
                    },
                    value: "A103",
                  },
                  {
                    text: {
                      type: "plain_text",
                      text: "Zoom",
                      emoji: true,
                    },
                    value: "Zoom",
                  },
                ],
                action_id: "selectPlace",
              },
              label: {
                type: "plain_text",
                text: "場所を選ぶ",
                emoji: true,
              },
            },
          ],
        },
      });
    } catch (error) {
      console.error(error);
    }
  });

  // モーダルでのデータ送信イベントを処理します
  app.view("createRec", async ({ ack, body, view, client }) => {
    // モーダルでのデータ送信イベントを確認
    await ack();
    const data = view.state.values;
    const user = body.user.id;
    const incharge = data.incharge.selectIncharge.selected_option.value;
    const date = data.date.selectDate.selected_date;
    const startTime = data.startTime.selectTime.selected_time;
    const place = data.place.selectPlace.selected_option.value;
    const postData = {
      incharge: incharge,
      date: date,
      startTime: startTime,
      place: place,
    }; // 送信するデータ
    const axios = axiosBase.create({
      // baseURL: "https://script.google.com", // gas以外の場合はそれぞれ書き換え
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
      responseType: "json",
    });
    // ユーザーに対して送信するメッセージ
    let msg = `${date} の${incharge}のmtgの議事録を作るよ。けろけろ。`;

    // ユーザーにメッセージを送信
    try {
      await client.chat
        .postMessage({
          channel: user,
          text: msg,
        })
        .then(
          axios.post(
            "https://script.google.com/macros/s/AKfycbxhV1SrJYepb3D8HuE5BhvASPrTaCx_SLZh6WIL9DyFJH2kOFNAy-41fZ7vOSac0C0_/exec",
            postData
          )
        );
    } catch (error) {
      console.error(error);
    }
  });
  (async () => {
    // Start your app
    await app.start(process.env.PORT || port);

    console.log("⚡️ Bolt app is running!");
  })();
};
module.exports = modal;