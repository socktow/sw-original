'use client';

import { useState } from "react";
import Image from "next/image";

const loginTabs = ["Report Player", "Report Bug", "Account Issues"];

export default function InquiryPage() {
    const [activeTab, setActiveTab] = useState(loginTabs[0]);

    return (
        <div>
            {/* Banner */}
            <div className="relative w-full h-40 md:h-48 flex items-center justify-center mb-6">
                <Image
                    src="/static/img/forum/forum-banner.png"
                    alt="Forum Banner"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-none md:rounded-lg shadow"
                    priority
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">Inquiry</h1>
                </div>
            </div>

            {/* Content with 2 Columns */}
            <div className="max-w-6xl mx-auto px-4 pb-16">
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Left Column - No Login */}
                    <div className="flex-1 bg-white shadow rounded-lg p-6">
                        <h2 className="text-xl font-bold mb-4 text-gray-800">Dont need Login</h2>
                        <p className="text-gray-700">
                            For any other topics, please send us an email to our Soulworkers Customer Support at{" "}
                            <a
                                href="mailto:support@swonlinevn.com"
                                className="text-blue-600 underline hover:text-blue-800"
                            >
                                support@swonlinevn.com
                            </a>
                        </p>
                    </div>

                    {/* Right Column - Needs Login */}
                    <div className="flex-1 bg-white shadow rounded-lg p-6">
                        <h2 className="text-xl font-bold mb-4 text-gray-800">Needs Login</h2>

                        {/* Tabs */}
                        <div className="flex flex-col gap-2 mb-6">
                            {loginTabs.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-4 py-2 rounded-full text-sm font-semibold transition ${activeTab === tab
                                            ? "bg-blue-600 text-white shadow"
                                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* Tab Content */}
                        <div className="flex flex-col gap-2 border border-gray-200 rounded-md p-4 bg-gray-50 text-gray-800 min-h-[100px]">
                            {activeTab === "Report Player" && (
                                <p>
                                    If you would like to report a player for violating our rules, please provide
                                    screenshots or video evidence and describe the incident clearly.
                                </p>
                            )}
                            {activeTab === "Report Bug" && (
                                <p>
                                    To report a bug, please include detailed steps to reproduce the issue and your
                                    system information (if needed).
                                </p>
                            )}
                            {activeTab === "Account Issues" && (
                                <p>
                                    For account-related problems (e.g., cant log in, lost access), please make sure you
                                    are logged in and submit your request through the account support form.
                                </p>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
