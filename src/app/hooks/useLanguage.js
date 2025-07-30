"use client";

import { useSelector, useDispatch } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { setLanguage } from "@/redux/slices/languageSlice";
import { getCookie, setCookie } from "@/lib/cookies";

import en from "@/language/en-US.json";
import ko from "@/language/ko-KR.json";
import zh from "@/language/zh-CN.json";
import vi from "@/language/vi-VN.json";

const translations = {
  "en-US": en,
  "ko-KR": ko,
  "zh-CN": zh,
  "vi-VN": vi,
};

const getNestedValue = (obj, key) =>
  key.split(".").reduce((acc, part) => acc?.[part], obj);

export const useLanguage = () => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const router = useRouter();
  const currentLanguage = useSelector(
    (state) => state.language.currentLanguage
  );

  useEffect(() => {
    const segments = pathname.split("/");
    const langFromURL = segments[1];
    const isValidLang = Object.keys(translations).includes(langFromURL);
    const stored = getCookie("mi18nLang");

    // 🔁 Nếu ngôn ngữ trong URL không hợp lệ → redirect về /en-US/home-page
    if (!isValidLang) {
      router.replace(`/en-US/home-page`);
      dispatch(setLanguage("en-US"));
      setCookie("mi18nLang", "en-US");
      return;
    }

    // ✅ Nếu langFromURL hợp lệ → sync redux + cookie nếu cần
    if (langFromURL !== currentLanguage) {
      dispatch(setLanguage(langFromURL));
      setCookie("mi18nLang", langFromURL);
    } else if (stored && stored !== currentLanguage) {
      dispatch(setLanguage(stored));
    }
  }, [pathname]);

  const changeLanguage = (lang) => {
    dispatch(setLanguage(lang));
    setCookie("mi18nLang", lang);

    const segments = pathname.split("/");
    if (segments.length >= 3) {
      segments[1] = lang;
      router.push(segments.join("/"));
    } else {
      router.push(`/${lang}/home-page`);
    }
  };

  const t = (key) => {
    const value = getNestedValue(translations[currentLanguage], key);
    return value || key;
  };

  return { t, changeLanguage, currentLanguage };
};
