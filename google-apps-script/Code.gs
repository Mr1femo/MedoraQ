/**
 * Google Apps Script — Socio-demographic Form Backend
 *
 * SETUP:
 * 1. Create a Google Sheet
 * 2. Extensions → Apps Script → paste this file
 * 3. Run setupSheet once
 * 4. Deploy → Web app (Execute as: Me, Access: Anyone)
 * 5. Set NEXT_PUBLIC_GOOGLE_SCRIPT_URL in Vercel
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
    "Age",
    "Gender",
    "Occupation",
    "Education",
    "Marital Status",
    "Household Income",
    "Household Size",
    "Primary Language",
    "Chronic Health Conditions",
    "Current Health Status",
    "Exercise Frequency",
    "Sleep Hours (1-10)",
    "Do You Smoke",
    "Alcohol Consumption",
    "Preferred Communication",
    "Communication Other",
    "Health Insurance Satisfaction (1-5)",
    "Health Information Source",
    "Doctor Checkup Frequency",
    "Social Media Platforms",
    "Social Media Other",
    "Favorite Hobby",
    "Hobby Hours Per Week",
    "Product Choice Factor",
    "Own Pets",
    "Preferred Transportation",
    "Transportation Other",
    "Leisure Travel Frequency",
    "Professional Organizations",
    "Trusted News Sources",
    "Trusted News Other",
    "Favorite Cuisine",
    "Cuisine Other",
    "Eat Out Frequency",
    "Cook Or Takeout",
    "Internet Hours Per Day",
    "Primary Internet Device",
    "Smart Home Devices",
    "Shop Online Frequency",
    "Primary Online Shopping Reason",
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
    let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

    if (!sheet) {
      setupSheet();
      sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    }

    const row = [
      data.submittedAt || new Date().toISOString(),
      data.age || "",
      data.gender || "",
      data.occupation || "",
      data.education || "",
      data.maritalStatus || "",
      data.householdIncome || "",
      data.householdSize || "",
      data.primaryLanguage || "",
      data.chronicHealthConditions || "",
      data.currentHealthStatus || "",
      data.exerciseFrequency || "",
      data.sleepHours || "",
      data.doYouSmoke || "",
      data.alcoholConsumption || "",
      data.preferredCommunication || "",
      data.preferredCommunicationOther || "",
      data.healthInsuranceSatisfaction || "",
      data.healthInformationSource || "",
      data.doctorCheckupFrequency || "",
      (data.socialMediaPlatforms || []).join(", "),
      data.socialMediaOther || "",
      data.favoriteHobby || "",
      data.hobbyHoursPerWeek || "",
      data.productChoiceFactor || "",
      data.ownPets || "",
      data.preferredTransportation || "",
      data.transportationOther || "",
      data.leisureTravelFrequency || "",
      data.professionalOrganizations || "",
      (data.trustedNewsSources || []).join(", "),
      data.trustedNewsOther || "",
      data.favoriteCuisine || "",
      data.cuisineOther || "",
      data.eatOutFrequency || "",
      data.cookOrTakeout || "",
      data.internetHoursPerDay || "",
      data.primaryInternetDevice || "",
      data.smartHomeDevices || "",
      data.shopOnlineFrequency || "",
      data.primaryOnlineShoppingReason || "",
    ];

    sheet.appendRow(row);

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
    .createTextOutput(JSON.stringify({ status: "Socio-demographic Form API is running" }))
    .setMimeType(ContentService.MimeType.JSON);
}
