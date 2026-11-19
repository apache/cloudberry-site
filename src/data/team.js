// Single source of truth for the Team page (src/pages/team/index.md).
//
// Both the PPMC / committer tables and the Core Contributors avatar wall are
// rendered from these lists, so add, remove or update a person here only.
// `github` is the GitHub login; the avatar is loaded from
// https://avatars.githubusercontent.com/<github>.

export const ppmcMembers = [
  { name: "Andrey Borodin", email: "x4m@apache.org", github: "x4m", organization: "Yandex Cloud" },
  { name: "Antonio Petrole", email: "apetrole@apache.org", github: "antoniopetrole", organization: "Individual" },
  { name: "Dianjin Wang", email: "djwang@apache.org", github: "tuhaihe", organization: "HashData" },
  { name: "Ed Espino", email: "espino@apache.org", github: "edespino", organization: "Apache Member, Synx Data Labs" },
  { name: "Greg Spiegelberg", email: "gspiegelberg@apache.org", github: "gspiegelberg", organization: "EDB" },
  { name: "Hao Wu", email: "gfphoenix78@apache.org", github: "gfphoenix78", organization: "HashData" },
  { name: "Hope Gao", email: "gaoxueyu@apache.org", github: "gaoxueyu", organization: "HighGo" },
  { name: "Jianghua Yang", email: "yjhjstz@apache.org", github: "yjhjstz", organization: "HashData" },
  { name: "Jiaqi Zhou", email: "jiaqizho@apache.org", github: "jiaqizho", organization: "Zilliz" },
  { name: "Jinbao Chen", email: "chenjinbao1989@apache.org", github: "chenjinbao1989", organization: "HashData" },
  { name: "Kirill Reshke", email: "reshke@apache.org", github: "reshke", organization: "Yandex Cloud" },
  { name: "Kent Yao", email: "yao@apache.org", github: "yaooqinn", organization: "Apache Member, Microsoft", mentor: true },
  { name: "Louis Mugnano", email: "lmugnano@apache.org", github: "lmugnano4537", organization: "Individual" },
  { name: "Max Yang", email: "maxyang@apache.org", github: "my-ship-it", organization: "HashData" },
  { name: "Maxim Smyatkin", email: "smyatkin@apache.org", github: "Smyatkin-Maxim", organization: "Yandex Cloud" },
  { name: "Roman Shaposhnik", email: "rvs@apache.org", github: "rvs", organization: "Ainekko", mentor: true },
  { name: "Sen Hu", email: "senhu@apache.org", github: "HuSen8891", organization: "Individual" },
  { name: "Shine Zhang", email: "zhang75033us@apache.org", github: "xinzweb", organization: "Synx Data Labs" },
  { name: "Tushar Pednekar", email: "tushar_pednekar@apache.org", github: "2shar-p", organization: "Synx Data Labs" },
  { name: "Weinan WANG", email: "wangwn@apache.org", github: "weinan003", organization: "Individual" },
  { name: "Willem Jiang", email: "ningjiang@apache.org", github: "WillemJiang", organization: "Apache Member, ByteDance", mentor: true },
  { name: "Xiaoran Wang", email: "fanfuxiaoran@apache.org", github: "fanfuxiaoran", organization: "ByteDance" },
  { name: "Xin (Alwin) Tang", email: "alwintang@apache.org", github: "xtangcode", organization: "Synx Data Labs" },
  { name: "Zhang Mingli", email: "avamingli@apache.org", github: "avamingli", organization: "EDB" },
  { name: "Leonid Borchuk", email: "leborchuk@apache.org", github: "leborchuk", organization: "Yandex Cloud" },
];

// New committers who are not (yet) PPMC members.
export const committers = [
  { name: "Xiong Tong", email: "tomshawn@apache.org", github: "TomShawn", organization: "HashData" },
  { name: "Wenchao Zhang", email: "zhangwenchao@apache.org", github: "zhangwenchao-123", organization: "VexDB" },
  { name: "Xun Gong", email: "gongxun@apache.org", github: "gongxun0928", organization: "Kwai" },
  { name: "Rose Duan", email: "roseduan@apache.org", github: "roseduan", organization: "HashData" },
  { name: "Xiaoyu Liu", email: "liuxiaoyu@apache.org", github: "MisterRaindrop", organization: "HashData" },
  { name: "Nikolay Antonov", email: "ostinru@apache.org", github: "ostinru", organization: "Yandex Cloud" },
  { name: "Robert Mu", email: "robertmu@apache.org", github: "robertmu", organization: "Individual" },
  { name: "Anton Kurochkin", email: "woblerr@apache.org", github: "woblerr", organization: "Individual" },
  { name: "Liu Shengsong", email: "liushengsong@apache.org", github: "lss602726449", organization: "HashData" },
  { name: "Alena Rybakina", email: "alenarybakina@apache.org", github: "Alena0704", organization: "Yandex Cloud" },
];
