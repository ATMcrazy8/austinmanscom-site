# 👋 Welcome to AustinMans.com

This is the source code for my personal portfolio site: [**AustinMans.com**](https://austinmans.com)

It's built to showcase my skills through thoughtful design and personal projects.

---

## ⚙️ Tech Stack

### 🔨 Frameworks & Languages
- [Next.js 15 (App Router)](https://nextjs.org/)
  - React.js  
  - TypeScript  
  - Node.js  
- Tailwind CSS (utility-first styling)  
- ShadCN/UI (accessible, pre-built components)  
- ESLint & Prettier (for linting and code formatting)  
- Framer Motion (smooth animations)  

### 🎨 Design
- Custom themes using dynamic **HSL hue manipulation**  
- Global theming powered by Tailwind CSS variables  
- Light/Dark modes supported via Tailwind’s `.dark` variants  

### 🧩 UI Libraries
- [Lucide](https://lucide.dev/) and [MUI](https://mui.com/) icons  
- Recharts (for radar chart data visualization)  

---

## 🏒 Dynamic Referee Analytics

The first featured project on this site is dedicated to tracking NHL referee trends and patterns.

I came up with this idea a long time ago—probably around the time my NHL fandom really began, during the 2013-14 playoffs. Minnesota was an up-and-coming scrappy team with a core of players I really liked. They faced the Central Division champs, the Avalanche, and miraculously pulled off an underdog series win. I was in college at UWEC at the time, and when they took Game 7, the dorms absolutely erupted. I was hooked. And here we are, over a decade later, still waiting for that elusive Minnesota championship. Classic MN sports.

I've always found it odd that we scrutinize every aspect of players and game environments—home vs. away, rosters, arena conditions, scheduling, travel—but rarely talk about the referees in the same way. They play a significant role, often swaying the flow of a game, deciding when to hold their whistles and when to lay the law, they can literally be hit by pucks and players and are considered part of the arena, and yet they're treated like background noise. In reality, they're evaluated and rewarded just like players, even getting selected to officiate playoff games based on their season performance.

Eventually, I decided to test my theory and see if anyone was already tracking referee stats—and, thankfully, someone is. The folks at [scoutingtherefs.com](https://scoutingtherefs.com) are doing an amazing job compiling data, writing blog posts, and tracking rules, fines/suspensions, news, and more.

This actually works out perfectly for me. The hard part—data collection—is already being handled. That freed me up to focus on what I enjoy most: making data visual, interactive, and easier to digest. Even though their site is great, I wanted to create something from my own perspective, and AustinMans.com felt like the right place to do that. I took design inspiration from NHL player stat cards... and even a little from Pokémon.

This is still a work in progress, but I’m proud of where it’s heading.

### 📊 How It Works
- **Data Source:** Ref stats are scraped nightly from [scoutingtherefs.com](https://scoutingtherefs.com) using [Puppeteer](https://pptr.dev/) (a headless Chrome automation library)  
- **Data Storage:** Cleaned stats are saved locally to:  
  `data/referees.json`  
- **Automation:** A GitHub Actions workflow automatically:
  - Fetches updated stats  
  - Rewrites the JSON file  
  - Commits the changes  
- **Page Generation:**  
  - Each referee gets a dedicated page, generated using a slugified version of their name  
  - Slugs are created using a custom `slugify` utility  
  - Stats are visualized through styled components and radar charts using `Recharts`, alongside calculated league averages  

> I'm currently refining the design of the individual stat pages. The biggest challenge so far? Color theory. Balancing my custom theme hues with neutral grays—while keeping it all accessible and readable—has taken some experimenting. Overlaying individual stats against league averages adds another layer of complexity, but I’m getting there.

---
