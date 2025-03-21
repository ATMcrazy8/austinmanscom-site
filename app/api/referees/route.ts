import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    // Get path to JSON file
    const filePath = path.join(process.cwd(), "data", "referees.json");

    // Read file and parse JSON
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error loading referees:", error);
    return NextResponse.json({ error: "Failed to load referees" }, { status: 500 });
  }
}
