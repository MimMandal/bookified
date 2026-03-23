'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Upload, X, ImageIcon } from 'lucide-react'
import { UploadSchema } from '@/lib/zod'
import { BookUploadFormValues } from '@/types'
import LoadingOverlay from './LoadingOverlay'

const MALE_VOICES = [
  { id: 'Dave', name: 'Dave', description: 'Young male, British-Essex, casual & conversational' },
  { id: 'Daniel', name: 'Daniel', description: 'Middle-aged male, British, authoritative but warm' },
  { id: 'Chris', name: 'Chris', description: 'Male casual & easy-going' },
]

const FEMALE_VOICES = [
  { id: 'Rachel', name: 'Rachel', description: 'Young female, American, calm & clear' },
  { id: 'Sarah', name: 'Sarah', description: 'Young female, American, soft & approachable' },
]

const UploadForm = () => {
  const [pdfFileName, setPdfFileName] = useState<string | null>(null)
  const [coverFileName, setCoverFileName] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<BookUploadFormValues>({
    resolver: zodResolver(UploadSchema),
    defaultValues: {
      title: '',
      author: '',
      voice: 'Rachel',
    },
  })

  const onPdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPdfFileName(file.name)
      form.setValue('pdf', file)
    }
  }

  const onCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setCoverFileName(file.name)
      form.setValue('coverImage', file)
    }
  }

  const removePdf = () => {
    setPdfFileName(null)
    form.setValue('pdf', undefined as any)
  }

  const removeCover = () => {
    setCoverFileName(null)
    form.setValue('coverImage', null)
  }

  const onSubmit = async (values: BookUploadFormValues) => {
    setIsLoading(true)
    try {
      // Handle form submission
      console.log('Form submitted:', values)
      // Add your API call here
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <LoadingOverlay isVisible={isLoading} message="Preparing your book..." />
      <div className="new-book-wrapper">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* PDF Upload */}
          <div>
            <label className="form-label">Book PDF File</label>
            <div
              className={`upload-dropzone border-2 border-dashed ${
                pdfFileName ? 'upload-dropzone-uploaded' : 'border-[#ddd]'
              }`}
              onClick={() => document.getElementById('pdf-input')?.click()}
            >
              {pdfFileName ? (
                <div className="flex items-center justify-between w-full px-4">
                  <span className="upload-dropzone-text">{pdfFileName}</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      removePdf()
                    }}
                    className="upload-dropzone-remove"
                  >
                    <X size={20} />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <Upload className="upload-dropzone-icon" />
                  <p className="upload-dropzone-text">Click to upload PDF</p>
                  <p className="upload-dropzone-hint">PDF file (max 50MB)</p>
                </div>
              )}
            </div>
            <input
              id="pdf-input"
              type="file"
              accept=".pdf"
              onChange={onPdfChange}
              className="hidden"
            />
            {form.formState.errors.pdf && (
              <p className="text-red-500 text-sm mt-1">{form.formState.errors.pdf.message}</p>
            )}
          </div>

          {/* Cover Image Upload */}
          <div>
            <label className="form-label">Cover Image (Optional)</label>
            <div
              className={`upload-dropzone border-2 border-dashed ${
                coverFileName ? 'upload-dropzone-uploaded' : 'border-[#ddd]'
              }`}
              onClick={() => document.getElementById('cover-input')?.click()}
            >
              {coverFileName ? (
                <div className="flex items-center justify-between w-full px-4">
                  <span className="upload-dropzone-text">{coverFileName}</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      removeCover()
                    }}
                    className="upload-dropzone-remove"
                  >
                    <X size={20} />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <ImageIcon className="upload-dropzone-icon" />
                  <p className="upload-dropzone-text">Click to upload cover image</p>
                  <p className="upload-dropzone-hint">Leave empty to auto-generate from PDF</p>
                </div>
              )}
            </div>
            <input
              id="cover-input"
              type="file"
              accept="image/*"
              onChange={onCoverChange}
              className="hidden"
            />
          </div>

          {/* Title Input */}
          <div>
            <label htmlFor="title" className="form-label">Title</label>
            <input
              id="title"
              className="form-input"
              placeholder="ex: Rich Dad Poor Dad"
              type="text"
              {...form.register('title')}
            />
            {form.formState.errors.title && (
              <p className="text-red-500 text-sm mt-1">{form.formState.errors.title.message}</p>
            )}
          </div>

          {/* Author Input */}
          <div>
            <label htmlFor="author" className="form-label">Author Name</label>
            <input
              id="author"
              className="form-input"
              placeholder="ex: Robert Kiyosaki"
              type="text"
              {...form.register('author')}
            />
            {form.formState.errors.author && (
              <p className="text-red-500 text-sm mt-1">{form.formState.errors.author.message}</p>
            )}
          </div>

          {/* Voice Selector */}
          <div>
            <label className="form-label">Choose Assistant Voice</label>
            
            {/* Male Voices */}
            <div className="mb-4">
              <p className="text-sm font-medium text-[#666] mb-3">Male Voices</p>
              <div className="voice-selector-options">
                {MALE_VOICES.map((voice) => (
                  <label
                    key={voice.id}
                    className={`voice-selector-option ${
                      form.watch('voice') === voice.id
                        ? 'voice-selector-option-selected'
                        : 'voice-selector-option-default'
                    }`}
                  >
                    <input
                      type="radio"
                      value={voice.id}
                      {...form.register('voice')}
                      className="w-4 h-4 cursor-pointer"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-[#222]">{voice.name}</p>
                      <p className="text-xs text-[#666]">{voice.description}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Female Voices */}
            <div>
              <p className="text-sm font-medium text-[#666] mb-3">Female Voices</p>
              <div className="voice-selector-options">
                {FEMALE_VOICES.map((voice) => (
                  <label
                    key={voice.id}
                    className={`voice-selector-option ${
                      form.watch('voice') === voice.id
                        ? 'voice-selector-option-selected'
                        : 'voice-selector-option-default'
                    }`}
                  >
                    <input
                      type="radio"
                      value={voice.id}
                      {...form.register('voice')}
                      className="w-4 h-4 cursor-pointer"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-[#222]">{voice.name}</p>
                      <p className="text-xs text-[#666]">{voice.description}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            
            {form.formState.errors.voice && (
              <p className="text-red-500 text-sm mt-1">{form.formState.errors.voice.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="form-btn disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Begin Synthesis
          </button>
        </form>
      </div>
    </>
  )
}

export default UploadForm