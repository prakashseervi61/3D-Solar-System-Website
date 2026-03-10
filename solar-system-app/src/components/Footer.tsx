'use client';

import { Rocket, Github, Globe } from 'lucide-react';

export default function Footer() {
    return (
        <footer
            id="credits"
            className="relative z-30 w-full"
            style={{
                background: '#05070D',
                paddingTop: '80px',
                paddingBottom: '60px',
            }}
        >
            <div className="max-w-[1400px] mx-auto px-5 md:px-10 lg:px-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <Rocket className="w-5 h-5 text-solar-orange" />
                            <span
                                className="text-lg font-bold uppercase tracking-widest text-starlight-white"
                                style={{ fontFamily: 'var(--font-heading)' }}
                            >
                                Solar
                            </span>
                        </div>
                        <p
                            className="text-nebula-gray text-sm leading-relaxed"
                            style={{ fontFamily: 'var(--font-body)' }}
                        >
                            An immersive 3D journey through our solar system, built with
                            modern web technologies. Scroll through space and discover the
                            wonders of our cosmic neighborhood.
                        </p>
                    </div>

                    {/* About */}
                    <div id="about">
                        <h3
                            className="text-starlight-white text-base font-semibold mb-4"
                            style={{ fontFamily: 'var(--font-body)' }}
                        >
                            About This Project
                        </h3>
                        <ul className="list-none space-y-2">
                            <li className="text-nebula-gray text-sm flex items-center gap-2">
                                <Globe className="w-3.5 h-3.5 text-planet-blue" />
                                Built with Next.js & React Three Fiber
                            </li>
                            <li className="text-nebula-gray text-sm flex items-center gap-2">
                                <Globe className="w-3.5 h-3.5 text-planet-blue" />
                                Animations powered by GSAP & Lenis
                            </li>
                            <li className="text-nebula-gray text-sm flex items-center gap-2">
                                <Globe className="w-3.5 h-3.5 text-planet-blue" />
                                Styled with Tailwind CSS
                            </li>
                            <li className="text-nebula-gray text-sm flex items-center gap-2">
                                <Globe className="w-3.5 h-3.5 text-planet-blue" />
                                State managed with Zustand
                            </li>
                        </ul>
                    </div>

                    {/* Credits */}
                    <div>
                        <h3
                            className="text-starlight-white text-base font-semibold mb-4"
                            style={{ fontFamily: 'var(--font-body)' }}
                        >
                            Credits
                        </h3>
                        <ul className="list-none space-y-2">
                            <li className="text-nebula-gray text-sm">
                                Planet data sourced from NASA
                            </li>
                            <li className="text-nebula-gray text-sm">
                                3D rendering via Three.js
                            </li>
                            <li className="text-nebula-gray text-sm">
                                Design inspired by space exploration
                            </li>
                        </ul>
                        <div className="flex items-center gap-4 mt-5">
                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-nebula-gray hover:text-planet-blue transition-colors duration-200"
                            >
                                <Github className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="w-full h-[1px] bg-white/10 mb-6" />

                {/* Copyright */}
                <p
                    className="text-nebula-gray text-xs text-center"
                    style={{ fontFamily: 'var(--font-body)' }}
                >
                    © {new Date().getFullYear()} Solar System Explorer. Built with ❤️ and
                    modern web technologies.
                </p>
            </div>
        </footer>
    );
}
