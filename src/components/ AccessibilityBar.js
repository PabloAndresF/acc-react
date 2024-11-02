import React, { useState, useEffect } from "react";
import data from "./data";

const AccessibilityBar = () => {
  const [spacing, setSpacing] = useState(1);
  const [fontSize, setFontSize] = useState(14);
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isGrayScale, setIsGrayScale] = useState(false);
  const [isDyslexicFont, setIsDyslexicFont] = useState(false);
  const [isBigCursor, setIsBigCursor] = useState(false);
  const [highlightLinks, setHighlightLinks] = useState(false);

  // Efecto para actualizar clases en el body
  useEffect(() => {
    document.body.style.fontSize = `${fontSize}px`;
    document.body.style.letterSpacing = `${spacing * 0.5}px`;

    document.body.classList.toggle("high-contrast", isHighContrast);
    document.body.classList.toggle("gray-scale", isGrayScale);
    document.body.classList.toggle("font-dyslexic", isDyslexicFont);
    document.body.classList.toggle("big-cursor", isBigCursor);
    document.body.classList.toggle("highlight-links", highlightLinks);

    // Limpiar estilos cuando el componente se desmonte
    return () => {
      document.body.style.fontSize = "";
      document.body.style.letterSpacing = "";
      document.body.classList.remove(
        "high-contrast",
        "gray-scale",
        "font-dyslexic",
        "big-cursor",
        "highlight-links"
      );
    };
  }, [
    fontSize,
    spacing,
    isHighContrast,
    isGrayScale,
    isDyslexicFont,
    isBigCursor,
    highlightLinks,
  ]);

  // Resto de la lógica y el código del componente...
  const toggleMenu = () => setIsMenuActive((prev) => !prev);

  const changeFontSize = (type) => {
    setFontSize((prevSize) =>
      type === "more" ? prevSize + 1 : type === "less" ? prevSize - 1 : prevSize
    );
  };

  const changeSpacing = (type) => {
    setSpacing((prevSpacing) =>
      type === "more"
        ? prevSpacing + 1
        : type === "less"
        ? prevSpacing - 1
        : prevSpacing
    );
  };

  const resetAccessibilitySettings = () => {
    setFontSize(14);
    setSpacing(1);
    setIsHighContrast(false);
    setIsGrayScale(false);
    setIsDyslexicFont(false);
    setIsBigCursor(false);
    setHighlightLinks(false);
  };

  return (
    <div
      className={`accessibilityBar ${
        isMenuActive ? "accessibilityBar--active" : ""
      }`}
    >
      <figure className="accessibilityBar__figure" onClick={toggleMenu}>
        <img
          src="/Assets/images/logo.svg"
          alt="logo"
          className="accessibilityBar__logo"
          title="Accesibilidad"
        />
      </figure>
      {isMenuActive && (
        <div className="accessibilityBar__content">
          <h3 className="accessibilityBar__title">Accesibilidad</h3>
          <div className="accessibilityBar__options">
            {data.map((item) => (
              <button
                key={item.id}
                className="accessibilityBar__option"
                onClick={() => {
                  switch (item.id) {
                    case "increaseText": // Cambiado
                      changeFontSize("more");
                      break;
                    case "decreaseText": // Cambiado
                      changeFontSize("less");
                      break;
                    case "reset": // Cambiado
                      resetAccessibilitySettings();
                      break;
                    case "increaseSpacing": // Cambiado
                      changeSpacing("more");
                      break;
                    case "decreaseSpacing": // Cambiado
                      changeSpacing("less");
                      break;
                    case "highContrast": // Cambiado
                      setIsHighContrast(!isHighContrast);
                      break;
                    case "grayScale": // Cambiado
                      setIsGrayScale(!isGrayScale);
                      break;
                    case "increaseCursor": // Cambiado
                      setIsBigCursor(!isBigCursor);
                      break;
                    case "highlightLinks": // Cambiado
                      setHighlightLinks(!highlightLinks);
                      break;
                    case "dyslexicFont": // Cambiado
                      setIsDyslexicFont(!isDyslexicFont);
                      break;
                    default:
                      break;
                  }
                }}
              >
                <strong
                  class={`accessibilityBar__icon accessibilityBar__icon--${item.img}`}
                ></strong>
                {item.text}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AccessibilityBar;
