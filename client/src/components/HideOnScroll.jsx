import React from 'react';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';

export default function HideOnScroll(props) {

    const { children, window } = props;

    const trigger = useScrollTrigger({
      target: window ? window() : undefined,
    });
    
  return (
    <Slide appear={false} direction="down" in={!trigger}>
    {children}
    </Slide>
  )
}
