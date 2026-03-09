import { useState, useEffect } from 'react'
import { resourceService } from '@services/resourceService'
import { Resource, HighSchoolFilter, UniversityFilter } from '@types'

export const useResources = (filters?: HighSchoolFilter | UniversityFilter) => {
  const [resources, setResources] = useState<Resource[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchResources = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await resourceService.getResources(filters)
        if (response.success && response.data) {
          setResources(response.data.data)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch resources')
      } finally {
        setLoading(false)
      }
    }

    fetchResources()
  }, [filters])

  return { resources, loading, error }
}
