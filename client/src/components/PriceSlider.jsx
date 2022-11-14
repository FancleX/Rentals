import React, { Component } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

export default class PriceSlider extends Component {

    minDistance = 10;

    state = {
        value: [0, 100]
    };

    handleChange = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
          }
      
        if (newValue[1] - newValue[0] < this.minDistance) {
            if (activeThumb === 0) {
            const clamped = Math.min(newValue[0], 100 - this.minDistance);
            this.setState({value: [clamped, clamped + this.minDistance]});
            } else {
            const clamped = Math.max(newValue[1], this.minDistance);
            this.setState({value: [clamped - this.minDistance, clamped]});
            }
        } else {
            this.setState({value: newValue});
        }
    };

    valuetext = (value) => {
        return `${value}°C`;
    };



  render() {
    return (
        <Box sx={{ width: 200 }}>
        <Box sx={{display: 'inline'}}>
        <Typography variant="button" display="block" sx={{color: 'black'}} gutterBottom>
                Price
            </Typography>
        </Box>
        <Box sx={{display: 'inline'}}>
        <Slider
            getAriaLabel={() => 'Minimum distance shift'}
            value={this.state.value}
            onChange={this.handleChange}
            valueLabelDisplay="auto"
            getAriaValueText={this.valuetext}
            disableSwap
            />
        </Box>

      </Box>
    )
  }
}
