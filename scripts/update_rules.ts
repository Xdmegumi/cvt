const rulesets = [
['https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/LocalAreaNetwork.list', '🎯 全球直连'],
['https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/UnBan.list', '🎯 全球直连'],
['https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/BanAD.list', '🛑 广告拦截'],
['https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/BanProgramAD.list', '🍃 应用净化'],
['https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/GoogleFCM.list', '📢 谷歌FCM'],
['https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/GoogleCN.list', '🎯 全球直连'],
['https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/SteamCN.list', '🎯 全球直连'],
['https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/OneDrive.list', 'Ⓜ️ 微软云盘'],
['https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Microsoft.list', 'Ⓜ️ 微软服务'],
['https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Apple.list', '🍎 苹果服务'],
['https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Telegram.list', '📲 电报消息'],
['https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/OpenAi.list', '💬 OpenAi'],
['https://raw.githubusercontent.com/Xdmegumi/My-depository/master/Poe.list', '💬 OpenAi'],
['https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Epic.list', '🎮 游戏平台'],
['https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Origin.list', '🎮 游戏平台'],
['https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Sony.list', '🎮 游戏平台'],
['https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Steam.list', '🎮 Steam平台'],
['https://raw.githubusercontent.com/Xdmegumi/My-depository/refs/heads/master/Cygames.list', '🎮 傻逼西歪'],
['https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Nintendo.list', '🎮 游戏平台'],
['https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/YouTube.list', '📹 油管视频'],
['https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Netflix.list', '🎥 奈飞视频'],
['https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Bahamut.list', '📺 巴哈姆特'],
['https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/BilibiliHMT.list', '📺 哔哩哔哩'],
['https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Bilibili.list', '📺 哔哩哔哩'],
['https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/ChinaMedia.list', '🌏 国内媒体'],
['https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/ProxyMedia.list', '🌍 国外媒体'],
['https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/ProxyGFWlist.list', '🚀 节点选择'],
['https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/ChinaIp.list', '🎯 全球直连'],
['https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/ChinaDomain.list', '🎯 全球直连'],
['https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/ChinaCompanyIp.list', '🎯 全球直连'],
['https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Download.list', '🎯 全球直连'],
['https://raw.githubusercontent.com/Xdmegumi/My-depository/master/Learning.list', '🎯 全球直连']
]

const supported_types = new Set([
  'DOMAIN',
  'DOMAIN-SUFFIX',
  'DOMAIN-KEYWORD',
  'GEOSITE',
  'IP-CIDR',
  'IP-CIDR6',
  'IP-SUFFIX',
  'IP-ASN',
  'GEOIP',
])

Deno.writeTextFileSync(
  'netlify/edge-functions/main/rules.ts',
  `export const RULES = \`rules:
${
    (await Promise.all(rulesets.map(async ([url, name]) =>
      (await (await fetch(url)).text())
        .match(/^[^#\s].*/mg)
        ?.map((x) => x.split(','))
        .filter((x) => supported_types.has(x[0]))
        .map((x) => {
          x.splice(2, 0, name)
          return '- ' + x.join(',')
        }) ?? []
    ))).flat().join('\n')
  }
- GEOIP,CN,🛩️ ‍墙内
- MATCH,🌐 ‍未知站点
\``,
)
