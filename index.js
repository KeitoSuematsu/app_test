const modal = require("./modals");
require("dotenv").config();
const sskModal = modal(
  process.env.SSK_SLACK_BOT_TOKEN,
  process.env.SSK_SLACK_SIGNING_SECRET,
  60373,
  "SSK_minutes",
  "SSK"
);
const eveModal = modal(
  process.env.EVE_SLACK_BOT_TOKEN, //BOT_TOKEN
  process.env.EVE_SLACK_SIGNING_SECRET, //SIGNING_SECRET
  60573, //port
  "EVE_minutes", //callbackID
  "EVE" //担当名の配列
);
const prModal = modal(
  process.env.PR_SLACK_BOT_TOKEN,
  process.env.PR_SLACK_SIGNING_SECRET,
  60673,
  "PR_minutes",
  "PR"
);
const goshModal = modal(
  process.env.GOSH_SLACK_BOT_TOKEN,
  process.env.GOSH_SLACK_SIGNING_SECRET,
  61173,
  "GOSH_minutes",
  "GOSH"
);
const sysModal = modal(
  process.env.SYS_SLACK_BOT_TOKEN,
  process.env.SYS_SLACK_SIGNING_SECRET,
  60973,
  "SYS_minutes",
  "SYS"
);
// const jimModal = modal(
//   process.env.JIM_SLACK_BOT_TOKEN,
//   process.env.JIM_SLACK_SIGNING_SECRET,
//   60473,
//   "JIM_minutes",
//   "JIM"
// );
// const zaiModal = modal(
//   process.env.ZAI_SLACK_BOT_TOKEN,
//   process.env.ZAI_SLACK_SIGNING_SECRET,
//   60573,
//   "ZAI_minutes",
//   "ZAI"
// );
// const somModal = modal(
//   process.env.SOM_SLACK_BOT_TOKEN,
//   process.env.SOM_SLACK_SIGNING_SECRET,
//   60373,
//   "SOM_minutes",
//   "SOM"
// );
// const ntModal = modal(
//   process.env.NT_SLACK_BOT_TOKEN,
//   process.env.NT_SLACK_SIGNING_SECRET,
//   60673,
//   "NT_minutes",
//   "NT"
// );
// const ecoModal = modal(
//   process.env.ECO_SLACK_BOT_TOKEN,
//   process.env.ECO_SLACK_SIGNING_SECRET,
//   60773,
//   "ECO_minutes",
//   "ECO"
// );
const testModal = modal(
  process.env.SLACK_BOT_TOKEN,
  process.env.SLACK_SIGNING_SECRET,
  61073,
  "minutes",
  "TEST"
);