'use client';

import { useState } from "react";
import Image from "next/image";
import faqData from "./faq.json";

const tabs = Object.keys(faqData);

export default function FAQPage() {
    const [activeTab, setActiveTab] = useState(tabs[0]);
    const [openIndex, setOpenIndex] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const toggleQuestion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const filteredFaqs = faqData[activeTab].filter((faq) =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            {/* Banner Image (Full width) + Search bar */}
            <div className="relative w-full h-56 md:h-64 lg:h-72 mb-8">
                <Image
                    src="/static/img/forum/forum-banner.png"
                    alt="Forum Banner"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-none md:rounded-lg shadow"
                    priority
                />

                {/* Overlay content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 px-4">
                    <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg mb-4">FAQ</h1>

                    {/* Search input */}
                    <div className="w-full max-w-xl flex rounded-md border border-yellow-300 overflow-hidden relative bg-gray-900 opacity-80">
                        <input
                            type="text"
                            placeholder="Input your question ..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setOpenIndex(null);
                            }}
                            className="flex-grow px-4 py-2 text-black focus:outline-none text-white"
                            style={{
                                clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)"
                            }}
                        />
                        <button
                            className="bg-yellow-300 px-4 flex items-center justify-center text-black font-semibold"
                            style={{
                                clipPath: "polygon(0 0, 100% 0, 100% 100%, 10px 100%, 0 calc(100% - 10px))"
                            }}
                        >
                            🔍
                        </button>
                    </div>

                </div>
            </div>

            {/* FAQ Section */}
            <div className="max-w-6xl mx-auto px-auto py-8">

                {/* Tabs */}
                <div className="flex justify-center mb-6 flex gap-4">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => {
                                setActiveTab(tab);
                                setOpenIndex(null);
                                setSearchTerm("");
                            }}
                            className={`btn-corner w-full max-w-lg py-4 mt-2 mb-2 bg-black text-white font-bold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* FAQ Items */}
                <div className="bg-white rounded-lg shadow p-6">
                    {filteredFaqs.length === 0 ? (
                        <p className="text-gray-500">Không tìm thấy câu hỏi nào phù hợp.</p>
                    ) : (
                        filteredFaqs.map((faq, index) => {
                            const isOpen = index === openIndex;

                            return (
                                <div
                                    key={index}
                                    className={`mb-4 rounded-md transition ${isOpen ? "bg-black text-white" : "bg-gray-100"
                                        }`}
                                >
                                    <button
                                        onClick={() => toggleQuestion(index)}
                                        className={`w-full text-left px-4 py-3 rounded-md focus:outline-none ${isOpen
                                            ? "text-yellow-300"
                                            : "text-gray-800 hover:bg-gray-200"
                                            }`}
                                    >
                                        Q: {faq.question}
                                    </button>

                                    {isOpen && (
                                        <div className="px-4 pb-4 pt-1 text-white">
                                            <p>A: {faq.answer}</p>
                                        </div>
                                    )}
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
}
