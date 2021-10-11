import React from 'react'
import { Box } from '@chakra-ui/react'
import FetchCard from './index'
import PropTypes from 'prop-types'

/**
 * Spinner
 * @description Renders a spinner when making an api call before returning a component after success. on error renders a button to retry
 * @component Spinner
 * @author Whitson William Nyarko Dzimah <whitsonwilliam@icloud.com>
 * @param {Object} props Properties of Spinner
 * @param {JSX.Element} props.children - JSX Elements, usually nodes
 * @param {Object} props.hook - hook object
 * @param {boolean} props.hook.loading - is loading
 * @param {any} props.hook.error - has error
 * @param {Object} props.hook.triggerReload - triggers refetching if unsuccessful
 * @param {string} props.hook.loadingText - Text to render when loading
 * @param {Object|number|string} props.justify - justify content
 * @param {Object|number|string} props.w - width
 * @param {Object|number|string} props.h - height
 * @param {Object|number|string} props.align - align items
 * @param {...*} rest
 *
 */

const Spinner = ({ children, hook, justify, w, h, align, ...rest }) => {
  const { loading, error, triggerReload, loadingText } = hook
  return (
    <Box w='100%'>
      {loading || error ? (
        <FetchCard
          {...rest}
          align={align || 'center'}
          justify={justify || 'center'}
          w={w || '100%'}
          h={h || '100vh'}
          text={loadingText}
          loading={loading}
          error={error}
          reload={() => triggerReload()}
        />
      ) : (
        children
      )}
    </Box>
  )
}

Spinner.propTypes = {
  hook: PropTypes.object.isRequired,
  align: PropTypes.any,
  w: PropTypes.any,
  h: PropTypes.any,
  justify: PropTypes.any,
  children: PropTypes.node
}

export default Spinner
