# 📰 News Blog Automation Project

An automated news scraping and blog generation system that extracts content from news websites, processes it with AI, and creates beautifully formatted daily news digests with a responsive web interface.

![News Blog Screenshot](https://img.shields.io/badge/Status-Active-brightgreen) ![Node.js](https://img.shields.io/badge/Node.js-18+-green) ![Python](https://img.shields.io/badge/Python-3.x+-blue) ![Git](https://img.shields.io/badge/Git-2.x+-red)

## 🌟 Features

- **🤖 Automated News Scraping**: Uses Puppeteer to extract content from news websites
- **🧠 AI-Powered Processing**: Leverages Google Gemini AI to format and analyze news content
- **📝 Markdown Generation**: Creates professionally formatted news digests
- **🌐 Web Interface**: Beautiful, responsive blog interface with dark/light mode
- **📱 Mobile Responsive**: Optimized for all device sizes
- **📧 Email Notifications**: Sends completion notifications via Gmail
- **🔄 Git Integration**: Automatically commits and pushes updates to GitHub
- **📊 Archive Management**: Maintains a searchable archive of all news articles

## 🏗️ Project Structure

```
NewsBlog/
├── GetNews.js              # Main automation script
├── RunHost.py             # Local server launcher
├── index.html             # Main web interface
├── NewsList.json          # Archive index
├── .env                   # Environment variables
├── package.json           # Node dependencies
├── .gitignore            # Git ignore rules
├── src/
│   ├── logic.js          # Frontend JavaScript logic
│   ├── style.css         # Responsive CSS styles
│   └── icon.ico          # Favicon
└── News/                 # Generated news articles
    ├── 01-06-2025_News.md
    ├── 01-07-2025_News.md
    └── ...
```

## 🚀 Complete Setup Guide

### Prerequisites Check

Before starting, you need to verify and install the following software on your Windows PC:

#### Step 1: Check Python Installation

1. Press `Win + R` to open Run dialog
2. Type `cmd` and press Enter
3. In the command prompt, run:
   ```cmd
   python --version
   ```

**Expected Output**: `Python 3.x.x`

If Python is not installed:
- Download from [Python Official Website](https://www.python.org/downloads/)
- For setup help, watch [Python setup tutorials](https://www.youtube.com/results?search_query=how+to+setup+python+on+windows)

#### Step 2: Check Node.js Installation

In the same command prompt, run:
```cmd
node -v
```

**Expected Output**: `v18.x.x` or higher

If Node.js is not installed:
- Download from [Node.js Official Website](https://nodejs.org/en/download)
- For setup help, watch [Node.js setup tutorials](https://www.youtube.com/results?search_query=how+to+setup+node+js+on+windows)

#### Step 3: Check Git Installation

In the same command prompt, run:
```cmd
git --version
```

**Expected Output**: `git version 2.x.x`

If Git is not installed:
- Download from [Git Official Website](https://git-scm.com/downloads)
- For setup help, watch [Git setup tutorials](https://www.youtube.com/results?search_query=how+to+setup+git+on+windows)

### Project Installation

#### Step 1: Clone the Repository

1. In command prompt, navigate to Desktop:
   ```cmd
   cd desktop
   ```

2. Clone the project:
   ```cmd
   git clone https://github.com/Yacine20elfadili/NewsBlog.git
   ```

3. You should now see a 'NewsBlog' folder on your Desktop

#### Step 2: Navigate to Project Directory

1. Go to the 'NewsBlog' folder on your Desktop
2. Click on the address bar (path bar) at the top
3. Type `cmd` and press Enter
4. **Keep this command window open** - you'll need it for all following steps

### Environment Configuration

#### Step 1: Set News Website URL

1. Find a good news website and go to its main page
2. Copy the URL of the latest news section
3. In your command prompt, run:
   ```cmd
   echo NEWS_WEBSITE_URL=https://www.AnyNewsWebsite.com/latest-news > .env
   ```
   **Replace the URL** with the link you copied

#### Step 2: Get Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/apikey)
2. Click on `Create API key` button
3. Select `Gemini API` and click `Create API key in existing project`
4. **Copy the key and save it safely** - don't share it with others!
5. In command prompt, run:
   ```cmd
   echo API_KEY=ABCDEFGHIJKLMNOPQRSTUVWXYZ >> .env
   ```
   **Replace the placeholder** with your actual API key

#### Step 3: Setup Gmail App Password (Optional but Recommended)

To get an app password for Gmail notifications:

1. Go to your [Google Account settings](https://myaccount.google.com/)
2. Click on "Security" in the left sidebar
3. Under "Signing in to Google", enable "2-Step Verification" if not already enabled
4. Follow the setup process for 2FA
5. Go back to Security settings
6. Under "Signing in to Google", click on "2-Step Verification"
7. At the bottom, click on "App passwords"
8. Select "Mail" for the app and "Other" for device
9. Enter a custom name like "Node.js App" or "News Blog Script"
10. Click "Generate"
11. **Copy the 16-character password** (format: `abcd efgh ijkl mnop`)
12. **Save it safely** - don't share it with others!
13. In command prompt, run:
    ```cmd
    echo GMAIL_APP_PASSWORD=aaaa bbbb cccc dddd >> .env
    ```
    **Replace the placeholder** with your actual app password

#### Step 4: Complete Environment Setup

1. Set your Gmail address:
   ```cmd
   echo GMAIL_ADDRESS=example@gmail.com >> .env
   ```
   **Replace with your actual Gmail address**

2. Enable or disable GitHub push functionality:
   ```cmd
   echo ENABLE_GIT_PUSH=choice >> .env
   ```
   **Replace 'choice'** with either `true` or `false`
   - Use `true` if you want to use GitHub Pages
   - Use `false` if you don't want automatic Git operations

3. Clean up existing files:
   ```cmd
   del News\* /Q
   ```

4. Initialize the news list:
   ```cmd
   echo [] > NewsList.json
   ```

**Keep the command window open** - we still need it!

### Install Dependencies

In the same command prompt, run:

```cmd
npm install puppeteer-real-browser @google/genai dotenv nodemailer
```

If you don't have a `package.json` file, create one:
```cmd
npm init -y
```

After creating `package.json`, you need to edit it to add ES module support:
1. Open `package.json` in a text editor
2. Find the line with `"main": "xxxxx",`
3. Add this line after it:
   ```json
   "type": "module",
   ```

**Keep the command prompt open** for the next optional step!

### GitHub Setup (Optional)

If you want to activate GitHub push functionality and use GitHub Pages:

#### Prerequisites
- Create a GitHub account if you don't have one: [GitHub signup tutorials](https://www.youtube.com/results?search_query=how+to+create+a+github+account)

#### Setup Steps

1. **Create a new repository on GitHub:**
   - Go to [Create New Repository](https://github.com/new)
   - Name your repo (e.g., `MyDailyNews`)
   - Choose **public** or **private**
   - **Don't add README** (we already have one locally)
   - Click **Create repository**

2. **Initialize Git and push to GitHub:**
   
   In your command prompt, run these commands one by one:
   
   ```bash
   git init
   ```
   
   ```bash
   git add .
   ```
   
   ```bash
   git commit -m "Initial commit"
   ```
   
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   ```
   **Replace YOUR_USERNAME** with your GitHub username and **YOUR_REPO_NAME** with your actual repository name
   
   ```bash
   git push -u origin master
   ```

## 🧪 Testing Your Setup

### Run the News Automation

In the same command prompt you've been using, run:

```cmd
node GetNews.js
```

**Watch the magic happen!** 🎉

If you encounter errors, try asking ChatGPT or checking the troubleshooting section below.

### Start the Web Server

After the news script finishes successfully:

1. **Close the command prompt window**
2. **In the NewsBlog folder**, look for `RunHost.py` and **double-click it**
3. You'll see: `Serving HTTP on :: port 8000 (http://[::]:1337/) ...`
4. **Open your web browser**
5. **Go to**: `http://localhost:1337`
6. **Your news dashboard will load!** 🚀
7. **To stop the server**: Go back to the command window and press `Ctrl + C`

## 🎨 Web Interface Features

- **📱 Responsive Design**: Works on desktop, tablet, and mobile devices
- **🌓 Dark/Light Mode**: Toggle between themes with preference persistence
- **📋 Article Archive**: Browse all historical news articles
- **🔍 Easy Navigation**: Click any date to load that day's news
- **⚡ Fast Loading**: Optimized performance with proper caching

## ⚙️ Environment Variables Reference

Your `.env` file should contain:

```env
NEWS_WEBSITE_URL="https://your-news-source.com/latest"
API_KEY="your_google_gemini_api_key"
GMAIL_APP_PASSWORD="your gmail app password"
GMAIL_ADDRESS="youremail@gmail.com"
ENABLE_GIT_PUSH="true"
```

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `NEWS_WEBSITE_URL` | Target news website URL | ✅ Yes | `https://news.example.com/latest` |
| `API_KEY` | Google Gemini API key | ✅ Yes | `AIzaSyC1234567890abcdef` |
| `GMAIL_APP_PASSWORD` | Gmail app-specific password | ❌ Optional | `abcd efgh ijkl mnop` |
| `GMAIL_ADDRESS` | Your Gmail address | ❌ Optional | `yourname@gmail.com` |
| `ENABLE_GIT_PUSH` | Enable automatic Git operations | ❌ Optional | `true` or `false` |

## 🔄 How It Works

1. **Content Extraction**: Puppeteer navigates to the configured news website and extracts text content from the main content area
2. **AI Processing**: Google Gemini AI analyzes and formats the raw content into a structured, professional news digest
3. **File Generation**: Creates a timestamped Markdown file with the formatted content
4. **Archive Update**: Updates the `NewsList.json` index file
5. **Git Operations**: Automatically commits and pushes changes (if enabled)
6. **Notifications**: Sends email confirmation of successful completion

## 📝 Generated Output Format

Articles follow this structure:

```markdown
# 🌍 Global News Digest
*📅 Generated on [date] | 🕐 [timeframe]*

## 🎯 Executive Summary
[Brief overview of major developments]

## 🔥 Breaking & Major Developments
[Most critical and urgent news]

## 🌐 International Affairs
[Global political and conflict updates]

## 🇺🇸 Political Landscape
[Domestic political developments]

## 🚔 Crime & Justice
[Legal and criminal justice news]

## 🎨 Culture & Society
[Entertainment, sports, and cultural news]

## 📊 Quick Stats & Numbers
[Summary statistics and metrics]

## 🔍 What to Watch
[Developing stories and upcoming events]

## 💡 Analysis & Context
[Expert analysis and broader implications]
```

## 🛠️ Troubleshooting

### Common Issues

**❌ "Python not found" error**
```cmd
# Check if Python is in PATH
python --version
# If not working, reinstall Python and make sure to check "Add to PATH"
```

**❌ "Node not found" error**
```cmd
# Check Node.js installation
node -v
npm -v
# Reinstall Node.js if needed
```

**❌ Script fails to start**
```cmd
# Check if you're in the right directory
dir
# Should see GetNews.js, package.json, etc.

# Reinstall dependencies
npm install
```

**❌ Browser automation fails**
- Ensure the target website allows automated access
- Check if the website structure has changed
- Verify your internet connection
- Try a different news website URL

**❌ AI processing errors**
- Verify your Gemini API key is valid and active
- Check if you have sufficient API quota
- Ensure the content isn't too large

**❌ Git operations fail**
- Ensure you have proper Git credentials configured
- Check if the repository exists and you have push permissions
- Verify your GitHub username and repository name in the remote URL

**❌ Email notifications not working**
- Double-check your Gmail app password (not your regular password)
- Ensure 2FA is enabled on your Google account
- Verify your Gmail address is correct

### Performance Tips

- **Memory Usage**: Browser automation can be memory-intensive; close other applications if needed
- **Rate Limiting**: Don't run the script too frequently to respect website limits
- **API Costs**: Monitor your Gemini API usage to avoid unexpected charges

## 🔒 Security Notes

- **Never share your API keys** or app passwords
- **Keep your `.env` file private** - it's already in `.gitignore`
- **Use app passwords**, not your main Gmail password
- **Respect website terms of service** when scraping

## 📖 Usage Tips

### Daily Automation
- Set up a scheduled task (Windows Task Scheduler) to run `node GetNews.js` daily
- Keep the web server running with `RunHost.py` for continuous access

### Customization
- Modify the AI prompt in `GetNews.js` to change the output format
- Edit `src/style.css` to customize the web interface appearance
- Add multiple news sources by extending the script

### GitHub Pages Deployment
If you enabled Git push (`ENABLE_GIT_PUSH=true`):
1. Go to your GitHub repository settings
2. Enable GitHub Pages
3. Set source to main/master branch
4. Your blog will be available at `https://yourusername.github.io/yourreponame`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## ⚠️ Important Disclaimers

- **Ethical Use**: Only scrape websites that allow automated access
- **Rate Limiting**: Respect website rate limits and robots.txt files
- **Content Rights**: Ensure you have rights to process and redistribute content
- **API Costs**: Monitor your Gemini API usage to avoid unexpected charges
- **Legal Compliance**: Follow all applicable laws and terms of service

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Need Help?

If you encounter issues:

1. ✅ Follow this setup guide step by step
2. ✅ Check the troubleshooting section above
3. ✅ Review error messages in the command prompt
4. ✅ Verify all environment variables are correctly set
5. ✅ Ensure all prerequisites are properly installed

## 🎯 What's Next?

After successful setup, you can:
- 🔄 Run the script daily for fresh news
- 🎨 Customize the web interface styling
- 📱 Access your blog from any device
- 🌐 Deploy to GitHub Pages for public access
- 📧 Receive email notifications of updates

---

**Built with ❤️ for automated journalism and easy news access**

*Happy news browsing! 📰✨*