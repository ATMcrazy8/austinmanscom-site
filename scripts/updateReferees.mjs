import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";

const REFEREE_STATS_URL = "https://scoutingtherefs.com/2024-25-nhl-referee-stats/";

async function scrapeRefereeData() {
  try {
    console.log("🚀 Launching Puppeteer...");
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    console.log("🌍 Navigating to page...");
    await page.goto(REFEREE_STATS_URL, { waitUntil: "networkidle2" });

    await page.goto(REFEREE_STATS_URL, {
      waitUntil: "domcontentloaded", // or "networkidle0" if it's slow
    });    

    console.log("⏳ Checking if the table exists...");
    const tableExists = await page.evaluate(() => !!document.querySelector("#tablepress-226 tbody"));
    if (!tableExists) {
      throw new Error("❌ Table not found on the page. Website structure may have changed.");
    }
    console.log("✅ Table found! Proceeding with data extraction...");

    console.log("🔄 Waiting for table to load...");
    await page.waitForSelector("#tablepress-226 tbody tr");

    console.log("📦 Extracting referee data...");
    const referees = await page.evaluate(() => {
      return Array.from(document.querySelectorAll("#tablepress-226 tbody tr")).map(row => {
        const cells = row.querySelectorAll("td");
        return {
          name: cells[0]?.innerText.trim() || "Unknown",
          refNumber: parseInt(cells[1]?.innerText.trim()) || null,
          totalGames: parseInt(cells[2]?.innerText.trim()) || 0,
          goalsPerGame: parseFloat(cells[3]?.innerText.trim()) || 0,
          ppOpportunities: parseFloat(cells[4]?.innerText.trim()) || 0,
          minutesPerGame: parseFloat(cells[5]?.innerText.trim()) || 0,
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

    const filePath = path.join(process.cwd(), "data", "referees.json");
    const filteredReferees = referees.filter(ref => ref.name !== "Unknown" && ref.name !== "NHL Average");
    fs.writeFileSync(filePath, JSON.stringify(filteredReferees, null, 2));

    console.log("✅ Referees data updated successfully!");
    await browser.close();
  } catch (error) {
    console.error("❌ Error scraping referee data:", error);
  }
}

// Run the script
scrapeRefereeData();
