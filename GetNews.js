// Import required modules
import { connect } from "puppeteer-real-browser";
import fs from "fs";
import path from "path";
// for Gemini
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
// for executing shell commands (github push)
import { exec } from "child_process";
import { promisify } from "util";
const execAsync = promisify(exec);
//for sending email notifications
import nodemailer from 'nodemailer';


dotenv.config();//load variable (keys) from .env file

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY, });

const gmail_app_password = process.env.GMAIL_APP_PASSWORD;

const gmail_address = process.env.GMAIL_ADDRESS; 

const news_website_url = process.env.NEWS_WEBSITE_URL; 

const enable_git_push = process.env.ENABLE_GIT_PUSH; 


const MAX_RETRIES = 3;
const RETRY_DELAY = 5000;

// Configuration constants
const OUTPUT_DIR = path.join(
  process.env.USERPROFILE || process.env.HOME,
  "Desktop",
  "NewsAutomation"
);

function generateDate(format) {
  const today = new Date();
  if (format === 'string format') {
    const day = String(today.getDate()).padStart(2, "0");
    const month = today.toLocaleString('default', { month: 'long' }).toLowerCase();
    const year = today.getFullYear();
    return `${day}-${month}-${year}`;
  } else {
    const day = String(today.getDate()).padStart(2, "0") + '-';
    const month = String(today.getMonth() + 1).padStart(2, "0") + '-';
    const year = today.getFullYear();
    return `${day}${month}${year}`;
  }
}

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Execute Git commands
async function pushToGithub(currentDate) {
  try {
    console.log("🔄 Starting Git operations...");
    
    // Change to project directory
    const projectDir = path.join(
      process.env.USERPROFILE || process.env.HOME,
      "Desktop",
      "NewsAutomation"
    );
    
    // Git add
    console.log("📝 Adding files to Git...");
    await execAsync('git add .', { cwd: projectDir });
    
    // Git commit
    const commitMessage = `Auto-update: Daily news for ${currentDate}`;
    console.log(`💾 Committing changes: "${commitMessage}"`);
    await execAsync(`git commit -m "${commitMessage}"`, { cwd: projectDir });
    
    // Git push
    console.log("🚀 Pushing to GitHub...");
    try {
      await execAsync('git push', { cwd: projectDir });
    } catch (pushError) {
      console.warn("⚠️ Git push failed. Attempting to pull and retry...");
      console.log("🔄 Pulling latest changes from GitHub...");
      await execAsync('git pull origin main', { cwd: projectDir });
      console.log("🔄🚀 Retrying Git push...");
      await execAsync('git push', { cwd: projectDir });
    }
    
    console.log("✅ Successfully pushed changes to GitHub!");
    
  } catch (error) {
    console.error("❌ Git operation failed:", error.message);
    throw error;
  }
}

async function sendSuccessNotification() {
    if (!gmail_address || !gmail_app_password) {
        console.log('Skipping notification: GMAIL_ADDRESS or GMAIL_APP_PASSWORD not set.');
        return;
    }
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: gmail_address,
            pass: gmail_app_password
        }
    });
    
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();
    
    const mailOptions = {
        from: gmail_address,
        to: gmail_address,
        subject: `✅ Script Completed - ${currentDate}`,
        text: `Your scheduled script completed successfully at ${currentTime} on ${currentDate}`
    };
    
    try {
        await transporter.sendMail(mailOptions);
        console.log('✅ Success notification sent');
    } catch (error) {
        console.log('❌ Failed to send notification:', error.message);
    }
}

function updateNewsList(dateString) {
  const newsListPath = path.join(OUTPUT_DIR , 'NewsList.json');
  let newsList = [];
  
  try {
    // Check if NewsList.json exists and read it
    if (fs.existsSync(newsListPath)) {
      const existingData = fs.readFileSync(newsListPath, 'utf-8');
      newsList = JSON.parse(existingData);
    }
  } catch (error) {
    console.log("Creating new NewsList.json file...");
    newsList = [];
  }
  
  // Add the new date if it doesn't already exist
  if (!newsList.includes(dateString)) {
    newsList.push(dateString);
    
    // Write the updated list back to the file
    fs.writeFileSync(newsListPath, JSON.stringify(newsList, null, 2), 'utf-8');
    console.log(`Date ${dateString} added to NewsList.json`);
  } else {
    console.log(`Date ${dateString} already exists in NewsList.json`);
  }
}


async function generateContentWithRetry(ai , content , retries = 0) {
  try {
    const response = await ai.models.generateContent({
    model: "gemini-2.5-pro",
    contents: `
# 📰 News Content Analysis & Formatting Task

## CONTEXT
I am providing you with raw text content extracted from a news webpage. Transform this content into a visually stunning, professionally formatted Markdown document that executives and stakeholders would be impressed to read.

## MISSION
Create a comprehensive, magazine-quality analysis that transforms raw news content into an engaging, scannable, and beautifully formatted document with exceptional visual hierarchy and professional presentation.

## SPECIFIC REQUIREMENTS
### follow exactly 
1. your response structure(see OUTPUT FORMAT section below) and the style guidelines (see STYLE GUIDELINES section below)
2. DO NOT START with "Here is the formatted content" or "Of course. Here is the professionally formatted news analysis based on the content you provided" or similar phrases
5. DO NOT include any personal opinions or subjective statements


### Content Organization
1. **Structure**: Present information with clear thematic grouping and visual hierarchy
2. **Chronology**: Prioritize by urgency and recency, then maintain chronological order within sections
3. **Completeness**: Extract all important details including names, locations, dates, and specific facts
4. **Context**: Preserve original meaning while removing redundant information and unnecessary fluff

### Markdown Formatting Standards
5. **Typography**: Use appropriate heading levels (##, ###) for major sections and categories
6. **Emphasis**: Apply **bold** for key terms, names, and critical information
7. **Dates**: Format dates consistently and make them prominent using **bold** or \`code formatting\`
8. **Lists**: Use nested bullet points for sub-details when items are complex
9. **Visual Elements**: Add relevant emojis (📅 for dates, 📍 for locations, 👥 for people) to improve readability
10. **Separation**: Use horizontal rules (---) to separate major sections or time periods

### Content Quality
11. **Completeness**: For each item, include WHO, WHAT, WHEN, WHERE, and WHY (when available)
12. **Clarity**: Write in clear, professional language suitable for stakeholders
13. **Consistency**: Maintain consistent formatting and style throughout
14. **Prioritization**: Lead with most important/recent information

## OUTPUT FORMAT

Structure your response as follows:

\`\`\`markdown
# 🌍 Global News Digest
*📅 Generated on [Current Date] | 🕐 [Time Period Covered]*

---

## 🎯 Executive Summary
**[2-3 sentences capturing the day's most significant developments and overall themes]**

---

## 🔥 Breaking & Major Developments

### 🚨 **URGENT** - [Most Critical Story]
> **⏰ [Timestamp]** | **📍 [Location]** | **🏷️ [Category]**

**[Compelling headline that captures attention]**

- 🎭 **Key Players**: [Names and roles]
- 📊 **Impact Scale**: [Scope/significance]
- 🔍 **Details**: [Complete context and facts]
- ⚡ **Latest Update**: [Most recent development]

---

## 🌐 International Affairs

### 🇺🇦 **Ukraine Conflict**
- **🔴 [Timestamp]** - **[Event Title]**
  - 💥 **Action**: [What happened]
  - 📍 **Location**: [Where]
  - 📈 **Casualties/Impact**: [Numbers/scale]
  - 🗣️ **Key Quote**: *"[Significant statement]"*
  - 🎯 **Significance**: [Why this matters]

### 🇮🇱 **Middle East Crisis**
- **🔴 [Timestamp]** - **[Event Title]**
  - [Same detailed format as above]

---

## 🇺🇸 Political Landscape

### 🏛️ **Washington Updates**
- **⚖️ [Timestamp]** - **[Political Development]**
  - 🎭 **Key Figure**: [Name and role]
  - 📜 **Policy/Action**: [What was announced/done]
  - 🌊 **Political Impact**: [Implications]
  - 💬 **Reactions**: [Notable responses]

---

## 🚔 Crime & Justice

### ⚖️ **Legal Developments**
- **🔍 [Timestamp]** - **[Case/Incident]**
  - 👥 **Involved**: [Who]
  - 📋 **Charges/Issues**: [Legal matters]
  - 🏛️ **Court/Authority**: [Jurisdiction]
  - 🎯 **Outcome/Status**: [Current situation]

---

## 🎨 Culture & Society

### 🎬 **Arts & Entertainment**
- **🏆 [Timestamp]** - **[Cultural Event]**
  - 🌟 **Highlight**: [Main achievement/event]
  - 👤 **Key Figures**: [Important people]
  - 🎭 **Significance**: [Cultural impact]

### ⚽ **Sports Highlights**
- **🥇 [Timestamp]** - **[Sports Event]**
  - 🏟️ **Event**: [Competition/game]
  - 🏆 **Result**: [Outcome]
  - ⭐ **Star Performer**: [Notable athlete]

---

## 📊 Quick Stats & Numbers
| Category | Count | Significance |
|----------|-------|--------------|
| 🚨 Breaking News | [#] | [Impact level] |
| 🌍 International | [#] | [Geographic spread] |
| 🏛️ Political | [#] | [Policy implications] |
| ⚖️ Legal/Crime | [#] | [Justice system impact] |

---

## 🔍 What to Watch
- 👀 **Developing Stories**: [Ongoing situations to monitor]
- 📅 **Upcoming Events**: [Scheduled important events]
- 🎯 **Key Implications**: [Broader consequences to track]

---

## 💡 Analysis & Context
**[Brief expert-level analysis of patterns, connections, and broader implications of the day's events]**
\`\`\`

## STYLE GUIDELINES

### 🎨 Visual Excellence
- **Emoji Strategy**: Use contextually relevant emojis for instant visual scanning (🚨 for urgent, 🔥 for trending, ⚡ for updates)
- **Typography Hierarchy**: Sharp contrast between headlines, subheadings, and body text
- **Color Coding**: Use consistent emoji colors for categories (🔴 for breaking, 🟡 for developing, 🟢 for positive news)
- **White Space**: Strategic use of spacing and separators for clean, breathable layout

### 📝 Content Quality
- **Headlines**: Write compelling, click-worthy headlines that capture attention
- **Quotes**: Include powerful quotes in *italics* with proper attribution
- **Context**: Every item should tell a complete story with WHO, WHAT, WHEN, WHERE, WHY
- **Urgency Indicators**: Use timestamps and priority markers (🚨 URGENT, 🔥 TRENDING, ⚡ UPDATE)

### 🎯 Professional Standards
- **Executive Tone**: Write for C-suite executives and decision-makers
- **Scannable Format**: Enable 30-second overview reading with visual hierarchy
- **Actionable Intelligence**: Focus on implications and what matters most
- **Credible Sources**: Maintain journalistic integrity and factual accuracy

### 📊 Data Presentation
- **Tables**: Use for comparative data and statistics
- **Lists**: Prioritize with bullet points and sub-bullets for complex information
- **Callout Boxes**: Use blockquotes (>) for critical information
- **Status Indicators**: Show progression, urgency, and development stages

## CURRENT DATE: this is the current date in the format ( DD-month-YYYY = ${generateDate('string format')} )

## CONTENT TO ANALYZE:

${content}
    `,
});
    return response.text;
  } catch (error) {
    if (error.message.includes("503") && retries < MAX_RETRIES) {
      console.log(`Attempt ${retries + 1} failed. Retrying in ${RETRY_DELAY/1000} seconds...`);
      await delay(RETRY_DELAY);
      return generateContentWithRetry(ai , content , retries + 1);
    }
    throw error;
  }
}

async function main() {
  try {
    const theURL = news_website_url;

    // Initialize browser
    console.log("Connecting to browser...");
    const { browser, page } = await connect({
      headless: true,
      fingerprint: true,
      turnstile: true,
      tf: true,
    });
    
    await page.goto(theURL, { waitUntil: "networkidle2" , timeout : 90000}); // 1 min and 30 sec
    await page.waitForSelector("main#maincontent", { timeout: 60000 });

    const content = await page.$eval("main#maincontent", el => el.innerText);
    console.log("Content extracted successfully!");

    const updatedResumeName =  OUTPUT_DIR + '/News/' + generateDate() + '_' + "News.md";

    try {
      const resumeContent = await generateContentWithRetry(ai , content);
      fs.writeFileSync(updatedResumeName, resumeContent, "utf-8");
      console.log("Resume generated successfully!");

      updateNewsList(generateDate());

      if (enable_git_push === 'true') {
        const currentDate = generateDate('string format');
        await pushToGithub(currentDate);
      }

      await sendSuccessNotification();

    } catch (error) {
      console.error("Failed to generate resume after multiple attempts:", error.message);
      process.exit(1);
    }
    
    // Clean up
    await page.close();
    await browser.close();
    console.log("Browser closed. Script completed successfully.");
    
  } catch (error) {
    console.error("An error occurred:", error);
    process.exit(1);
  }
}

main();