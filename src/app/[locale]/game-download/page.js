"use client";
import { useLanguage } from "@/app/hooks/useLanguage";

const systemSpecs = [
  { category: "OS", value: "Windows 10 64bit" },
  { category: "CPU", value: "Intel Core i5" },
  { category: "RAM", value: "8 GB or more" },
  { category: "HDD", value: "30GB" },
  { category: "VGA", value: "Nvidia GeForce 1050Ti or better graphics card" },
  { category: "DirectX", value: "Direct X 11 or higher" },
  { category: "Resolution", value: "1920 X 1080" },
];

const driverLinks = [
  {
    name: "Microsoft Direct X",
    url: "https://www.microsoft.com/en-us/download/confirmation.aspx?id=35",
    img: "https://image.closersonline.com/public/upload/files/directX-5f99.gif",
  },
  {
    name: "Visual C++ 2010 SP1",
    url: "https://www.microsoft.com/en-us/download/details.aspx?id=48145",
    img: "https://image.closersonline.com/public/upload/files/VisualC++-484d.gif",
  },
  {
    name: "NVIDIA",
    url: "https://www.nvidia.com/Download/index.aspx",
    img: "https://image.closersonline.com/public/upload/files/Nvidia-9059.gif",
  },
  {
    name: "AMD",
    url: "https://www.amd.com/en/support",
    img: "https://image.closersonline.com/public/upload/files/AMD-b23e.gif",
  },
  {
    name: "INTEL",
    url: "https://www.intel.com/content/www/us/en/support/products/80939/graphics.html",
    img: "https://image.closersonline.com/public/upload/files/Intel-35a1.gif",
  },
];

export default function GameDownload() {
  const { t } = useLanguage();

  return (
    <div id="Content" className="w-full flex flex-col items-center">
      {/* Banner */}
      <div
        className="w-full flex flex-col items-center justify-center relative bg-cover bg-center md:h-[540px]"
        style={{
          backgroundImage: "url(/static/img/download-page/download-bg.png)",
        }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-0" />
        <div className="w-full flex flex-col items-center justify-center h-[400px] md:h-[440px] relative">
          <div className="backdrop-blur-md bg-white/20 border border-white/40 shadow-2xl rounded-3xl px-8 py-10 md:px-16 md:py-14 flex flex-col items-center max-w-2xl mx-auto mt-16 z-20">
            <h1 className="text-3xl md:text-5xl font-extrabold text-yellow-400 text-center mb-2 drop-shadow-lg">
              {t("download.title")}
            </h1>
            <h2 className="text-xl md:text-2xl font-bold text-white text-center mb-4 drop-shadow">
              {t("download.subtitle")}
            </h2>
            <p className="text-white text-base md:text-lg text-center drop-shadow">
              {t("download.description")}
            </p>
          </div>

          {/* Button */}
          <div
            className="w-full flex justify-center absolute left-0 right-0"
            style={{ bottom: -60 }}
          >
            <button
              className="px-12 py-4 text-lg font-bold text-black rounded-2xl shadow-lg flex items-center justify-center gap-3 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 hover:scale-105 transition-transform border-2 border-yellow-300"
              style={{ minWidth: 300, minHeight: 80 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-7 h-7 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v12m0 0l-4-4m4 4l4-4m-9 8h10"
                />
              </svg>
              {t("download.button")}
            </button>
          </div>
        </div>
        <div className="h-[120px]" />
      </div>

      {/* Content */}
      <div className="container mx-auto mt-10 mb-20 px-4 max-w-5xl">
        {/* System Specs */}
        <div className="configuration mb-8">
          <p className="title text-xl font-bold mb-4">
            {t("download.specs.title")}
          </p>
          <table className="min-w-full bg-white border-t border-black shadow rounded-lg overflow-hidden">
            <thead>
              <tr>
                <th className="bg-gray-100 border-b border-gray-200 px-6 py-4 text-center text-lg font-semibold">
                  {t("download.specs.category")}
                </th>
                <th className="bg-gray-100 border-b border-gray-200 px-6 py-4 text-center text-lg font-semibold">
                  {t("download.specs.recommended")}
                </th>
              </tr>
            </thead>
            <tbody>
              {systemSpecs.map((spec) => (
                <tr key={spec.category}>
                  <td className="border-b border-gray-200 px-6 py-4 text-center font-medium">
                    {spec.category}
                  </td>
                  <td className="border-b border-gray-200 px-6 py-4 text-center">
                    {spec.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Notice */}
        <div className="notice mb-8">
          <div className="title-notice flex items-center mb-2">
            <img
              src="/static/img/download-page/notice-icon.png"
              className="notice-icon w-6 h-6 mr-2"
              alt="Notice"
            />
            <span className="font-semibold text-lg">Notice</span>
          </div>
          <ul className="list-disc pl-6 text-gray-700">
            <li>{t("download.notice1")}</li>
            <li>{t("download.notice2")}</li>
            <li>{t("download.notice3")}</li>
          </ul>
        </div>

        {/* Driver Downloads */}
        <div className="mb-8">
          <p className="title text-xl font-bold mb-4">
            {t("download.drivers.title")}
          </p>
          <div className="flex flex-wrap gap-6 items-center justify-center">
            {driverLinks.map((driver) => (
              <a
                key={driver.name}
                href={driver.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center w-40 p-4 bg-white rounded-lg shadow hover:bg-gray-50 transition"
              >
                <img src={driver.img} alt={driver.name} className="h-16 mb-2" />
                <span className="text-center font-medium text-gray-800">
                  {driver.name}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Driver Notice */}
        <div className="notice mb-8">
          <div className="title-notice flex items-center mb-2">
            <img
              src="/static/img/download-page/notice-icon.png"
              className="notice-icon w-6 h-6 mr-2"
              alt="Notice"
            />
            <span className="font-semibold text-lg">Notice</span>
          </div>
          <ul className="list-disc pl-6 text-gray-700">
            <li>{t("download.drivers.notice1")}</li>
            <li>{t("download.drivers.notice2")}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
