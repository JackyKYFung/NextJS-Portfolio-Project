"use client";
import { usePathname } from 'next/navigation';
import Link from 'next/link';

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
                            className={pathname === "/" ? "font-bold" : ""}
                            >
                                Home
                        </Link>
                    </li>
                    <li>
                        <Link 
                            href='/about'
                            className={pathname === "/about" ? "font-bold" : ""}
                            >
                                About
                        </Link>
                    </li>
                    <li>
                        <Link 
                            href='/projects'
                            className={pathname === "/projects" ? "font-bold" : ""}
                            >
                                Projects
                        </Link>
                    </li>
                    <li>
                        <Link 
                            href='/experience'
                            className={pathname === "/experience" ? "font-bold" : ""}
                            >
                                Experience
                        </Link>
                    </li>
                    <li>
                        <Link 
                            href='/contact'
                            className={pathname === "/contact" ? "font-bold" : ""}
                            >
                                Contact
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}