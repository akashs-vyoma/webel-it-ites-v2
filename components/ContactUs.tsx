import React from 'react';
import { MapPin } from 'lucide-react';

const ContactUs: React.FC = () => {
    return (
        <section id="contact" className="py-20 bg-white flex justify-center items-center flex-col">
            <div className="container flex justify-center items-center flex-col px-4">

                {/* Header Text */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-semibold text-slate-800">
                        Contact Us
                    </h2>
                </div>

                {/* Content Grid */}
                <div className="grid md:grid-cols-2 w-full max-w-full gap-10 mx-auto rounded-lg overflow-hidden">

                    {/* Left Column: Google Map */}
                    <div className="w-full h-full min-h-[400px]">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7368.484883227465!2d88.436449!3d22.570034!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0275abe402075f%3A0xee21c315a8eca0ad!2sWest%20Bengal%20Electronics%20Industry%20Development%20Corporation%20Limited!5e0!3m2!1sen!2sus!4v1765636932220!5m2!1sen!2sus"
                            width="100%"
                            height="100%"
                            style={{ border: 0, minHeight: '400px' }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Webel Bhavan Map"
                            className="h-full w-full object-cover"
                        ></iframe>
                    </div>

                    {/* Right Column: Contact Details */}
                    <div className="bg-blue-100 p-10 md:p-14 flex flex-col justify-center">
                        <div className="space-y-6">

                            <h3 className="text-2xl font-bold text-slate-800">
                                Contact Details
                            </h3>

                            <div className="space-y-1 text-slate-700 text-lg">
                                <p className="font-medium">
                                    West Bengal Electronics Industry Development Corporation Limited
                                </p>
                                <p className="text-slate-600">
                                    A Government of West Bengal undertaking Webel Bhavan,
                                </p>
                            </div>

                            {/* Address Row with Icon */}
                            <div className="flex items-start gap-4 text-slate-700 mt-4">
                                <div className="mt-1 text-blue-600 shrink-0">
                                    <MapPin size={24} />
                                </div>
                                <p className="text-lg leading-relaxed">
                                    Block: EP & GP, Sector V, Bidhannagar, Salt Lake, Kolkata: 700 091
                                </p>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default ContactUs;