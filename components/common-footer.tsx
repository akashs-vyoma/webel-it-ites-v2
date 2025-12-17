import Image from 'next/image'
import footerPanorama from '@/components/images/footer-image.png'
import webelLogo from '@/components/images/webel-logo.png'

const CommonFooter = () => {
    return (
        <footer className="relative w-full mt-auto">
            {/* The illustration image (Commented out as per your code) */}
            {/* <div className="w-full leading-none">
                <Image
                    src={footerPanorama}
                    alt="Rural West Bengal Art"
                    className="w-full h-auto object-cover object-bottom"
                    priority
                />
            </div> */}

            {/* 
                Wavy Pattern Section:
                - Acts as the "border" but is a wave shape.
                - fill-blue-900 matches the Webel brand color.
                - h-3 keeps it very subtle and compact (like a thick line).
            */}
            <div className="w-full leading-none rotate-180">
                <svg
                    className="relative block w-full h-3 md:h-4"
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                        className="fill-blue-600"
                    ></path>
                </svg>
            </div>

            {/* 
                Bottom Bar:
                - Removed the border-t-4 class.
                - Kept bg-white and compact padding.
            */}
            <div className="bg-white w-full shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
                <div className="w-full px-6 md:px-12 py-3 flex flex-col md:flex-row justify-between items-center gap-2">

                    {/* Left: Webel Logo */}
                    <div className="flex-shrink-0">
                        <Image
                            src={webelLogo}
                            alt="Webel - opportunities infinite"
                            width={120}
                            height={48}
                            className="h-10 w-auto object-contain hover:opacity-90 transition-opacity"
                        />
                    </div>

                    {/* Right: Copyright Text */}
                    <div className="text-center md:text-right">
                        <p className="text-[11px] font-bold text-gray-600 tracking-wide">
                            Copyright © 2023 - 2024. Webel, Department of Electronics & Information Technology, Govt of WB
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default CommonFooter