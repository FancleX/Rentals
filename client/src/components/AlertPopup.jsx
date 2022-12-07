import { Alert } from '@mui/material';
import useAlert from '../hooks/useAlert';
import { CSSTransition } from 'react-transition-group';
import { useRef } from 'react';
import './AlertPopup.css';

const AlertPopup = () => {
  const { text, type } = useAlert();
  const isOpen = Boolean(text && type);
  const nodeRef = useRef(null);

  if (isOpen) {
    return (
      <CSSTransition
        nodeRef={nodeRef}
        in={isOpen}
        unmountOnExit
        className='alert'
        timeout={500}
        
      >
        <Alert
          severity={type}
          ref={nodeRef}
          sx={{
            position: 'fixed',
            zIndex: 9999,
            top: 100,
            minWidth: 300,
            maxWidth: 400,
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          {text}
        </Alert>
      </CSSTransition>
    );
  } else {
    return <></>;
  }
};

export default AlertPopup;