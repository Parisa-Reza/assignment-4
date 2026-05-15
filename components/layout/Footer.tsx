import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function Footer() {
    return (
        <footer className="border-t border-gray-200 dark:border-gray-800 mt-10">
            <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-center gap-4">

                {/* Left text */}
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    © {new Date().getFullYear()} KenaKata. All rights reserved.
                </p>

                {/* Social icons */}
                <div className="flex items-center gap-5">

                    {/* GitHub */}
                    <Link
                        href="https://github.com/your-username"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition"
                    >
                        <FaGithub size={20} />
                    </Link>

                    {/* LinkedIn */}
                    <Link
                        href="https://www.linkedin.com/in/your-profile"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition"
                    >
                        <FaLinkedin size={20} />
                    </Link>

                    {/* Email */}
                    <Link
                        href="mailto:youremail@example.com"
                        className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition"
                    >
                        <MdEmail size={22} />
                    </Link>

                </div>
            </div>
        </footer>
    );
}