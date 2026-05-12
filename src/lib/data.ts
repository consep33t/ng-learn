import { query } from "./db";

// Force all fetches to be dynamic (no cache)
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function getSiteSettings() {
  try {
    const res = await query("SELECT key, value FROM site_settings");
    const settings: Record<string, string> = {};
    res.rows.forEach((row) => {
      settings[row.key] = row.value;
    });
    return settings;
  } catch (err) {
    console.error("Failed to fetch settings:", err);
    return {};
  }
}

export async function getActivePrograms() {
  try {
    const res = await query(
      "SELECT * FROM programs WHERE is_active = true ORDER BY sort_order ASC"
    );
    return res.rows;
  } catch (err) {
    console.error("Failed to fetch programs:", err);
    return [];
  }
}

export async function getActiveTestimonials() {
  try {
    const res = await query(
      "SELECT * FROM testimonials WHERE is_active = true ORDER BY created_at DESC"
    );
    return res.rows;
  } catch (err) {
    console.error("Failed to fetch testimonials:", err);
    return [];
  }
}

export async function getActiveFaqs() {
  try {
    const res = await query(
      "SELECT * FROM faqs WHERE is_active = true ORDER BY sort_order ASC"
    );
    return res.rows;
  } catch (err) {
    console.error("Failed to fetch FAQs:", err);
    return [];
  }
}

export async function getActiveHeroSlides() {
  try {
    const res = await query(
      "SELECT * FROM hero_slides WHERE is_active = true ORDER BY sort_order ASC"
    );
    return res.rows;
  } catch (err) {
    console.error("Failed to fetch hero slides:", err);
    return [];
  }
}

export async function getGalleryItems() {
  try {
    const res = await query(
      "SELECT * FROM gallery WHERE is_active = true ORDER BY sort_order ASC"
    );
    return res.rows;
  } catch (err) {
    console.error("Failed to fetch gallery:", err);
    return [];
  }
}
