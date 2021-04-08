/**
 * useMap.js
 */
import { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import configs from '../utils/configs'

// Be sure to replace this with your own token

mapboxgl.accessToken = configs().MAPBOX_API

export default function useMapbox({
  center,
  onInit,
  zoom = 14,
  height = 1000
}) {
  const ref = useRef(null)
  const [map, setMap] = useState(null)
  useEffect(() => {
    const currentRef = ref.current
    if (currentRef && !map) {
      const _map = new mapboxgl.Map({
        attributionControl: false,
        container: ref.current,
        height,
        style: 'mapbox://styles/mapbox/light-v10',
        center: center[0],
        zoom: zoom
      })

      // Add navigation control (the +/- zoom buttons)
      _map.addControl(new mapboxgl.NavigationControl())
      setMap(_map)
      onInit(_map)
    }
  }, [ref, center, height, zoom, map]); // eslint-disable-line 

  return { ref }
}
