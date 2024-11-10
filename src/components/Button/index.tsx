import tw from 'tailwind-styled-components';

interface ButtonProps {
    $variant?: "primary" | "secondary" | "text";
}

const Button = tw.button<ButtonProps>`
    px-3 py-1 flex
    items-center
    rounded-md
    text-white
    bg-indigo-700
    ${(b) => {
        if (b.$variant === "secondary") {
            return "bg-cyan-600 hover:bg-cyan-700"
        }
        if (b.$variant === "text") {
            return "hover:opacity-85 bg-inherit"
        }
        return "bg-indigo-600  hover:bg-indigo-700"
    }}
`;

export default Button;
