# 👋 Welcome to AustinMans.com

This is the source code for my personal portfolio site: [**AustinMans.com**](https://austinmans.com)

Built to showcase my abilities through design and personal projects.

---

## ⚙️ Tech Stack

### 🔨 Frameworks & Languages
- [Next.js 15 (App Router)](https://nextjs.org/)
  - React.js  
  - TypeScript  
  - Node.js  
- Tailwind CSS (utility-first styling)  
- ShadCN/UI (pre-built accessible components)  
- ESLint & Prettier (code linting and formatting)  
- Framer Motion (animations)  

### 🎨 Design
- Custom themes using dynamic **HSL hue manipulation**  
- Global theming powered by Tailwind CSS variables  
- Light/Dark modes supported using Tailwind’s `.dark` variants  

### 🧩 UI Libraries
- [Lucide](https://lucide.dev/) and [MUI](https://mui.com/) icons  
- Recharts (radar charts for stat visualization)  

---

## Referee Analytics

My first project added to the site is dedicated to tracking NHL referee trends and patterns.

### 📊 How It Works
- **Data Source:** All ref stats are scraped from [scoutingtherefs.com](https://scoutingtherefs.com) using [Puppeteer](https://pptr.dev/) (headless Chrome automation)  
- **Data Storage:** Cleaned stats are saved to a local JSON file:  
  `data/referees.json`  
- **Automation:** GitHub Actions automatically run a script nightly to:
  - Fetch the latest stats  
  - Overwrite the existing JSON file  
  - Commit updates to the repo  
- **Page Generation:**  
  - Each referee has an individual page generated using their slugified name  
  - Slugs are created using a custom `slugify` utility  
  - Stats are displayed using both tables and radar charts to compare against the calculated league averages 

---

