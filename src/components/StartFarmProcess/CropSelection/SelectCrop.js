import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from '@chakra-ui/react'
import CropSelectionCard from 'components/Cards/CropSelectionCard'

const SelectCrop = ({ crops }) => (
  <Grid templateRows={{ md: 'repeat(3, 1fr)' }}>
    {crops.map(crop => (
      <CropSelectionCard key={crop.id} title={crop.title} acres={crop.acres} />
    ))}
  </Grid>
)

SelectCrop.propTypes = {
  crops: PropTypes.array.isRequired
}

export default SelectCrop
