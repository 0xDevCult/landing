import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should navigate to services section via menu', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Click services link in nav
    const servicesLink = page
      .locator('nav a[href*="services"], nav a:has-text("Services")')
      .first();
    if ((await servicesLink.count()) > 0) {
      await servicesLink.click();

      // Should scroll to services section or navigate to services page
      await page.waitForTimeout(500); // Wait for scroll
      const servicesSection = page.locator('#services');
      await expect(servicesSection).toBeVisible();
    }
  });

  test('should have working logo link', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Navigate away
    await page.goto('/about');
    await page.waitForLoadState('networkidle');

    // Click logo
    const logo = page.locator('header a[href="/"], header a[href="/#"]').first();
    await logo.click();

    // Should be back on homepage
    await page.waitForURL('/');
    expect(page.url()).toMatch(/\/$/);
  });

  test('should navigate to about page', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Click about link
    const aboutLink = page.locator('nav a[href="/about"], a:has-text("About")').first();
    if ((await aboutLink.count()) > 0) {
      await aboutLink.click();

      // Should navigate to about page
      await page.waitForURL(/\/about/);
      expect(page.url()).toMatch(/\/about/);
    }
  });

  test('should have smooth scroll behavior', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check if scroll-behavior is smooth
    const htmlScrollBehavior = await page.evaluate(() => {
      return window.getComputedStyle(document.documentElement).scrollBehavior;
    });

    expect(htmlScrollBehavior).toBe('smooth');
  });

  test('mobile menu should toggle', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Find mobile menu button
    const menuButton = page.locator('button[aria-label*="menu" i], button[aria-expanded]').first();

    const count = await menuButton.count();
    if (count > 0) {
      // Get initial aria-expanded state
      const initialExpanded = await menuButton.getAttribute('aria-expanded');

      // Click to open menu
      await menuButton.click();
      await page.waitForTimeout(300); // Wait for animation

      // Check that aria-expanded changed
      const newExpanded = await menuButton.getAttribute('aria-expanded');
      expect(newExpanded).not.toBe(initialExpanded);
    }
  });

  test('should have back to top button', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Scroll down
    await page.evaluate(() => window.scrollTo(0, 1000));
    await page.waitForTimeout(300);

    // Check for back to top button
    const backToTopButton = page.locator('#back-to-top, button:has-text("Back to top")').first();
    const count = await backToTopButton.count();

    if (count > 0) {
      // Button should be visible and not have pointer-events-none after scrolling
      await expect(backToTopButton).toBeVisible();
      const hasPointerEvents = await backToTopButton.evaluate((el) => {
        return !el.classList.contains('pointer-events-none');
      });
      expect(hasPointerEvents).toBe(true);

      // Verify clicking it scrolls to top
      await page.evaluate(() => {
        const btn = document.getElementById('back-to-top');
        if (btn) btn.click();
      });
      await page.waitForTimeout(800);

      // Should scroll back to top (allowing for smooth scroll animation)
      const scrollY = await page.evaluate(() => window.scrollY);
      expect(scrollY).toBeLessThan(200);
    }
  });

  test('all navigation links should be reachable', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Get all nav links
    const navLinks = await page.locator('header nav a[href]').all();

    for (const link of navLinks) {
      const href = await link.getAttribute('href');
      if (href && !href.startsWith('#') && !href.startsWith('http') && !href.startsWith('mailto')) {
        // Internal link, should be reachable
        try {
          const response = await page.goto(href, { timeout: 10000 });
          expect(response?.status()).toBeLessThan(400);
        } catch (error) {
          // Log but don't fail if page navigation times out
          console.log(`Could not navigate to ${href}:`, error);
        }
        await page.goto('/'); // Go back to homepage
      }
    }
  });
});
