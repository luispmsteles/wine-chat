import React from "react";
import { Button as ShadcnButton } from "./ui/button";
import Link from "next/link";

const Button = ({
    text,
    link,
    color,
}: {
    text: string;
    link: string;
    color: string;
}) => {
    const btnStyling = color === 'dark' ? 'bg-dark text-light border border-dark-secondary hover:bg-light hover:border-light-secondary hover:text-dark' : `bg-neutral-secondary text-dark border border-neutral hover:bg-dark hover:border-dark-secondary hover:text-light`;
    
    return (
        <ShadcnButton
            asChild
            className={`${btnStyling} shadow-none rounded-md p-2 !text-main`}
        >
            <Link href={link}>{text}</Link>
        </ShadcnButton>
    );
};

export default Button;
