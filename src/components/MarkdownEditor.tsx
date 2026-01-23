'use client'

import React, { useEffect, useState } from 'react'
import { useField } from '@payloadcms/ui'
import type { TextareaFieldClientComponent } from 'payload'
import dynamic from 'next/dynamic'

// Dynamically import MDEditor to avoid SSR issues
// @uiw/react-md-editor uses CodeMirror which requires browser APIs
const MDEditor = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          padding: '20px',
          textAlign: 'center',
          height: '500px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        Loading editor...
      </div>
    ),
  }
)

/**
 * Custom Markdown Editor component for Payload CMS
 * Uses @uiw/react-md-editor with toolbar and preview
 */
const MarkdownEditor: TextareaFieldClientComponent = ({
  path,
  field,
}) => {
  const { value, setValue, errorMessage } = useField<string>({ path })
  const [markdown, setMarkdown] = useState<string>(value || '')

  // Sync external value changes to internal state
  useEffect(() => {
    setMarkdown(value || '')
  }, [value])

  // Handle editor change
  const handleChange = (val?: string) => {
    const newValue = val || ''
    setMarkdown(newValue)
    setValue(newValue)
  }

  // Handle label - can be string, object (i18n), or function
  const getLabel = (): string => {
    if (!field?.label) return field?.name || ''
    if (typeof field.label === 'string') return field.label
    if (typeof field.label === 'object') {
      // For i18n objects, use the default or first value
      return (Object.values(field.label)[0] as string) || field?.name || ''
    }
    return field?.name || ''
  }

  // Handle description - can be string, object (i18n), or function
  const getDescription = (): string => {
    if (!field?.admin?.description) return ''
    if (typeof field.admin.description === 'string')
      return field.admin.description
    if (typeof field.admin.description === 'object') {
      // For i18n objects, use the default or first value
      return (Object.values(field.admin.description)[0] as string) || ''
    }
    return ''
  }

  const label = getLabel()
  const description = getDescription()
  const required = field?.required

  return (
    <div className="markdown-editor-wrapper">
      {label && (
        <label
          className="field-label"
          style={{ marginBottom: '8px', display: 'block' }}
        >
          {label}
          {required && (
            <span style={{ color: 'red', marginLeft: '4px' }}>*</span>
          )}
        </label>
      )}
      {description && (
        <div
          className="field-description"
          style={{
            marginBottom: '8px',
            color: '#666',
            fontSize: '14px',
          }}
        >
          {description}
        </div>
      )}
      <div
        style={{
          border: errorMessage
            ? '1px solid red'
            : '1px solid #e0e0e0',
          borderRadius: '4px',
          overflow: 'hidden',
        }}
      >
        <MDEditor
          value={markdown}
          onChange={handleChange}
          preview="live"
          visibleDragbar={true}
          data-color-mode="light"
          height={500}
        />
      </div>
      {errorMessage && (
        <div style={{ color: 'red', marginTop: '4px', fontSize: '14px' }}>
          {errorMessage}
        </div>
      )}
    </div>
  )
}

export default MarkdownEditor
