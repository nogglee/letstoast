import { useContext } from 'react';
import { ToastContext } from '../context/ToastContext';

export const useToast = () => {
  const { addToast } = useContext(ToastContext); // ToastContext에서 addToast 함수 가져오기
  return { addToast }; // addToast 함수를 반환
};