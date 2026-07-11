/**
 * Google Apps Script — Medora Discovery Call Form Backend
 *
 * SETUP:
 * 1. Create a Google Sheet
 * 2. Extensions → Apps Script → paste this file
 * 3. Run setupSheet once
 * 4. Deploy → Web app (Execute as: Me, Access: Anyone)
 * 5. Set NEXT_PUBLIC_GOOGLE_SCRIPT_URL in Vercel
 *
 * Uploaded files are saved to a Drive folder named "Medora Form Uploads"
 * and file links are written into the sheet.
 */

const SHEET_NAME = "Submissions";
const UPLOAD_FOLDER_NAME = "Medora Form Uploads";

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
    "13. Has Branding Guidelines",
    "13b. Branding Guidelines Files",
    "14. Want To Change Logo",
    "15. Logo Files",
    "16. Has Logo Variations",
    "16b. Logo Variation Files",
    "17. Brand Personality",
    "18. Content Approver",
    "19. Medical Practice USP",
    "20. Unique Product",
    "21. Brand & Product Stand (1-10)",
    "22. Liked Brand Visual Styles",
    "23. AI Image Preference",
    "24. Disliked Post Styles",
    "25. Has Product Photography",
    "25b. Product Photography Files",
    "26. Preferred Video Style",
    "27. Video Elements To Avoid",
    "28. Logo Fixed Position In Video",
    "29. On-Camera Team Members",
    "30. Filming Participants Names",
    "31. Comfortable On Camera",
    "32. Filming Available Days",
    "33. Filming Locations",
    "33b. Filming Location Other",
    "34. Filming Location Addresses",
    "35. Filming Not Permitted Areas",
    "36. Filming Safety Requirements",
    "37. Filming Restricted Dates",
    "38. Preferred Filming Hours",
    "39. Location Visit Before Filming",
    "40. Location Visit Date/Time",
    "41. Location Visit Accompaniment",
    "42. Locations Prepared Before Filming",
    "43. Products Available On Filming Day",
    "44. Additional Filming Notes",
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length)
    .setFontWeight("bold")
    .setBackground("#15cbc4")
    .setFontColor("#ffffff");
  sheet.setFrozenRows(1);
}

function getOrCreateUploadFolder() {
  const folders = DriveApp.getFoldersByName(UPLOAD_FOLDER_NAME);
  if (folders.hasNext()) {
    return folders.next();
  }
  return DriveApp.createFolder(UPLOAD_FOLDER_NAME);
}

function saveUploadedFiles(files, submissionLabel) {
  if (!files || !files.length) return "";

  const root = getOrCreateUploadFolder();
  const submissionFolder = root.createFolder(submissionLabel);
  const urls = [];

  files.forEach(function (file) {
    if (!file || !file.dataUrl) return;

    const parts = String(file.dataUrl).split(",");
    const meta = parts[0] || "";
    const base64 = parts[1] || "";
    if (!base64) return;

    const mimeMatch = meta.match(/data:([^;]+);/);
    const mimeType = (file.type || (mimeMatch && mimeMatch[1]) || "application/octet-stream");
    const blob = Utilities.newBlob(Utilities.base64Decode(base64), mimeType, file.name || "upload");
    const saved = submissionFolder.createFile(blob);
    saved.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    urls.push(saved.getUrl());
  });

  return urls.join("\n");
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

    if (!sheet) {
      setupSheet();
      sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    }

    const stamp = data.submittedAt || new Date().toISOString();
    const label = (data.clinicDoctorName || "Submission") + " — " + stamp;

    const brandingLinks = saveUploadedFiles(data.brandingGuidelinesFiles, label + " — Branding Guidelines");
    const logoLinks = saveUploadedFiles(data.logoFiles, label + " — Logo");
    const logoVariationLinks = saveUploadedFiles(data.logoVariationFiles, label + " — Logo Variations");
    const photoLinks = saveUploadedFiles(data.productPhotographyFiles, label + " — Product Photography");

    const row = [
      stamp,
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
      data.hasBrandingGuidelines || "",
      brandingLinks || data.brandingGuidelinesFileNames || "",
      data.wantToChangeLogo || "",
      logoLinks || data.logoFileNames || "",
      data.hasLogoVariations || "",
      logoVariationLinks || data.logoVariationFileNames || "",
      data.brandPersonality || "",
      data.contentApprover || "",
      data.medicalPracticeUSP || "",
      data.uniqueProduct || "",
      data.brandProductStand || "",
      data.likedBrandVisualStyles || "",
      data.aiImagePreference || "",
      data.dislikedPostStyles || "",
      data.hasProductPhotography || "",
      photoLinks || data.productPhotographyFileNames || "",
      data.preferredVideoStyle || "",
      data.videoElementsToAvoid || "",
      data.logoFixedPositionInVideo || "",
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
