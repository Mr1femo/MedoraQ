/**
 * Google Apps Script — Macro Discovery Form Backend
 *
 * SETUP INSTRUCTIONS:
 * 1. Create a new Google Sheet
 * 2. Go to Extensions → Apps Script
 * 3. Paste this entire file into Code.gs
 * 4. Run `setupSheet` once (authorize when prompted)
 * 5. Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 6. Copy the Web App URL into your Vercel env: NEXT_PUBLIC_GOOGLE_SCRIPT_URL
 */

const SHEET_NAME = "Submissions";

function setupSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }

  const headers = [
    "Timestamp",
    "Email",
    "Full Name",
    "Company",
    "Job Title",
    "Work Email",
    "Phone",
    "LinkedIn",
    "Website",
    "Employees",
    "Annual Revenue",
    "Industry",
    "Business Goals",
    "Challenges",
    "Marketing Strategy",
    "Marketing Channels",
    "Marketing Satisfaction",
    "Monthly Budget",
    "Hear About Us",
    "Services Interested",
    "Preferred Communication",
    "Preferred Call Time",
    "Project Deadline",
    "Additional Info",
    "Business Stage",
    "Target Audience",
    "Competitors",
    "USP",
    "Track Performance",
    "Dedicated Marketing Team",
    "Marketing Pain Point",
    "Desired Outcome",
    "Working With Agencies",
    "Project Budget",
    "Start Timeline",
    "Is Decision Maker",
    "Decision Maker Name",
    "Other Comments",
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length)
    .setFontWeight("bold")
    .setBackground("#15cbc4")
    .setFontColor("#ffffff");
  sheet.setFrozenRows(1);
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

    if (!sheet) {
      setupSheet();
    }

    const targetSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

    const row = [
      data.submittedAt || new Date().toISOString(),
      data.email || "",
      data.fullName || "",
      data.company || "",
      data.jobTitle || "",
      data.workEmail || "",
      data.phone || "",
      data.linkedin || "",
      data.website || "",
      data.employees || "",
      data.annualRevenue || "",
      data.industry || "",
      data.businessGoals || "",
      data.challenges || "",
      data.marketingStrategy || "",
      (data.marketingChannels || []).join(", "),
      data.marketingSatisfaction || "",
      data.monthlyBudget || "",
      data.hearAboutUs || "",
      (data.servicesInterested || []).join(", "),
      data.preferredCommunication || "",
      data.preferredCallTime || "",
      data.projectDeadline || "",
      data.additionalInfo || "",
      data.businessStage || "",
      data.targetAudience || "",
      data.competitors || "",
      data.usp || "",
      data.trackPerformance || "",
      data.dedicatedMarketingTeam || "",
      data.marketingPainPoint || "",
      data.desiredOutcome || "",
      data.workingWithAgencies || "",
      data.projectBudget || "",
      data.startTimeline || "",
      data.isDecisionMaker || "",
      data.decisionMakerName || "",
      data.otherComments || "",
    ];

    targetSheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: String(error) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "Macro Discovery Form API is running" }))
    .setMimeType(ContentService.MimeType.JSON);
}
