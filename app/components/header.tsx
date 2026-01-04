import Link from 'next/link';

export function Header() {
    return (
        <header className="flex justify-between mb-[30px] content-center">
            <div className="font-bold text-2xl">
                <Link href={'/'}>jFunki</Link>
            </div>

            <nav>
                <ul className="flex gap-5">
                    <li>
                        <Link href={'/'}>Home</Link>
                    </li>
                    <li>
                        <Link href={'#about'}>About</Link>
                    </li>
                    <li>
                        <Link href={'#projects'}>Projects</Link>
                    </li>
                    <li>
                        <Link href={'#contact'}>Contact</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}