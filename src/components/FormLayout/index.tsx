import { PropsWithChildren } from 'react';
import tw from 'tailwind-styled-components';

export const FormHeader = ({ children }: PropsWithChildren) => (
    <h2 className='text-2xl font-semibold'>
        {children}
    </h2>
);

export const FormContent = ({ children }: PropsWithChildren) => (
    <div className='flex flex-col gap-5'>
        {children}
    </div>
);

export const FormContainer = tw.div`flex flex-col gap-8`;
