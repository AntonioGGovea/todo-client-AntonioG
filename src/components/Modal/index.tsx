import { IoCloseSharp } from 'react-icons/io5';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { StyledBlur, StyledModalContainer, StyledModalDismiss } from './styles';

export interface ModalSettings extends React.HTMLAttributes<HTMLDivElement> {
    onClose: () => void;
}

export const Modal = ({ children, onClose, ...rest }: ModalSettings) => {
    useEffect(() => {
        document.body.classList.add('overflow-hidden');
        return () => document.body.classList.remove('overflow-hidden');
    }, []);

    const modal = (
        <>
            <StyledModalContainer {...rest}>
                <StyledModalDismiss>
                    <button onClick={onClose}>
                        <IoCloseSharp />
                    </button>
                </StyledModalDismiss>
                <div className='p-4 pt-1'>
                    {children}
                </div>
            </StyledModalContainer>
            <StyledBlur onClick={onClose} />
        </>
    );

    return ReactDOM.createPortal(modal, document.body);
};