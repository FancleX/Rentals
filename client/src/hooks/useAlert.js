import { useContext } from 'react';
import AlertContext from '../components/AlertProvider';

const useAlert = () => useContext(AlertContext);

export default useAlert;