import type { Block } from 'payload'
import { markdownField } from '../utils/markdownField'

/**
 * Block: FAQ Section
 * A reusable FAQ block containing a title and an array of question/answer pairs
 * Can be used in Pages collection and Globals
 */
export const faqBlock: Block = {
  slug: 'faq',
  labels: {
    singular: 'FAQ Section',
    plural: 'FAQ Sections',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'questions',
      type: 'array',
      labels: {
        singular: 'Question',
        plural: 'Questions',
      },
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
        },
        markdownField({
          fieldName: 'answerMarkdown',
          description: 'Answer content (stored as markdown)',
          required: true,
        }),
      ],
      admin: {
        components: {
          RowLabel: '/components/ArrayRowLabel',
        },
      },
    },
  ],
}
