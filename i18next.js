const i18next = require("i18next");

const getI18Next = async (lng) => {
  const t = await i18next.init({
    lng,
    resources: {
      en: {
        translation: {
          greeting_key: "hello",
        },
      },
      es: {
        translation: {
          greeting_key: "hola",
        },
      },
    },
  });
  return t;
};

module.exports = getI18Next;
