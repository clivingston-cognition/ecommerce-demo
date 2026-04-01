import { test, expect } from "@playwright/test";

/**
 * UI tests for the Lowes demo home page.
 *
 * These tests verify layout structure, content, and basic functionality.
 * They are framework-agnostic — they check rendered HTML output, not
 * React internals — so they should pass on both React 16 and React 18.
 */

test.describe("Navbar", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("renders promo bar with SpringFest message", async ({ page }) => {
    const promo = page.locator(".demo-promo-bar");
    await expect(promo).toBeVisible();
    await expect(promo).toContainText("SpringFest");
    await expect(promo).toContainText("Shop Now");
  });

  test("renders logo image", async ({ page }) => {
    const logo = page.locator('img[alt="Lowe\'s Home Improvement"]');
    await expect(logo).toBeVisible();
  });

  test("renders search bar with placeholder text", async ({ page }) => {
    const search = page.locator(
      'input[placeholder="What can we help you find?"]'
    );
    await expect(search).toBeVisible();
  });

  test("renders search button", async ({ page }) => {
    const btn = page.locator('button[aria-label="Search"]');
    await expect(btn).toBeVisible();
  });

  test("renders store selector", async ({ page }) => {
    const store = page.locator(".demo-store-selector");
    await expect(store).toContainText("San Francisco");
  });

  test("renders nav icons (Mylow, Sign In, Cart)", async ({ page }) => {
    await expect(page.getByText("Mylow")).toBeVisible();
    await expect(page.getByText("Sign In")).toBeVisible();
    await expect(page.getByText("Cart")).toBeVisible();
  });

  test("renders category navigation with key items", async ({ page }) => {
    const nav = page.locator('[aria-label="Category navigation"]');
    await expect(nav).toBeVisible();
    await expect(nav).toContainText("Shop All");
    await expect(nav).toContainText("Installations");
    await expect(nav).toContainText("Deals");
    await expect(nav).toContainText("Design & Ideas");
    await expect(nav).toContainText("Appliances");
    await expect(nav).toContainText("Bathroom");
    await expect(nav).toContainText("Lawn & Garden");
    await expect(nav).toContainText("Tools");
    await expect(nav).toContainText("Paint");
  });
});

test.describe("Home Page Sections", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("renders recommended search pills", async ({ page }) => {
    await expect(page.getByText("Recommended Searches")).toBeVisible();
    await expect(page.getByText("Electric Range")).toBeVisible();
    await expect(page.getByText("Washing Machine")).toBeVisible();
    await expect(page.getByText("Bathroom Vanity")).toBeVisible();
  });

  test("renders 6 deal cards with titles and prices", async ({ page }) => {
    const dealCards = page.locator(".demo-deal-card");
    await expect(dealCards).toHaveCount(6);

    await expect(page.getByRole("heading", { name: "Select Mulch" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Garden Soil" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Grass Seed" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Grills & Accessories" })).toBeVisible();
  });

  test("renders product carousel section with heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Shop Fresh Savings for Spring" })
    ).toBeVisible();
  });

  test("renders product carousel tabs", async ({ page }) => {
    await expect(page.getByRole("button", { name: "Top Picks" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Outdoors" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Plumbing" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Flooring" })).toBeVisible();
  });

  test("renders 12 product cards in carousel", async ({ page }) => {
    const cards = page.locator(".demo-carousel-card");
    await expect(cards).toHaveCount(12);
  });

  test("product cards show name, price, rating, and bought count", async ({
    page,
  }) => {
    const firstCard = page.locator(".demo-carousel-card").first();
    await expect(firstCard).toContainText("Cordless Drill/Driver Kit 20V");
    await expect(firstCard).toContainText("$89.99");
    await expect(firstCard).toContainText("bought last week");
    // star rating rendered
    await expect(firstCard.locator(".demo-stars")).toBeVisible();
  });

  test("renders lifestyle sections with headings", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Celebrate Spring With Style" })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Refresh Your Landscape" })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Explore Favorites" })
    ).toBeVisible();
  });

  test("renders popular categories grid", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Popular Categories" })
    ).toBeVisible();
    const items = page.locator(".demo-popular-item");
    // 19 popular categories
    await expect(items).toHaveCount(19);
  });

  test("renders projects section with 6 project cards", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        name: "Renew Your Home With Projects & Updates",
      })
    ).toBeVisible();
    const projects = page.locator(".demo-project-card");
    await expect(projects).toHaveCount(6);
    await expect(page.getByRole("heading", { name: "How to Build a Deck" })).toBeVisible();
  });
});

test.describe("Footer", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("renders footer with column headings", async ({ page }) => {
    const footer = page.locator(".demo-footer");
    await expect(footer).toBeVisible();
    await expect(footer.getByRole("heading", { name: "Who We Are" })).toBeVisible();
    await expect(footer.getByRole("heading", { name: "Customer Service" })).toBeVisible();
    await expect(footer.getByRole("heading", { name: "Services" })).toBeVisible();
    await expect(footer.getByRole("heading", { name: "Resources" })).toBeVisible();
    await expect(footer.getByRole("heading", { name: "Connect" })).toBeVisible();
  });

  test("renders newsletter signup", async ({ page }) => {
    await expect(
      page.getByText("Sign up for deals & project ideas")
    ).toBeVisible();
    await expect(
      page.locator('input[placeholder="Enter email address"]')
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "Sign Up" })).toBeVisible();
  });

  test("renders copyright notice", async ({ page }) => {
    await expect(page.getByText("2026 Lowe's. All rights reserved")).toBeVisible();
  });

  test("renders social links", async ({ page }) => {
    await expect(page.locator('a[title="Facebook"]')).toBeVisible();
    await expect(page.locator('a[title="Twitter"]')).toBeVisible();
    await expect(page.locator('a[title="Instagram"]')).toBeVisible();
  });
});

test.describe("Links and Navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("logo links to home page", async ({ page }) => {
    const logoLink = page.locator('a:has(img[alt="Lowe\'s Home Improvement"])');
    await expect(logoLink).toHaveAttribute("href", "/");
  });

  test("deal cards are clickable links", async ({ page }) => {
    const firstDeal = page.locator(".demo-deal-card").first();
    const href = await firstDeal.getAttribute("href");
    expect(href).toBeTruthy();
  });

  test("product cards are clickable links", async ({ page }) => {
    const firstProduct = page.locator(".demo-carousel-card").first();
    const href = await firstProduct.getAttribute("href");
    expect(href).toBeTruthy();
  });

  test("category nav links have correct hrefs", async ({ page }) => {
    const appliancesLink = page.locator(
      '[aria-label="Category navigation"] a:has-text("Appliances")'
    );
    await expect(appliancesLink).toHaveAttribute("href", "/t-shirts");
  });
});

test.describe("Page Meta", () => {
  test("has correct page title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Lowe.*Home Improvement/);
  });
});
