import { useRouter } from "next/router";
function ChangeLanguages({ language, lang, setLang }) {
  const router = useRouter();
  const changelanguage = (item) => {
    if (item != localStorage.getItem("Language")) {
      let locale = item;
      /** Language selected stored to the localstorage **/
      localStorage.setItem("Language", locale);
      language = locale;
      router?.push("/", "/", { locale });
    }
  };
  return (
    <div className=" mx-64 mt-2 text-teal-600">
      <div>
        <button
          data-testid="en-btn"
          className={lang === "en" ? "text-teal-600 text-sm font-bold mx-1 " : "mx-1 text-teal-600 text-sm"}
          onClick={() => {
            setLang("en");
            changelanguage("en");
          }}
        >
          English
        </button>|
        <button
          data-testid="fr-btn"
          className={lang === "fr" ? "mx-1 text-teal-600 text-sm font-bold" : "mx-1 text-teal-600 text-sm"}
          onClick={() => {
            setLang("fr");
            changelanguage("fr");
          }}
        >
          Français
        </button>|
        <button
          data-testid="ar-btn"
          className={lang === "ar" ? "text-teal-600 text-sm font-bold mx-1" : "mx-1 text-teal-600 text-sm"}
          onClick={() => {
            setLang("ar");
            changelanguage("ar");
          }}
        >
          عربى
        </button>
      </div>
    </div>
  )
}

export default ChangeLanguages