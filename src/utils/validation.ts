/**
 * Input sanitization and validation utilities
 */

/**
 * Sanitizes user input by removing HTML tags and trimming whitespace
 */
export function sanitizeInput(input: string): string {
  return input.replace(/<[^>]*>/g, '').trim();
}

/**
 * Validates form input for the contact form
 * Returns error message if validation fails, null otherwise
 */
export function validateForm(
  name: string,
  topic: string,
  message: string
): string | null {
  // Length validation
  if (name.length < 2 || name.length > 100) {
    return 'Name must be between 2 and 100 characters.';
  }
  if (topic.length < 3 || topic.length > 200) {
    return 'Topic must be between 3 and 200 characters.';
  }
  if (message.length < 10 || message.length > 1000) {
    return 'Message must be between 10 and 1000 characters.';
  }

  // Check for suspicious patterns (basic XSS prevention)
  const suspiciousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i, // onclick=, onerror=, etc.
    /<iframe/i,
  ];

  const allText = name + topic + message;
  for (const pattern of suspiciousPatterns) {
    if (pattern.test(allText)) {
      return 'Invalid input detected. Please remove any special characters or code.';
    }
  }

  return null;
}
