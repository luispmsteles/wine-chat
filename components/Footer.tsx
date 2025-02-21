import React from "react";
import Link from "next/link";
import Image from "next/image";
import footer from "@/static-content/footer";

const Footer = () => {
    return (
        <section className="bg-light py-16 border-t border-light-secondary">
            <div className="max-w-screen-2xl mx-auto flex xs:flex-row flex-col items-start px-4 lg:px-8 lg:justify-between">
                <div className="w-full flex flex-col gap-6">
                    {/* Logo */}
                    <Link href={footer.logo.link}>
                        <Image
                            src={footer.logo.src}
                            height={23.33}
                            width={35}
                            alt={footer.logo.alt}
                        />
                    </Link>
                    <div className="flex flex-row gap-3 items-center">
                        {footer.socials.map((social, index) => (
                            <Image
                                key={index}
                                src={social.imgSrc}
                                height={24}
                                width={24}
                                alt={social.title}
                            />
                        ))}
                    </div>
                </div>
                <div className="flex flex-col sm:py-0 py-12">
                    <div className="w-44 flex flex-col gap-4">
                        <p className="text-strong text-dark">Pages</p>
                        {Object.entries(footer.links).map(([key, link]) => (
                            <Link
                                key={key}
                                href={`/${link.link}`}
                                className="text-main hover:underline text-dark"
                            >
                                {link.title}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Footer;
