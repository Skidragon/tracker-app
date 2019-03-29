import cloudinary from "cloudinary-core";
const cloudinaryCore = new cloudinary.Cloudinary({
  cloud_name: "adventure-tracker",
  secure: true,
});
const GREY_PIN = cloudinaryCore.url("markers/grey-marker");
const CHECKED_PIN = cloudinaryCore.url("markers/green-checkmark-marker");
const YELLOW_EXCLAMATION_PIN = cloudinaryCore.url(
  "markers/yellow-exclamation-marker",
);
const RED_EXCLAMATION_PIN = cloudinaryCore.url(
  "markers/red-exclamation-marker",
);
export {
  GREY_PIN,
  CHECKED_PIN,
  YELLOW_EXCLAMATION_PIN,
  RED_EXCLAMATION_PIN,
};
