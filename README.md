# NFT Role Verification Discord Bot

---

### 1. **Clone the Project and Install Dependencies**
```bash
npm install
```

### 2. **Create a Discord Bot**
1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Click **"New Application"** and name it
3. Go to the **"Bot"** tab → **"Add Bot"**
4. Enable intents:
    - ✅ Server Members Intent
    - ✅ Message Content Intent

### 3. **Configure Your .env File**
Create a `.env` file in your project root:
```env
BOT_TOKEN=your_discord_bot_token
CLIENT_ID=your_discord_application_id
GUILD_ID=your_server_id
```
- **BOT_TOKEN**: from the Bot tab
- **CLIENT_ID**: from General Information → Application ID
- **GUILD_ID**: right-click server icon → Copy Server ID *(Developer Mode must be on)*

### 4. **Invite the Bot to Your Server**
Use this URL:
```
https://discord.com/oauth2/authorize?client_id=YOUR_CLIENT_ID&scope=bot%20applications.commands&permissions=268504080
```
Replace `YOUR_CLIENT_ID` with your actual client ID.

### 5. **Register Slash Commands**
```bash
npx ts-node src/register-commands.ts
```
If successful:
```
✅ Slash commands registered successfully
```

### 6. **Prepare Roles in Discord**
Create the following roles:

Current mocked roles:
- `VIP`
- `OG`

Make sure your bot's role is **above** these in the role hierarchy.

### 7. **Create channels for roles**
add role-appropriate permissions for channels  


### 8. **Set Up a Verification Channel**
1. Create a channel named `#verify`
2. Permissions:
    - `@everyone`: ✅ View Channel / ✅ Send Messages
    - `VIP` and `OG`: ❌ View Channel (hide after verification)
3. Move the channel to the top of the channel list.

### 9. **Run the Bot**
```bash
npx ts-node src/index.ts
```
Expected output:
```
🤖 Bot is ready as YourBotName
```

### 10. **Test It!**
Type `/verify` in `#verify` and provide a wallet address.
The bot will:
- Simulate an NFT API check
- Assign roles based on results
- Remove roles if NFTs are no longer owned

---
