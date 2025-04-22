import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";

const REFEREE_STATS_URL =
  "https://scoutingtherefs.com/2024-25-nhl-referee-stats/";

async function scrapeRefereeData() {
  try {
    console.log("🚀 Launching Puppeteer...");
    const browser = await puppeteer.launch({
      headless: "new",
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu',
        '--window-size=1920x1080',
      ],
    });
    const page = await browser.newPage();

    console.log("🌍 Navigating to page...");
    await page.goto(REFEREE_STATS_URL, { waitUntil: "networkidle2" });

    console.log("⏳ Waiting for table to load...");
    await page.waitForSelector("#tablepress-226 tbody tr");

    console.log("📦 Extracting referee data...");
    const referees = await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll("#tablepress-226 tbody tr"));
      console.log(`Found ${rows.length} rows in the table`);
      
      return rows.map((row) => {
        const cells = row.querySelectorAll("td");
        return {
          name: cells[0]?.innerText.trim() || "Unknown",
          refNumber: parseInt(cells[1]?.innerText.trim()) || null,
          totalGames: parseInt(cells[2]?.innerText.trim()) || 0,
          goalsPerGame: parseFloat(cells[3]?.innerText.trim()) || 0,
          ppOpportunities: parseFloat(cells[4]?.innerText.trim()) || 0,
          minorsPerGame: parseFloat(cells[5]?.innerText.trim()) || 0,
          penaltiesPerGame: parseFloat(cells[6]?.innerText.trim()) || 0,
          pimPerGame: parseFloat(cells[7]?.innerText.trim()) || 0,
          penaltyHomePercentage: cells[8]?.innerText.trim(),
          avgPenaltyDiff: parseFloat(cells[9]?.innerText.trim()) || 0,
          homeWinPercentage: cells[10]?.innerText.trim(),
          gamesToOT: cells[11]?.innerText.trim(),
        };
      });
    });

    console.log(`✅ Scraped ${referees.length} referees.`);

    if (referees.length === 0) {
      console.error("❌ No referees found. Check the website's structure.");
      return;
    }

    // Filter out "Unknown" and "NHL Average"
    const validReferees = referees.filter(
      (ref) => ref.name !== "Unknown" && ref.name !== "NHL Average"
    );
    console.log(`✅ Filtered to ${validReferees.length} valid referees.`);

    const filePath = path.join(process.cwd(), "data", "referees.json");
    console.log(`📝 Writing data to ${filePath}...`);
    fs.writeFileSync(filePath, JSON.stringify(validReferees, null, 2));
    console.log("✅ Data written successfully!");

    await browser.close();
  } catch (error) {
    console.error("❌ Error scraping referee data:", error);
    process.exit(1);
  }
}

scrapeRefereeData();
