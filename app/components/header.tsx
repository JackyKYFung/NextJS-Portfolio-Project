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
                            className={`transition-all duration-200 flex items-center ${pathname === "/about" ? "text-white" : "opacity-80 hover:opacity-100"}`}
                            >
                                <span>HO</span>
                                <Home className="w-[1.0em] h-[1.0em] stroke-[2.5] text-current translate-y-[0px] px-[1px]" />
                                <span>E</span>
                        </Link>
                    </li>
                    <li>
                        
                        <Link 
                            href='/about'
                            className={`transition-all duration-200 flex items-center ${pathname === "/about" ? "text-white" : "opacity-80 hover:opacity-100"}`}
                            >
                                <span>AB</span>
                                <FingerprintPattern className="w-[0.9em] h-[0.9em] stroke-[2.5] text-current translate-y-[1px] px-[1px] mb-[3px]" />
                                <span>UT</span>
                        </Link>
                    </li>
                    <li>
                        {/* O --> atom */}
                        <Link 
                            href='/projects'
                            className={`transition-all duration-200 flex items-center ${pathname === "/about" ? "text-white" : "opacity-80 hover:opacity-100"}`}
                            >
                                <span>PR</span>
                                <Atom className="w-[1em] h-[1em] stroke-[2.5] text-current translate-y-[1px] px-[1px] mb-[3px]" />
                                <span>JECTS</span>
                        </Link>
                    </li>
                    <li>
                        {/* E --> blocks */}
                        <Link 
                            href='/experience'
                            className={`transition-all duration-200 flex items-center ${pathname === "/about" ? "text-white" : "opacity-80 hover:opacity-100"}`}
                            >
                                <Blocks className="w-[1em] h-[1em] stroke-[2.5] text-current translate-y-[1px] px-[1px] mb-[3px]" />
                                <span>XPERIENCE</span>
                        </Link>
                    </li>
                    <li>
                        {/* O --> heart-handshake */}
                        <Link 
                            href='/contact'
                            className={`transition-all duration-200 flex items-center ${pathname === "/about" ? "text-white" : "opacity-80 hover:opacity-100"}`}
                            >
                                <span>C</span>
                                <HeartHandshake className="w-[1em] h-[1em] stroke-[2.5] text-current translate-y-[1px] px-[1px] mb-[3px]" />
                                <span>NTACT</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}