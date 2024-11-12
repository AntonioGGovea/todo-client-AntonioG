import tw from 'tailwind-styled-components';

interface ButtonProps {
    $variant?: 'filled' | 'text';
    $color?: 'primary' | 'secondary' | 'white';
}

const Button = tw.button<ButtonProps>`
    px-3 py-1 flex
    items-center
    rounded-md
    text-white
    ${(b) => {
        if (b.$variant === 'text') {
            return 'hover:opacity-85 bg-inherit'
        }
    }}
    ${(c) => {
        if (c.$color === 'secondary') {
            return c.$variant === 'text' ? 'text-cyan-600 hover:text-cyan-900' : 'bg-cyan-600 hover:bg-cyan-700';
        }
        if (c.$color === 'white') {
            return c.$variant === 'text' ? 'text-white hover:text-gray-100' : 'text-black bg-white hover:bg-gray-100';
        }
        return c.$variant === 'text' ? 'text-indigo-600 hover:text-indigo-700' : 'bg-indigo-600 hover:bg-indigo-700';
    }}
`;

export default Button;
