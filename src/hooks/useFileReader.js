import { useEffect, useState, useRef } from 'react'

const useFileReader = fileData => {
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState(undefined)

  const ref = useRef()

  useEffect(() => {
    if (fileData && fileData !== ref.current) {
      ref.current = fileData
      setLoading(true)
      const reader = new window.FileReader()
      reader.onloadend = () => {
        setLoading(false)
        setFile(reader.result)
      }
      reader.readAsDataURL(fileData)
    }
  }, [fileData])

  return { loading, file }
}

export default useFileReader
