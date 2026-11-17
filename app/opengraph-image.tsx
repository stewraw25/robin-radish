import { shareContentType, shareImage, shareSize } from "@/lib/share-image";

export const alt = "Robin & Radish: grow food and feed garden birds in the UK";
export const size = shareSize;
export const contentType = shareContentType;

export default function Image() {
  return shareImage("Grow food. Feed the birds.", "A UK guide to the vegetable bed and the feeder.");
}
