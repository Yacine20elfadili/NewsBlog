# 📰 News Blog Automation Project

> A Windows-based automated news scraping and blog generation system that extracts content from news websites, processes it with AI, and creates beautifully formatted daily news digests with a responsive web interface.  
> Built with Node.js, Python, and modern web technologies for practical everyday news consumption.

**NOTE:** This project was only built in Windows and tested in Windows

![Status](https://img.shields.io/badge/Status-Active-brightgreen) ![Node.js](https://img.shields.io/badge/Node.js-18+-green) ![Python](https://img.shields.io/badge/Python-3.x+-blue) ![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow) ![HTML](https://img.shields.io/badge/HTML-5-orange) ![CSS](https://img.shields.io/badge/CSS-3-blue) ![Git](https://img.shields.io/badge/Git-2.x+-red)

## ✨ Features

- **🤖 Automated News Scraping** – Uses Puppeteer to extract content from news websites efficiently
- **🧠 AI-Powered Processing** – Leverages Google Gemini AI to format and analyze news content
- **📝 Markdown Generation** – Creates professionally formatted daily news digests
- **🌐 Responsive Web Interface** – Beautiful blog interface with dark/light mode toggle
- **📱 Mobile Optimized** – Works seamlessly on desktop, tablet, and mobile devices
- **📧 Email Notifications** – Sends completion notifications via Gmail integration
- **🔄 Git Integration** – Automatically commits and pushes updates to GitHub
- **📊 Archive Management** – Maintains a searchable archive of all news articles
- **🎨 Theme Support** – Dark/light mode with user preference persistence
- **⚡ Fast Performance** – Optimized loading with proper caching mechanisms

## 🗃️ Project Structure

```
NewsBlog/
├── GetNews.js              # Main automation script (web scraping & AI processing)
├── RunHost.py             # Local server launcher for web interface
├── index.html             # Main web interface entry point
├── NewsList.json          # Archive index and metadata
├── .env                   # Environment variables (API keys, secrets)
├── package.json           # Node.js dependencies and scripts
├── .gitignore            # Git ignore rules
├── src/                   # Source code
│   ├── logic.js          # Frontend JavaScript application logic
│   ├── style.css         # Responsive CSS styles and themes
│   └── icon.ico          # Favicon and branding
└── News/                 # Generated news articles
    ├── 01-06-2025_News.md
    ├── 01-07-2025_News.md
    └── [daily_articles...]
```

## 🚀 Complete Setup Guide

### Prerequisites Check (Windows Only)

Before starting, verify these are installed on your Windows PC:

#### Step 1: Check Python Installation

1. Press `Win + R`, type `cmd`, press Enter
    
2. Run:
    
    ```cmd
    python --version
    ```
    
    **Expected**: `Python 3.x.x`
    

If not installed:

- Download from [Python.org](https://www.python.org/downloads/)
- **Important**: Check "Add Python to PATH" during installation
- Search YouTube: "How to install Python on Windows"

#### Step 2: Check Node.js Installation

In command prompt, run:

```cmd
node --version
npm --version
```

**Expected**: `v18.x.x` or higher for Node.js

If not installed:

- Download from [nodejs.org](https://nodejs.org/)
- Search YouTube: "How to install Node.js on Windows"

#### Step 3: Check Git Installation

In command prompt, run:

```cmd
git --version
```

**Expected**: `git version 2.x.x`

If not installed:

- Download from [git-scm.com](https://git-scm.com/downloads)
- Search YouTube: "How to install Git on Windows"

#### Step 4: Verify VS Code (Recommended)

- Download from [code.visualstudio.com](https://code.visualstudio.com/)
- Install Git extension if not already included

### Project Installation

#### Step 1: Clone the Repository

1. Open Command Prompt
    
2. Navigate to your desired location:
    
    ```cmd
    cd Desktop
    ```
    
3. Clone the project:
    
    ```cmd
    git clone https://github.com/Yacine20elfadili/NewsBlog.git
    ```
    
4. Navigate to project folder:
    
    ```cmd
    cd NewsBlog
    ```
    

#### Step 2: Install Dependencies

**Install Node.js dependencies:**

```cmd
npm install puppeteer-real-browser @google/genai dotenv nodemailer
```

**Initialize package.json if needed:**

```cmd
npm init -y
```

**Important**: Add ES module support to `package.json`:

1. Open `package.json` in VS Code or Notepad
2. Add this line after `"main": "xxxxx",`:
    
    ```json
    "type": "module",
    ```
    

### Environment Configuration

#### Step 1: Get Google Gemini AI API Key

1. Visit [Google AI Studio](https://aistudio.google.com/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key
5. **Save it securely** - never share this key!

#### Step 2: Set Up News Website URL

1. Find a reliable news website
2. Copy the URL of their latest news section
3. **Save this URL** - you'll need it in the next step

#### Step 3: Create Environment File

Create a `.env` file in the project root:

```cmd
echo. > .env
```

Open `.env` in VS Code or Notepad and add:

```env
NEWS_WEBSITE_URL=https://www.example-news-site.com/latest
API_KEY=your_gemini_api_key_here
GMAIL_APP_PASSWORD=your_gmail_app_password_here
GMAIL_ADDRESS=your_email@gmail.com
ENABLE_GIT_PUSH=true
```

#### Step 4: Set Up Gmail App Password (Optional but Recommended)

1. Go to your [Google Account settings](https://myaccount.google.com/)
2. Click on "Security" → "2-Step Verification"
3. Enable 2FA if not already enabled
4. Go to "App passwords" at the bottom
5. Select "Mail" and "Other (custom name)"
6. Enter "News Blog Script" as the name
7. Click "Generate"
8. **Copy the 16-character password** and save it securely
9. Update your `.env` file with this password

#### Step 5: Initialize Project Files

Clean up and initialize:

```cmd
del News\* /Q
echo [] > NewsList.json
```

### GitHub Setup (Optional)

For GitHub Pages deployment and automatic updates:

#### Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com/) and create a new repository
2. Name it (e.g., `MyDailyNews`)
3. Choose public or private
4. **Don't add README** (we already have one)

#### Step 2: Configure Git

```cmd
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

### First Run Test

#### Test the News Automation

Run the main application:

```cmd
node GetNews.js
```

**Expected behavior:**

- Browser opens and navigates to news website
- Content extraction starts
- AI processing begins
- Markdown file is generated in `News/` folder
- Email notification sent (if configured)
- Git operations complete (if enabled)
- Success message displayed

#### Test Web Interface

1. Start the web server:
    
    ```cmd
    python RunHost.py
    ```
    
    Or run it directly:
    
    ```cmd
    python -m http.server 1337
    ```
    
2. Open browser and go to: `http://localhost:1337`
    
3. Verify interface loads correctly
    
4. Test article navigation and theme switching
    

**To stop server:** Press `Ctrl + C` in command prompt

## ⚙️ Environment Variables Reference

Your `.env` file should contain:

```env
NEWS_WEBSITE_URL=https://your-news-source.com/latest
API_KEY=your_google_gemini_api_key
GMAIL_APP_PASSWORD=abcd efgh ijkl mnop
GMAIL_ADDRESS=youremail@gmail.com
ENABLE_GIT_PUSH=true
```

|Variable|Description|Required|Example|
|---|---|---|---|
|`NEWS_WEBSITE_URL`|Target news website URL for scraping|✅ Yes|`https://news.example.com/latest`|
|`API_KEY`|Google Gemini AI API key|✅ Yes|`AIzaSyC1234567890abcdef`|
|`GMAIL_APP_PASSWORD`|Gmail app-specific password (16 chars)|❌ Optional|`abcd efgh ijkl mnop`|
|`GMAIL_ADDRESS`|Your Gmail address for notifications|❌ Optional|`yourname@gmail.com`|
|`ENABLE_GIT_PUSH`|Enable automatic Git operations|❌ Optional|`true` or `false`|

## 🎯 Usage Guide

### Basic Usage

**Run the news automation script:**

```cmd
node GetNews.js
```

**Start the web server:**

```cmd
python RunHost.py
```

**Access the web interface:**

Open `http://localhost:1337` in your browser

### Advanced Usage

**Custom news website:**

1. Update `NEWS_WEBSITE_URL` in `.env`
2. Run the script: `node GetNews.js`

**Manual Git operations:**

```cmd
git add .
git commit -m "Daily news update"
git push origin main
```

**Custom server port:**

```cmd
python -m http.server 8080
```

### Web Interface Features

1. **📰 Article Archive** - Browse all historical news articles by date
2. **🌓 Theme Toggle** - Switch between dark and light modes
3. **📱 Responsive Design** - Optimized for all device sizes
4. **⚡ Fast Navigation** - Click any date to load that day's news
5. **🔍 Easy Reading** - Clean, professional formatting
6. **💾 Persistent Settings** - Theme preferences saved automatically

## 🔄 How It Works

1. **Website Navigation** - Puppeteer opens the configured news website
2. **Content Extraction** - Scrapes text content from main article areas
3. **AI Processing** - Google Gemini AI analyzes and formats raw content
4. **Markdown Generation** - Creates structured, professional news digest
5. **File Management** - Saves timestamped articles and updates archive index
6. **Git Operations** - Automatically commits and pushes changes (if enabled)
7. **Email Notifications** - Sends completion confirmation via Gmail
8. **Web Interface** - Serves responsive blog interface for easy reading

## 🛠️ Development and Customization

### Project Structure Explanation

- **`GetNews.js`** - Main automation script with web scraping and AI processing
- **`RunHost.py`** - Simple Python HTTP server for local development
- **`index.html`** - Web interface layout and structure
- **`src/logic.js`** - Frontend JavaScript for navigation and theming
- **`src/style.css`** - Responsive CSS with dark/light mode support
- **`NewsList.json`** - Archive metadata and article index

### Adding New Features

1. **Backend (Node.js):**
    
    - Modify `GetNews.js` for new scraping logic
    - Add new AI prompts for different content types
    - Integrate additional news sources
2. **Frontend (Web):**
    
    - Update `src/logic.js` for new functionality
    - Enhance `src/style.css` for visual improvements
    - Add new UI components to `index.html`
3. **Configuration:**
    
    - Add new environment variables to `.env`
    - Update this README with new setup instructions

### Testing Your Changes

1. **Run the automation script:**
    
    ```cmd
    node GetNews.js
    ```
    
2. **Test the web interface:**
    
    ```cmd
    python RunHost.py
    ```
    
3. **Verify generated content:**
    
    - Check `News/` folder for new articles
    - Verify `NewsList.json` is updated
    - Test web interface navigation

## 📊 Generated Content Structure

### Article Format

Each generated article follows this professional structure:

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

## 🚀 Deployment Options

### GitHub Pages (Recommended)

1. **Enable GitHub Pages:**
   - Go to repository settings
   - Scroll to "Pages" section
   - Select source branch (main)
   - Your site will be at: `https://yourusername.github.io/NewsBlog`

2. **Automatic Updates:**
   - Set `ENABLE_GIT_PUSH=true` in `.env`
   - Run `node GetNews.js` daily
   - Changes automatically deploy to GitHub Pages

3. **Task Scheduler (Recommended):**
   - **Open Task Scheduler**: Press `Windows + R`, type `taskschd.msc`
   - **Create Basic Task**: Name it "Daily News Update"
   - **Set Trigger**: Daily at 12:00 AM (or preferred time)
   - **Set Action**: 
     - Program: `node`
     - Arguments: `C:\path\to\your\GetNews.js`
     - Start in: `C:\path\to\your\project\folder`
   - **Advanced Settings**:
     - ✅ "Run task as soon as possible after a scheduled start is missed"
     - ✅ "If the task fails, restart every 1 minute" (3 attempts)
     - ✅ "Stop the task if it runs longer than 1 hour"
   - **Save and Test**: Right-click task → "Run" to verify it works
   - **Result**: Your news blog updates automatically every day and publishes to GitHub Pages
### Local Development Server

**Using Python (Recommended):**

```cmd
python RunHost.py
```

**Using Node.js:**

```cmd
npx http-server -p 1337
```

### Daily Automation

**Windows Task Scheduler:**

1. Create a new task
2. Set trigger for daily execution
3. Set action to run: `node GetNews.js`
4. Set start in: `C:\path\to\NewsBlog`

## 🔒 Security Notes

- **Never share your API keys** or app passwords publicly
- **Keep your `.env` file private** - it's already in `.gitignore`
- **Use Gmail app passwords**, not your regular Gmail password
- **Monitor API usage** to avoid unexpected charges
- **Respect website terms of service** when scraping content
- **Validate scraped content** to prevent malicious injection

## 🛠️ Troubleshooting

### Common Issues
	 if you have any troubles , please consider asking ChatGPT ^-^
### Performance Tips

- **Memory Management**: Close other applications during scraping
- **Rate Limiting**: Don't run script too frequently
- **API Optimization**: Monitor Gemini API usage
- **Storage**: Regularly clean old articles if needed

## ⚠️ Important Disclaimers

- **Ethical Use**: Only scrape websites that allow automated access
- **Rate Limiting**: Respect website rate limits and robots.txt files
- **Content Rights**: Ensure you have rights to process and redistribute content
- **API Costs**: Monitor your Gemini API usage to avoid unexpected charges
- **Legal Compliance**: Follow all applicable laws and terms of service
- **Website Changes**: Scrapers may break if target websites change structure

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Mohamed Yacine Elfadili**

- GitHub: [@Yacine20elfadili](https://github.com/Yacine20elfadili)

---

**Note**: This tool is for educational and legitimate news aggregation purposes. Please respect all terms of service and use responsibly. Always verify information from multiple sources and respect copyright laws when redistributing content.