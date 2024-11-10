import tw from 'tailwind-styled-components';


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

export const StyledModalDismiss = tw.div`
    flex
    justify-end
    w-full
    pt-2
    pr-3
`;

export const StyledBlur = tw.div`
    w-full
    h-screen
    fixed
    z-30
    bg-slate-500
    opacity-50
    top-0
    left-0
`;
