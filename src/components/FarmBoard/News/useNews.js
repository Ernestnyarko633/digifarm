import { useState, useEffect } from 'react'

const useNews = ({ content }) => {
  const [show, setShow] = useState(false)
  const handleToggle = () => setShow(!show)
  const [items, setItems] = useState([])
  const [selectedItem, setSelectedItem] = useState({})
  const [activeIndex, setActiveIndex] = useState(0)

  const handleClick = (value, array, index, indexFunc, selectedItemFunc) => {
    const subject =
      index + value === 0 ||
      index + value > array.length - 1 ||
      index + value < 0
        ? 0
        : index + value
    indexFunc(subject)
    selectedItemFunc(array[subject])
  }

  useEffect(() => {
    let mounted = true
    let array = content?.data ? [content?.data] : []

    if (array.length && mounted) {
      setItems(array)
      setSelectedItem(array[0])
    }

    return () => (mounted = false)
  }, [content?.data])

  return {
    selectedItem,
    handleClick,
    handleToggle,
    activeIndex,
    setActiveIndex,
    items,
    show
  }
}

export default useNews
