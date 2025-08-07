"use client";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setLanguage } from "@/redux/slices/languageSlice";
import { getCookie, setCookie } from "@/lib/cookies";

import en from "@/language/en-US.json";
import ko from "@/language/ko-KR.json";
import zh from "@/language/zh-CN.json";
import vi from "@/language/vi-VN.json";
import jp from "@/language/ja-JP.json";

const translations = {
  "en-US": en,
  "ko-KR": ko,
  "zh-CN": zh,
  "vi-VN": vi,
  "ja-JP": jp,
};

const countryToLang = {
  VN: "vi-VN",
  KR: "ko-KR",
  CN: "zh-CN",
  JP: "ja-JP",
};

const getNestedValue = (obj, key) =>
  key.split(".").reduce((acc, part) => acc?.[part], obj);

export const useLanguage = () => {
  const dispatch = useDispatch();
  const currentLanguage = useSelector(
    (state) => state.language.currentLanguage
  );

  useEffect(() => {
    const storedLang = getCookie("mi18nLang");

    const isValidLang = Object.keys(translations).includes(storedLang);
    if (isValidLang && storedLang !== currentLanguage) {
      dispatch(setLanguage(storedLang));
    } else if (!storedLang) {
      // ❗ Nếu chưa có cookie -> check IP để set locale qua API nội bộ
      fetch("/api/public/ip-detect")
        .then((res) => res.json())
        .then((data) => {
          const countryCode = data.country; // eg: 'VN'
          const detectedLang = countryToLang[countryCode] || "en-US";

          setCookie("mi18nLang", detectedLang);
          dispatch(setLanguage(detectedLang));
        })
        .catch(() => {
          // Nếu gọi API lỗi, fallback tiếng Anh
          setCookie("mi18nLang", "en-US");
          dispatch(setLanguage("en-US"));
        });
    }
  }, []);

  const changeLanguage = (lang) => {
    if (!translations[lang]) return;

    setCookie("mi18nLang", lang);
    dispatch(setLanguage(lang));
  };

  const t = (key) => {
    const value = getNestedValue(translations[currentLanguage], key);
    return value || key;
  };

  return { t, changeLanguage, currentLanguage };
};
