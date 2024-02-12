import Logo from '../ui/logo';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="">
            <div className="w-full py-4 md:py-8 px-6 border-border border-t">
                <div className="sm:flex sm:items-center sm:justify-between ">
                    <Link
                        href="/"
                        className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
                    >
                        <Logo />
                    </Link>
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                        <li>
                            <a
                                href="#"
                                className="hover:underline me-4 md:me-6"
                            >
                                About
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="hover:underline me-4 md:me-6"
                            >
                                Privacy Policy
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="hover:underline me-4 md:me-6"
                            >
                                Licensing
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">
                                Contact
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}
