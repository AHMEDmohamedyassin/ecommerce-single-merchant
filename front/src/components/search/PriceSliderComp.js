import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';


const minDistance = 200;

export default function PriceSliderComp({the_value}) {
  const [value2, setValue2] = React.useState([100, 300]);

  const handleChange2 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance);
        setValue2([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValue2([clamped - minDistance, clamped]);
      }
    } else {
      setValue2(newValue);
    }
  };

  React.useEffect(() => {
    if (the_value) the_value(value2)
  } , [value2])

  return (
    <Box sx={{ width: "auto" }}>
      <Slider
        getAriaLabel={() => 'Minimum distance shift'}
        value={value2}
        onChange={handleChange2}
        valueLabelDisplay="auto"
        disableSwap
        min={0}
        max={2000}
        step={50}
      />
    </Box>
  );
}
