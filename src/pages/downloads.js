/* eslint-disable no-console */
import React, { useEffect, useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { Box, useToast } from '@chakra-ui/react'
import useApi from 'context/api'
import FetchCard from 'components/FetchCard'
import { saveAs } from 'file-saver'
import { useLocation } from 'react-router-dom'

const Downloads = ({ data }) => {
  const useQuery = () => new URLSearchParams(useLocation().search)
  const [loading, setLoading] = useState(false)
  const [reload, setReload] = useState(0)
  const [error, setError] = useState(null)
  const toast = useToast()
  const { downloadFile } = useApi()

  const triggerReload = () => setReload(p => p + 1)

  const _downloadFile = useCallback(
    async query => {
      try {
        setLoading(true)
        const res = await downloadFile('orders', query)
        let blob = new Blob([res.data], {
          type: 'application/pdf;charset=utf-8'
        })
        toast({
          title: 'Download starting',
          status: 'success',
          duration: 5000,
          position: 'top-right'
        })
        saveAs(blob, `${query.reference}-agreement.pdf`)
      } catch (error) {
        toast({
          title: 'Download failed',
          description:
            error?.message || error?.data?.message || 'Unexpected error.',
          status: 'error',
          duration: 5000,
          position: 'top-right'
        })

        setError(error?.message || error?.data?.message || 'Unexpected error')
      } finally {
        setLoading(false)
      }
    },
    [downloadFile, toast]
  )
  let query = useQuery()
  let type = query.get('type')
  let reference = query.get('reference')
  useEffect(() => {
    let mounted = true
    if (mounted && type && reference) {
      _downloadFile({
        type: type,
        reference: reference
      })
    }

    return () => (mounted = false)
  }, [_downloadFile, reference, type, reload])
  return (
    <Box>
      {(error || loading) && (
        <FetchCard
          m='auto'
          align='center'
          justify='center'
          reload={triggerReload}
          loading={loading}
          error={error}
          text='downloading file'
        />
      )}
    </Box>
  )
}

Downloads.propTypes = { data: PropTypes.any, match: PropTypes.any }

export default Downloads
