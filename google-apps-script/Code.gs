/**
 * Google Apps Script — Medora Discovery Call Form Backend
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
    "1. Clinic / Doctor Name",
    "2. Ideal Patient Demographic",
    "3. Clinic Services / Specialties",
    "4. Main Competitors",
    "5. Main Marketing Goal",
    "6. Medical Product Details",
    "7. Social Media Platforms",
    "8. Video Content Importance (1-5)",
    "9. Monthly Marketing Budget",
    "10. New Patients Per Month",
    "11. Communication Style",
    "12. Active Online",
    "13. Existing Branding",
    "14. Content Approver",
    "15. Medical Practice USP",
    "16. Unique Product",
    "17. Brand & Product Stand (1-10)",
    "18. On-Camera Team Members",
    "19. Filming Participants Names",
    "20. Comfortable On Camera",
    "21. Filming Available Days",
    "22. Filming Locations",
    "22b. Filming Location Other",
    "23. Filming Location Addresses",
    "24. Filming Not Permitted Areas",
    "25. Filming Safety Requirements",
    "26. Filming Restricted Dates",
    "27. Preferred Filming Hours",
    "28. Location Visit Before Filming",
    "29. Location Visit Date/Time",
    "30. Location Visit Accompaniment",
    "31. Locations Prepared Before Filming",
    "32. Products Available On Filming Day",
    "33. Additional Filming Notes",
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
      data.clinicDoctorName || "",
      data.idealPatientDemographic || "",
      data.clinicServicesSpecialties || "",
      data.mainCompetitors || "",
      data.mainMarketingGoal || "",
      data.medicalProductDetails || "",
      (data.socialMediaPlatforms || []).join(", "),
      data.videoContentImportance || "",
      data.monthlyMarketingBudget || "",
      data.newPatientsPerMonth || "",
      data.communicationStyle || "",
      data.activeOnline || "",
      data.existingBranding || "",
      data.contentApprover || "",
      data.medicalPracticeUSP || "",
      data.uniqueProduct || "",
      data.brandProductStand || "",
      (data.onCameraTeamMembers || []).join(", "),
      data.filmingParticipantsNames || "",
      data.comfortableOnCamera || "",
      (data.filmingAvailableDays || []).join(", "),
      (data.filmingLocations || []).join(", "),
      data.filmingLocationOther || "",
      data.filmingLocationAddresses || "",
      data.filmingNotPermittedAreas || "",
      data.filmingSafetyRequirements || "",
      data.filmingRestrictedDates || "",
      data.preferredFilmingHours || "",
      data.locationVisitBeforeFilming || "",
      data.locationVisitDateTime || "",
      data.locationVisitAccompaniment || "",
      data.locationsPreparedBeforeFilming || "",
      data.productsAvailableOnFilmingDay || "",
      data.additionalFilmingNotes || "",
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
    .createTextOutput(JSON.stringify({ status: "Medora Discovery Call Form API is running" }))
    .setMimeType(ContentService.MimeType.JSON);
}
