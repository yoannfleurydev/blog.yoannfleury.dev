import slugify from "slugify";

export function slug(text) {
  if (typeof text === "string") {
    return slugify(text, {
      lower: true,
      strict: true,
      replacement: "_",
    });
  }

  return "";
}
