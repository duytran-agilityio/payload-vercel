'use client'

import { useRowLabel } from '@payloadcms/ui'

interface RowLabelData {
  question?: string
  heading?: string
  title?: string
  item?: string
  [key: string]: unknown
}

interface ArrayRowLabelProps {
  labelPrefix?: string
  fieldNames?: string[]
}

/**
 * Generic array row label component
 * Checks for common field names (question, heading, title) in order
 * Falls back to numbered label if none found
 */
const ArrayRowLabel = ({ labelPrefix, fieldNames }: ArrayRowLabelProps = {}) => {
  const { data, rowNumber } = useRowLabel<RowLabelData>()

  // Default field names to check (in priority order)
  const defaultFieldNames = fieldNames || ['question', 'heading', 'title', 'item']

  // Find first available field value
  const labelValue = defaultFieldNames.find((fieldName) => {
    const value = data[fieldName]
    return value && typeof value === 'string' && value.trim().length > 0
  })

  // Get the actual value if found
  const fieldValue = labelValue ? (data[labelValue] as string) : null

  // Generate fallback label
  const defaultPrefix = labelPrefix || 'Item'
  const fallbackLabel = `${defaultPrefix} ${String(rowNumber).padStart(2, '0')}`

  const label = fieldValue || fallbackLabel

  return <div>{label}</div>
}

// Export both named and default for backward compatibility
export { ArrayRowLabel }
export default ArrayRowLabel

