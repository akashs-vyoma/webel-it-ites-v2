import Image from 'next/image'
import footerPanorama from '@/components/images/footer-image.png'
import webelLogo from '@/components/images/webel-logo.png'

const CommonFooter = () => {
    return (
        <footer className="relative w-full mt-auto">
            {/* The illustration image */}
            {/* leading-none prevents line-height gaps below the image */}
            <div className="w-full leading-none">
                <Image
                    src={footerPanorama}
                    alt="Rural West Bengal Art"
                    className="w-full h-auto object-cover object-bottom"
                    priority
                />
            </div>

            {/* 
                Bottom Bar: Logo Left, Copyright Right.
                The bg color (#f5e6ca) should match the bottom color of your footer-image.png 
                to make it look like a seamless ground extension.
            */}
            <div className="bg-[#f1e1b4] w-full px-6 md:px-12 pb-6 pt-2 flex flex-col md:flex-row justify-between items-end">

                {/* Left: Webel Logo */}
                <div className="flex-shrink-0 mb-4 md:mb-0">
                    <Image
                        src={webelLogo}
                        alt="Webel - opportunities infinite"
                        width={150}
                        height={60}
                        className="h-12 w-auto object-contain"
                    />
                </div>

                {/* Right: Copyright Text */}
                <div className="text-center md:text-right">
                    <p className="text-[11px] font-bold text-gray-800">
                        Copyright © 2023 - 2024. Webel, Department of Electronics & Information Technology, Govt of WB
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default CommonFooter