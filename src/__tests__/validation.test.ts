import { describe, it, expect } from 'vitest';
import { sanitizeInput, validateForm } from '../utils/validation';

describe('sanitizeInput', () => {
  it('should remove HTML tags', () => {
    expect(sanitizeInput('<script>alert("xss")</script>test')).toBe('alert("xss")test');
    expect(sanitizeInput('<b>Bold</b> text')).toBe('Bold text');
    expect(sanitizeInput('<div><p>Nested</p></div>')).toBe('Nested');
  });

  it('should trim whitespace', () => {
    expect(sanitizeInput('  spaced  ')).toBe('spaced');
    expect(sanitizeInput('\n\ttab\t\n')).toBe('tab');
  });

  it('should handle empty strings', () => {
    expect(sanitizeInput('')).toBe('');
    expect(sanitizeInput('   ')).toBe('');
  });

  it('should not modify clean input', () => {
    expect(sanitizeInput('Clean text 123')).toBe('Clean text 123');
    expect(sanitizeInput('Email: test@example.com')).toBe('Email: test@example.com');
  });
});

describe('validateForm', () => {
  describe('Name validation', () => {
    it('should accept valid names', () => {
      expect(validateForm('John Doe', 'Valid Topic', 'Valid message here')).toBeNull();
      expect(validateForm('A B', 'Valid Topic', 'Valid message here')).toBeNull();
    });

    it('should reject names that are too short', () => {
      const error = validateForm('A', 'Valid Topic', 'Valid message here');
      expect(error).toBe('Name must be between 2 and 100 characters.');
    });

    it('should reject names that are too long', () => {
      const longName = 'A'.repeat(101);
      const error = validateForm(longName, 'Valid Topic', 'Valid message here');
      expect(error).toBe('Name must be between 2 and 100 characters.');
    });
  });

  describe('Topic validation', () => {
    it('should accept valid topics', () => {
      expect(validateForm('John Doe', 'Valid Topic', 'Valid message here')).toBeNull();
      expect(validateForm('John Doe', 'ABC', 'Valid message here')).toBeNull();
    });

    it('should reject topics that are too short', () => {
      const error = validateForm('John Doe', 'AB', 'Valid message here');
      expect(error).toBe('Topic must be between 3 and 200 characters.');
    });

    it('should reject topics that are too long', () => {
      const longTopic = 'A'.repeat(201);
      const error = validateForm('John Doe', longTopic, 'Valid message here');
      expect(error).toBe('Topic must be between 3 and 200 characters.');
    });
  });

  describe('Message validation', () => {
    it('should accept valid messages', () => {
      expect(validateForm('John Doe', 'Valid Topic', 'This is a valid message')).toBeNull();
      expect(validateForm('John Doe', 'Valid Topic', '1234567890')).toBeNull();
    });

    it('should reject messages that are too short', () => {
      const error = validateForm('John Doe', 'Valid Topic', 'Short');
      expect(error).toBe('Message must be between 10 and 1000 characters.');
    });

    it('should reject messages that are too long', () => {
      const longMessage = 'A'.repeat(1001);
      const error = validateForm('John Doe', 'Valid Topic', longMessage);
      expect(error).toBe('Message must be between 10 and 1000 characters.');
    });
  });

  describe('XSS pattern detection', () => {
    it('should detect script tags', () => {
      const error = validateForm('John Doe', '<script>alert("xss")</script>', 'Valid message here');
      expect(error).toBe('Invalid input detected. Please remove any special characters or code.');
    });

    it('should detect javascript: protocol', () => {
      const error = validateForm('John Doe', 'Valid Topic', 'javascript:alert("xss")');
      expect(error).toBe('Invalid input detected. Please remove any special characters or code.');
    });

    it('should detect inline event handlers', () => {
      const error = validateForm('John Doe', 'onclick=alert(1)', 'Valid message here');
      expect(error).toBe('Invalid input detected. Please remove any special characters or code.');

      const error2 = validateForm('John Doe', 'Valid Topic', 'test onerror=alert(1)');
      expect(error2).toBe('Invalid input detected. Please remove any special characters or code.');
    });

    it('should detect iframe tags', () => {
      const error = validateForm('John Doe', 'Valid Topic', '<iframe src="evil"></iframe>');
      expect(error).toBe('Invalid input detected. Please remove any special characters or code.');
    });

    it('should be case insensitive for patterns', () => {
      const error1 = validateForm('John Doe', '<SCRIPT>alert(1)</SCRIPT>', 'Valid message');
      expect(error1).toBe('Invalid input detected. Please remove any special characters or code.');

      const error2 = validateForm('John Doe', 'Valid Topic', 'JAVASCRIPT:alert(1)');
      expect(error2).toBe('Invalid input detected. Please remove any special characters or code.');
    });
  });

  describe('Edge cases', () => {
    it('should handle special characters in valid input', () => {
      expect(
        validateForm("John O'Brien", 'Question about pricing', 'How much for enterprise?')
      ).toBeNull();

      expect(validateForm('José García', 'Español', 'Mensaje en español válido')).toBeNull();
    });

    it('should handle unicode characters', () => {
      expect(validateForm('用户', 'Valid Topic', 'Valid message with 中文 characters')).toBeNull();
    });

    it('should handle numbers and symbols in valid context', () => {
      expect(
        validateForm('John Doe', 'Question #1', 'What is 2+2? Please email me@example.com')
      ).toBeNull();
    });
  });
});
