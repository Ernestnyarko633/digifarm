import { Grid } from '@chakra-ui/react'
import CropSelectionCard from 'components/Cards/CropSelectionCard'
import React from 'react'

const SelectCrop = ({ crops }) => (
  <Grid templateRows={{ md: 'repeat(3, 1fr)' }}>
    {crops.map((crop) => (
      <CropSelectionCard key={crop.id} title={crop.title} acres={crop.acres} />
    ))}
  </Grid>
)

export default SelectCrop
