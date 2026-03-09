import React from 'react'
import { Modal } from '@components/common/Modal'
import { ResourceUploadForm, UploadFormData } from './ResourceUploadForm'

interface ResourceUploadProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: UploadFormData) => void
  loading?: boolean
}

export const ResourceUpload: React.FC<ResourceUploadProps> = ({
  isOpen,
  onClose,
  onSubmit,
  loading = false,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Upload Resource"
      size="lg"
    >
      <div className="p-6">
        <ResourceUploadForm onSubmit={onSubmit} loading={loading} />
      </div>
    </Modal>
  )
}

export type { UploadFormData }
