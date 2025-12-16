import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should display landing page', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Verify we're on the homepage
    expect(page.url()).toMatch(/\/$/);

    // Verify landing page content is visible - use first h1
    await expect(page.locator('h1').first()).toBeVisible();
    await expect(page.locator('text=opensource')).toBeVisible();
    await expect(page.locator('text=heaven for devs')).toBeVisible();
  });

  test('should show services section', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check for services section
    const servicesSection = page.locator('#services');
    await expect(servicesSection).toBeVisible();

    // Verify services heading
    await expect(page.locator('text=Our Services')).toBeVisible();
  });

  test('should show clients section', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check for clients section
    const clientsSection = page.locator('#clients');
    await expect(clientsSection).toBeVisible();

    // Verify clients heading
    await expect(page.locator('text=Trusted by')).toBeVisible();
  });

  test('should have navigation menu', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check for nav elements - use first nav
    const nav = page.locator('nav').first();
    await expect(nav).toBeVisible();
  });

  test('should have correct meta tags', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check for essential meta tags
    const title = await page.title();
    expect(title).toBeTruthy();
    expect(title).toContain('DevCult');
  });

  test('should have contact section', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check for contact section
    const contactSection = page.locator('#contact');
    await expect(contactSection).toBeVisible();

    // Verify contact heading
    await expect(page.locator("text=Let's make your DevEx shine")).toBeVisible();
  });

  test('should navigate to clients section via anchor link', async ({ page }) => {
    await page.goto('/#clients');
    await page.waitForLoadState('networkidle');

    // Verify clients section is visible
    const clientsSection = page.locator('#clients');
    await expect(clientsSection).toBeVisible();
  });
});
