const fs = require("fs");
require("dotenv").config();

let config = {
    prefix: process.env.PREFIX || ".",
    ownerName: process.env.OWNER_NAME || "𝑻𝒐𝒙𝒙𝒊𝒄-𝑺𝒂𝒏",
    ownerNumber: process.env.OWNER_NUMBER || "2347042081220",
    mode: process.env.MODE || "private",
    region: process.env.REGION || "Nigeria",
    botName: process.env.BOT_NAME || "𝐑𝐢𝐚𝐬 𝐆𝐫𝐞𝐦𝐨𝐫𝐲",
    exifPack: process.env.EXIF_PACK || "𝐑𝐢𝐚𝐬 𝐆𝐫𝐞𝐦𝐨𝐫𝐲",
    exifAuthor: process.env.EXIF_AUTHOR || "𝑴𝒂𝒅𝒆 𝑩𝒚 𝑻𝒐𝒙𝒙𝒊𝒄",
    timeZone: process.env.TIME_ZONE || "Africa/Lagos",
    presenceStatus: process.env.PRESENCE_STATUS || "unavailable",
    autoRead: process.env.AUTO_READ?.toLowerCase() === "true" || false,
    autoViewStatus: process.env.AUTO_VIEW_STATUS?.toLowerCase() === "true" || false,
    autoReact: process.env.AUTO_REACT?.toLowerCase() === "true" || false,
    sessionId: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTUk2YzRJTFBKWjNiMldDOTd4QkRraWVJbk1aM09mamh3TWprNmFremltWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS3FrNlZPaGNGTGtqVHBqVzB6aER6ZmViN3IvWkptOGtkazhPTHJtSHZqTT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrSlFySlNqK1RiNERjaEM2TGpvN21LTSszdWl1U3dtS0YySHVPZVpuRW5jPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ1VzM3UC92NEhWZXEzRW9HYWRsR1p4T04xYkJTZjZkSmRWT2RIR1M3VjIwPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IitQNU00UkJZTVB6MkFCMUxuTUNRbFFyc3RpVS8zeCtiUmY5Ujk1d3c3MVk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlluRGVZTldad3dpSHlvTkdzcEJuUnd6cnJjeEg4UE4wSzRhSTZWMWVhU1k9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0NhRFdQRnpKK1haN2RnSk8xcFZSY3BUbDJGSzdaU3g5RkVGSFlDVXRtTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidXRpT2N1ZDdGTTdwWlRER0Q1RUxxSXFBa0x4d2RMdFhpbk5tRFBSb1Mzcz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InlwTndKS3pFbUZlc1Zwa3hPV2hRMms3UWQzdWZUWGR0WnEyLytRUXFSZXVSZmc4S1FSQWVDZHJ4TzZYNmV3MlNSUmtlbXFJZFFnOTJFb3RIc0w3MkNBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NTEsImFkdlNlY3JldEtleSI6IlZOcEJzVWRac0lMeHdWdDg4cjhSMmVOdGd3bEhLN01uK0g3aFNxOTVwUlk9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6IjhSTEU2TTNEIiwibWUiOnsiaWQiOiIyMzQ3MDQxOTUyNzExOjEyQHMud2hhdHNhcHAubmV0IiwibmFtZSI6IuC8kvCTg7Vkw6DDscOvw6tsIMOcw6dow69ow6Xwk4O14LySIiwibGlkIjoiMTk4Mjk0OTk5NDYxOTMyOjEyQGxpZCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDS09JNTljRUVNbktzc0FHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoidjhWRVBQTi9sZ25SOS9OeUVvSEtQclVWYml6WDBNb01wRW5wNTkzK3dRaz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiSDdVS2QzT0gvY2d2WU5FSzJRYWp6N0xYS0ZHSkJDWUlwSWdKTnl2eEVVdVhma3h4aFFuSDJTYllkRVBZUnh4dEdRakVLNFd5V2lRZGRyY2p3bzlWQXc9PSIsImRldmljZVNpZ25hdHVyZSI6InE0T1dnOHZ6L3VuZXcxK2tuUHl1V0V4cVFyRGFYRmV2dW1LWG93MmFUNzl1OEdObjAzTVJRU1N2bWMvTDI0TEo0ZDNvb3VQamt3OWFIYzZwandBNkFnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjM0NzA0MTk1MjcxMToxMkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJiL0ZSRHp6ZjVZSjBmZnpjaEtCeWo2MUZXNHMxOURLREtSSjZlZmQvc0VKIn19XSwicGxhdGZvcm0iOiJzbWJhIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQUlJQlE9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDU2NTkyMjIsImxhc3RQcm9wSGFzaCI6IjJHNEFtdSIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBSzhMIn0=",
    autoRejectEnabled: process.env.AUTO_REJECT_ENABLED?.toLowerCase() === "true" || false,
    antiDelete: process.env.ANTIDELETE?.toLowerCase() === "true" || false,
    sessionSite: process.env.SESSION_SITE || 'https://session-toxxictech.zone.id/', 
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(`🔥 Update detected in '${__filename}', reloading Rias Gremory's config...`);
    delete require.cache[file];
    config = require(file);
});

module.exports = config;
