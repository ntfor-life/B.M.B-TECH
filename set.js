const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU0g2bDNpK0hYZGoxdzVqVGJuRVFSUXlKazBKZ2l2YU91Q2szcTJ4M1AyMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUnZPWVd4REdBcnZrcmwya1pqMFRoWGNLc0VLdWpBWEJOZDJMWXBJemlRcz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIySmpGTDM2R3JTZlltWFlQQk0zdTBoVWpXK2xMUTg4cGhYTFdoVEg0aUZjPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJnQVk5RlNRK1hrOUNMdEs2VEQ5Y2RlM2xrVVMwSG9mdTVObDhpbU1nb1g4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktETXE3d0UzeTJlYkNXVnhSYWNMdktmSFQvdHVWK2tNUFdIU1dIY21FVUE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Imh1T0o3Nkx5YXhITXlBRmgyZkxsMXkrdlBPOUZRa2VMZ1VIc0I0a2U2Uzg9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUURKZExPb3ArcXVlUCtXMEhSanhiSGllR2ZTdU1zM2owbWFQb3plc0xubz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV2JIaVV0NWpERzBNWS9JZkdocStMZ0VWZ3g4d25DazVsT0FJSjV0ZThDOD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InZKeTg4cUZ0K1Yxd2tBNTRKREJyRUNrUEpYKzBTNWYyN21ENkZTeGxDUmNndDQ5YW0rbVZOR2FLQ0NvaEFPSHlBbXhzZEdlbm45dDVWOHhiNndJL0RnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTkyLCJhZHZTZWNyZXRLZXkiOiJVSWp2N2JWdm5DQjRoenM5bFVBNHNpNUFQRDlqQ1B2c0RvVy9VdnA5SW44PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjE4MjkzNTExNTMxQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjJBRjI0NEFGNEY1NzQ2RDVDNEVCOTc0MUUxRUVGM0RBIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTEzNDUyNTZ9LHsia2V5Ijp7InJlbW90ZUppZCI6IjE4MjkzNTExNTMxQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkNBMDMzQjE4OTdDOTc1RDhCODQxN0QyOTA3QkIzM0UwIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTEzNDUyNTZ9LHsia2V5Ijp7InJlbW90ZUppZCI6IjE4MjkzNTExNTMxQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjdFOEQ2QjMxOUJEMDIwNUIyQUZBNTQwMEIyMjU2NjQwIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTEzNDUyNjF9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6IkJRWkZSOUVEIiwibWUiOnsiaWQiOiIxODI5MzUxMTUzMToyOEBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiLwk4ap8JagnHN1cGVyIHN0YXIg8JagnPCThqog8J2XqfCdl6LwnZec8J2XlyIsImxpZCI6IjYxNDQ0MzU1ODA5MzAxOjI4QGxpZCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTWFUNnRjQ0VOblFqY01HR0FrZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiSzBHWHpQTWZZM1pwak9kbzFoT1ZNdDJBT2pxNVpJVFpzWWVFUTZMQVRTUT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiWTYxMTNndzgvek4xR1BQRHhjNDJtQUU0SGNWS05kbUw1V01ZaHNFeWVaYjVsczcrTnhPTldQQXl5bGdiYk5HM1BXMm9OZUJyaEtxd0szT0lxaFpMQmc9PSIsImRldmljZVNpZ25hdHVyZSI6IlFNYzY4RkZRbGQ2VkxhMk9tVjdhL3hZaTBZbldzbXpDc3RZZUJLak9sM01zcUFPTTUwOXg2Wng3eUZNZDcwck9aZVQ3alpicVBKVUErTWdwME1FUERnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMTgyOTM1MTE1MzE6MjhAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCU3RCbDh6ekgyTjJhWXpuYU5ZVGxUTGRnRG82dVdTRTJiR0hoRU9pd0UwayJ9fV0sInBsYXRmb3JtIjoic21iYSIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0JJSUFnPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzUxMzQ1MjU0LCJsYXN0UHJvcEhhc2giOiJQV2s1QiIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBT2FFIn0=',
    PREFIXE: process.env.PREFIX || "*",
    OWNER_NAME: process.env.OWNER_NAME || "Mr dacheno",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "18293511531",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'B.M.B-TECH',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/hvi870.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '1' ,
    ETAT : process.env.PRESENCE || '',
    ANTICALL : process.env.ANTICALL || 'no',   
    AUTO_BIO : process.env.AUTO_BIO || 'no',               
    DP : process.env.STARTING_BOT_MESSAGE || "no",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'no',
    AUTO_REACT : process.env.AUTO_REACT || 'no',
    AUTO_REACT : process.env.AUTO_REACT || 'no',              
    AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
    AUTO_READ : process.env.AUTO_READ || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

