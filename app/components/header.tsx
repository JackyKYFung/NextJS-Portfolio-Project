"use client";
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Atom, Blocks, FingerprintPattern, HeartHandshake, Home } from "lucide-react";

export function Header() {
    const pathname = usePathname();
    //This "reads" the current URL state

    return (
        <header className="flex justify-between mb-[30px] content-center">
            <div className="font-bold text-2xl">
                <Link href={'/'}>jFunki</Link>
            </div>

            <nav>
                <ul className="flex gap-5">
                    <li>
                       
                        <Link 
                            href='/'
                            className={`relative transition-all duration-200 flex items-center text-sm group pb-1 ${pathname === "/" ? "text-white font-bold" : "opacity-80 hover:opacity-100"}`}
                            >
                                <span>HO</span>
                                <Home className="w-[1.0em] h-[1.0em] stroke-[2.5] text-current translate-y-[0px] px-[1px]" />
                                <span>E</span>
                                <span 
                                    className={`absolute bottom-0 left-0 h-[2px] bg-white transition-all duration-300 origin-left ${
                                        pathname === "/" 
                                            ? "w-full"             // <-- Full width and stays when page is active
                                            : "w-0 group-hover:w-full" // <-- Hidden by default, slides out on hover
                                    }`} 
                                />
                        </Link>
                    </li>
                    <li>
                        <Link 
                            href='/about'
                            className={`relative transition-all duration-200 flex items-center text-sm group pb-1 ${pathname === "/about" ? "text-white font-bold" : "opacity-80 hover:opacity-100"}`}
                            >
                                <span>AB</span>
                                <FingerprintPattern className="w-[0.9em] h-[0.9em] stroke-[2.5] text-current translate-y-[1px] px-[1px] mb-[3px]" />
                                <span>UT</span>
                                <span 
                                    className={`absolute bottom-0 left-0 h-[2px] bg-white transition-all duration-300 origin-left ${
                                        pathname === "/about" 
                                            ? "w-full"             // <-- Full width and stays when page is active
                                            : "w-0 group-hover:w-full" // <-- Hidden by default, slides out on hover
                                    }`} 
                                />
                        </Link>
                    </li>
                    <li>
                        <Link 
                            href='/projects'
                            className={`relative transition-all duration-200 flex items-center text-sm group pb-1 ${pathname === "/projects" ? "text-white font-bold" : "opacity-80 hover:opacity-100"}`}
                            >
                                <span>PR</span>
                                <Atom className="w-[1em] h-[1em] stroke-[2.5] text-current translate-y-[1px] px-[1px] mb-[3px]" />
                                <span>JECTS</span>
                                <span 
                                    className={`absolute bottom-0 left-0 h-[2px] bg-white transition-all duration-300 origin-left ${
                                        pathname === "/projects" 
                                            ? "w-full"             // <-- Full width and stays when page is active
                                            : "w-0 group-hover:w-full" // <-- Hidden by default, slides out on hover
                                    }`} 
                                />
                        </Link>
                    </li>
                    <li>
                        <Link 
                            href='/experience'
                            className={`relative transition-all duration-200 flex items-center text-sm group pb-1 ${pathname === "/experience" ? "text-white font-bold" : "opacity-80 hover:opacity-100"}`}
                            >
                                <Blocks className="w-[1em] h-[1em] stroke-[2.5] text-current translate-y-[1px] px-[1px] mb-[3px]" />
                                <span>XPERIENCE</span>
                                <span 
                                    className={`absolute bottom-0 left-0 h-[2px] bg-white transition-all duration-300 origin-left ${
                                        pathname === "/experience" 
                                            ? "w-full"             // <-- Full width and stays when page is active
                                            : "w-0 group-hover:w-full" // <-- Hidden by default, slides out on hover
                                    }`} 
                                />
                        </Link>
                    </li>
                    <li>
                        <Link 
                            href='/contact'
                            className={`relative transition-all duration-200 flex items-center text-sm group pb-1 ${pathname === "/contact" ? "text-white font-bold" : "opacity-80 hover:opacity-100"}`}
                            >
                                <span>C</span>
                                <HeartHandshake className="w-[1em] h-[1em] stroke-[2.5] text-current translate-y-[1px] px-[1px] mb-[3px]" />
                                <span>NTACT</span>
                                <span 
                                    className={`absolute bottom-0 left-0 h-[2px] bg-white transition-all duration-300 origin-left ${
                                        pathname === "/contact" 
                                            ? "w-full"             // <-- Full width and stays when page is active
                                            : "w-0 group-hover:w-full" // <-- Hidden by default, slides out on hover
                                    }`} 
                                />
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}