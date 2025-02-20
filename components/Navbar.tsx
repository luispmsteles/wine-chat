"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Button from "./Button";
import { Menu, X } from "lucide-react"; // Icons for the sidebar toggle
import navbar from "@/data/navbar";


const Navbar = () => {
    const [lastScrollY, setLastScrollY] = useState(0);
    const [showNavbar, setShowNavbar] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > 100 && currentScrollY > lastScrollY) {
                setShowNavbar(false);
            } else if (currentScrollY < lastScrollY) {
                setShowNavbar(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    return (
        <>
            <nav
                className={`fixed bg-light top-0 z-50 w-full h-[99px] px-4 sm:px-8 border-b border-light-secondary transition-transform duration-300 transform ${showNavbar ? "translate-y-0" : "-translate-y-full"}`}
            >
                <div className="max-w-screen-2xl mx-auto h-full flex justify-between items-center">
                    <Link href={navbar.logo.link} className="flex items-center">
                        <Image
                            src={navbar.logo.src}
                            height={35}
                            width={40}
                            alt={navbar.logo.alt}
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex gap-2 items-center">
                        {Object.entries(navbar.links).map(([key, link]) => (
                            <Link
                                key={key}
                                href={`/${link.link}`}
                                className="p-2 text-main hover:underline text-dark"
                            >
                                {link.title}
                            </Link>
                        ))}
                        {Object.entries(navbar.buttons).map(([key, btn]) => (
                            <Button key={key} text={btn.title} color={btn.color} link={btn.link} />
                        ))}
                        {/* <Button text={navbar.buttons..contacts.title} color="light" link="/contact" />
                        <Button text={navbar.links.contacts.title} color="dark" link="/contact" /> */}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="md:hidden text-main focus:outline-none"
                    >
                        <Menu className={`w-8 h-8 text-dark`} />
                    </button>
                </div>
            </nav>

            {/* Sidebar (Mobile Menu) */}
            <div
                className={`fixed inset-y-0 right-0 w-64 bg-dark border-l border-dark-secondary shadow-lg transform transition-transform duration-300 z-[1100] ${isSidebarOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* Close Button */}
                <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="absolute h-20 px-6 flex-center top-0 right-0 text-white"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Sidebar Links */}
                <div className="flex flex-col items-start gap-6 pt-[5rem] px-6">
                    {/* <Link
                        href="/about"
                        className="text-white text-lg hover:text-gray-300"
                        onClick={() => setIsSidebarOpen(false)}
                    >
                        {navbar.links.about.title}
                    </Link>
                    <Link
                        href="/services"
                        className="text-white text-lg hover:text-gray-300"
                        onClick={() => setIsSidebarOpen(false)}
                    >
                        {navbar.links.services.title}
                    </Link>
                    <Link
                        href="/works"
                        className="text-white text-lg hover:text-gray-300"
                        onClick={() => setIsSidebarOpen(false)}
                    >
                        {navbar.links.works.title}
                    </Link>
                    <div className="w-full flex-center py-8 border-t border-dark-secondary">
                        <Button text={navbar.links.contacts.title} color="brand" link="/contact" />
                    </div> */}


                </div>
            </div>

            {/* Overlay (Dark Background) */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-[1000]"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

        </>
    );
};

export default Navbar;
