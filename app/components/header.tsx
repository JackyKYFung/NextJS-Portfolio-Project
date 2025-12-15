import Link from 'next/link';

export function Header() {
    return (
        <header className="flex justify-between mb-[66px] content-center">
            <div className="font-bold text-2xl">
                <link href={'/'}>jFunki</link>
            </div>

            <nav>
                <ul>
                    <li>
                        <Link href={'/'}>Home</Link>
                    </li>
                    <li>
                        <Link href={'/'}>About</Link>
                    </li>
                    <li>
                        <Link href={'/'}>Projects</Link>
                    </li>
                    <li>
                        <Link href={'/'}>Contact</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}