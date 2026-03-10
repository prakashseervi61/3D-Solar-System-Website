'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Rocket } from 'lucide-react';
import useStore from '@/store/useStore';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const { isMobileMenuOpen, setIsMobileMenuOpen } = useStore();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { label: 'Home', href: '#home' },
        { label: 'Planets', href: '#planet-0' },
        { label: 'About', href: '#about' },
        { label: 'Credits', href: '#credits' },
    ];

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        setIsMobileMenuOpen(false);
        const target = document.querySelector(href);
        if (target) {
            // Use Lenis for native physics-based scrolls instead of simple scrollIntoView
            if ((window as any).lenis) {
                (window as any).lenis.scrollTo(target, { duration: 1.5, offset: 0 });
            } else {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <>
            <nav
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled
                    ? 'bg-deep-space/95 backdrop-blur-md border-b border-white/5'
                    : 'bg-transparent'
                    }`}
                style={{ height: '80px' }}
            >
                <div className="max-w-[1400px] mx-auto h-full flex items-center justify-between px-5 md:px-10 lg:px-20">
                    {/* Logo */}
                    <a
                        href="#home"
                        onClick={(e) => handleNavClick(e, '#home')}
                        className="flex items-center gap-2 text-starlight-white no-underline"
                    >
                        <Rocket className="w-6 h-6 text-solar-orange" />
                        <span
                            className="text-lg font-bold tracking-widest uppercase"
                            style={{ fontFamily: 'var(--font-heading)' }}
                        >
                            Solar
                        </span>
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                onClick={(e) => handleNavClick(e, link.href)}
                                className="text-soft-gray hover:text-planet-blue transition-colors duration-300 text-base font-medium tracking-wide no-underline relative group"
                                style={{ fontFamily: 'var(--font-body)' }}
                            >
                                {link.label}
                                <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-planet-blue transition-all duration-300 group-hover:w-full" />
                            </a>
                        ))}
                    </div>

                    {/* Mobile Hamburger */}
                    <button
                        className="md:hidden text-starlight-white bg-transparent border-none cursor-pointer p-2"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 z-40 bg-cosmic-black/98 backdrop-blur-lg flex flex-col items-center justify-center gap-8 transition-all duration-500 md:hidden ${isMobileMenuOpen
                    ? 'opacity-100 pointer-events-auto'
                    : 'opacity-0 pointer-events-none'
                    }`}
            >
                {navLinks.map((link) => (
                    <a
                        key={link.label}
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className="text-2xl text-starlight-white hover:text-planet-blue transition-colors duration-300 no-underline uppercase tracking-widest font-semibold"
                        style={{ fontFamily: 'var(--font-heading)' }}
                    >
                        {link.label}
                    </a>
                ))}
            </div>
        </>
    );
}
