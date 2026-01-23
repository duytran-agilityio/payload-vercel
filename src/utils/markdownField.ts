import type { Field } from 'payload';
import { z } from 'zod';

/**
 * Field name validation regex: must start with letter or underscore,
 * followed by alphanumeric characters and underscores only
 */
const FIELD_NAME_REGEX = /^[a-zA-Z_][a-zA-Z0-9_]*$/;

const markdownFieldOptionsSchema = z
  .object({
    /**
     * Name of the markdown field (default: 'content')
     * For backward compatibility, also accepts 'markdownFieldName'
     */
    fieldName: z
      .string()
      .min(1, 'fieldName cannot be empty')
      .regex(
        FIELD_NAME_REGEX,
        'fieldName must start with a letter or underscore and contain only alphanumeric characters and underscores',
      )
      .optional(),
    /**
     * Legacy: Name of the markdown storage field (for backward compatibility)
     */
    markdownFieldName: z
      .string()
      .min(1, 'markdownFieldName cannot be empty')
      .regex(
        FIELD_NAME_REGEX,
        'markdownFieldName must start with a letter or underscore and contain only alphanumeric characters and underscores',
      )
      .optional(),
    /**
     * Description for the markdown editor field
     */
    description: z.string().optional(),
    /**
     * Whether the markdown field is required
     */
    required: z.boolean().optional().default(false),
  })
  .transform((data) => {
    // Support both new API (fieldName) and legacy API (markdownFieldName)
    const fieldName = data.fieldName || data.markdownFieldName || 'content';
    return {
      fieldName,
      description: data.description,
      required: data.required ?? false,
    };
  });

type MarkdownFieldOptions = z.infer<typeof markdownFieldOptionsSchema>;

/**
 * Creates a markdown field configuration with a custom markdown editor.
 * The content is edited using a markdown editor with toolbar and preview.
 *
 * Returns a single textarea field with a custom editor component.
 *
 * @param options Configuration options
 * @returns Field configuration
 * @throws {z.ZodError} If options validation fails
 */
export function markdownField(options: Partial<MarkdownFieldOptions> = {}): Field {
  // Validate and parse options using Zod
  const validatedOptions = markdownFieldOptionsSchema.parse(options);

  const { fieldName, description, required } = validatedOptions;

  return {
    name: fieldName,
    type: 'textarea',
    required,
    // Custom validation that allows long text content
    // PostgreSQL TEXT can handle very long strings (up to 1GB)
    validate: (value: string | null | undefined) => {
      if (required && (!value || typeof value !== 'string' || value.trim() === '')) {
        return 'This field is required';
      }
      // Allow any length - PostgreSQL TEXT can handle very long strings
      return true;
    },
    admin: {
      description,
      components: {
        Field: '/components/MarkdownEditor',
      },
    },
  };
}
