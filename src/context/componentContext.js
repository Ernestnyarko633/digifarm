import React,{useState, createContext} from 'react'
import PropTypes from 'prop-types'

export const componentContext = createContext()

const ComponentContextProvider = ({children}) => {
    const [modal, setModal] = useState(false)

    const handleModalOpen = () => {
        console.log('hello')
        setModal(e => !e)
    }
    return(
        <componentContext.Provider 
            value={{ modal,handleModalOpen}}
        >
            {children}
        </componentContext.Provider>
    ) 
}

ComponentContextProvider.propTypes = {
    children: PropTypes.node.isRequired
}

export default ComponentContextProvider