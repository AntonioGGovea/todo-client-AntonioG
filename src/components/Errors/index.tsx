import { PropsWithChildren } from 'react';
import tw from 'tailwind-styled-components';
import { IoCloseSharp } from 'react-icons/io5';

export const InputError = tw.span`text-red-500 text-xs`;

const StyledActionError = tw.span`
    bg-red-500
    text-white
    rounded-sm
    w-full
    text-sm
    p-2
    flex
    justify-between
    gap-2
    items-center
 `;

interface ActionErrorConfig {
    onClose: () => void
};

export const ActionError = ({ onClose, children }: PropsWithChildren<ActionErrorConfig>) => (
    <StyledActionError>
        {children}
        <button type='button'>
            <IoCloseSharp fontSize={16} onClick={onClose} />
        </button>
    </StyledActionError>
);
