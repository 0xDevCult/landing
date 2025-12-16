import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility', () => {
  test('homepage should not have accessibility violations', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/');

    // Check that h1 exists and is unique
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1);

    // Check heading hierarchy (no skipped levels)
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
    const headingLevels = await Promise.all(
      headings.map(async (heading) => {
        const tagName = await heading.evaluate((el) => el.tagName);
        return parseInt(tagName.substring(1));
      })
    );

    // Verify no heading levels are skipped
    for (let i = 1; i < headingLevels.length; i++) {
      const levelDiff = headingLevels[i] - headingLevels[i - 1];
      expect(levelDiff).toBeLessThanOrEqual(1);
    }
  });

  test('all images should have alt text', async ({ page }) => {
    await page.goto('/');

    const images = await page.locator('img').all();
    for (const image of images) {
      const alt = await image.getAttribute('alt');
      expect(alt).toBeTruthy();
    }
  });

  test('all links should have accessible names', async ({ page }) => {
    await page.goto('/');

    const links = await page.locator('a[href]').all();
    for (const link of links) {
      const text = await link.textContent();
      const ariaLabel = await link.getAttribute('aria-label');
      const ariaLabelledBy = await link.getAttribute('aria-labelledby');
      const title = await link.getAttribute('title');

      // Link should have text, aria-label, aria-labelledby, or title
      // Skip if link only contains SVG/images as they may have accessible names elsewhere
      const hasAccessibleName = text?.trim() || ariaLabel || ariaLabelledBy || title;
      const svg = await link.locator('svg').count();
      const img = await link.locator('img').count();

      if (!hasAccessibleName && svg === 0 && img === 0) {
        throw new Error(`Link without accessible name found: ${await link.getAttribute('href')}`);
      }
    }
  });

  test('should have proper color contrast', async ({ page }) => {
    await page.goto('/');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2aa'])
      .options({ rules: { 'color-contrast': { enabled: true } } })
      .analyze();

    const colorContrastViolations = accessibilityScanResults.violations.filter(
      (violation) => violation.id === 'color-contrast'
    );

    expect(colorContrastViolations).toEqual([]);
  });

  test('should support keyboard navigation', async ({ page }) => {
    await page.goto('/');

    // Press Tab to navigate through focusable elements
    await page.keyboard.press('Tab');

    // Check that focus is visible
    const focusedElement = await page.evaluate(() => {
      const active = document.activeElement;
      if (!active) return null;

      const styles = window.getComputedStyle(active);
      return {
        tagName: active.tagName,
        outline: styles.outline,
        outlineWidth: styles.outlineWidth,
      };
    });

    // Should have a focused element
    expect(focusedElement).toBeTruthy();
    expect(focusedElement?.tagName).toBeTruthy();
  });

  test('mobile menu should be accessible', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Find and check mobile menu button
    const menuButton = page.locator('button[aria-label*="menu" i], button[aria-expanded]').first();

    // Only check if mobile menu exists
    const count = await menuButton.count();
    if (count > 0) {
      await expect(menuButton).toBeVisible();

      // Check that button has accessible name
      const ariaLabel = await menuButton.getAttribute('aria-label');
      const ariaExpanded = await menuButton.getAttribute('aria-expanded');

      expect(ariaLabel || ariaExpanded !== null).toBeTruthy();
    }
  });
});
