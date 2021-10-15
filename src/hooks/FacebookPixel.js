import React from 'react'

function FacebookPixel() {
  React.useEffect(() => {
    import('react-facebook-pixel')
      .then(x => x.default)
      .then(ReactPixel => {
        ReactPixel.init('2143795925947401')
        ReactPixel.pageView()
      })
  })
  return null
}

export default FacebookPixel
