import { IoCloseSharp } from "react-icons/io5";
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import tw from 'tailwind-styled-components';

export interface ModalSettings extends React.HTMLAttributes<HTMLDivElement> {
    onClose: () => void;
}

export const StyledModalContainer = tw.div`
    fixed
    top-1/2
    left-1/2
    -translate-x-1/2
    -translate-y-1/2
    bg-white
    rounded-md
    z-50
    flex
    flex-col
`;

const Blur = tw.div`
    w-full
    h-screen
    fixed
    z-30
    bg-slate-500
    opacity-50
    top-0
    left-0
`;

export const Modal = ({ children, onClose, ...rest }: ModalSettings) => {
    useEffect(() => {
        document.body.classList.add('overflow-hidden');

        return () => document.body.classList.remove('overflow-hidden');
    }, []);

    const modal = (
        <>
            <StyledModalContainer {...rest}>
                <div className='flex justify-end w-full pt-2 pr-3'>
                    <button className='cursor-pointer' onClick={onClose}>
                        <IoCloseSharp />
                    </button>
                </div>
                <div className='p-4 pt-1'>
                    {children}
                </div>
            </StyledModalContainer>
            <Blur onClick={onClose} />
        </>
    );

    return ReactDOM.createPortal(modal, document.body);
};