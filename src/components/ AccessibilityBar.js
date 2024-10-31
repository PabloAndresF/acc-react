import React, { useState } from "react";
import data from "./data";

const AccessibilityBar = () => {
  const [spacing, setSpacing] = useState(1);
  const [fontSize, setFontSize] = useState(14);
  const [isMenuActive, setIsMenuActive] = useState(false); // Estado para abrir/cerrar el menú
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isGrayScale, setIsGrayScale] = useState(false);
  const [isDyslexicFont, setIsDyslexicFont] = useState(false);
  const [isBigCursor, setIsBigCursor] = useState(false);
  const [highlightLinks, setHighlightLinks] = useState(false);

  const toggleMenu = () => {
    setIsMenuActive((prev) => !prev);
    console.log("Menu active:", !isMenuActive); // Verificar si el menú se activa
  };

  const changeFontSize = (type) => {
    setFontSize((prevSize) => {
      const newSize =
        type === "more"
          ? prevSize + 1
          : type === "less"
          ? prevSize - 1
          : prevSize;
      console.log("Font size changed to:", newSize); // Verificar el cambio de tamaño
      return newSize;
    });
  };

  const changeSpacing = (type) => {
    setSpacing((prevSpacing) => {
      const newSpacing =
        type === "more"
          ? prevSpacing + 1
          : type === "less"
          ? prevSpacing - 1
          : prevSpacing;
      console.log("Spacing changed to:", newSpacing); // Verificar el cambio de espaciado
      return newSpacing;
    });
  };

  const resetAccessibilitySettings = () => {
    setFontSize(14); // Restablecer tamaño de fuente
    setSpacing(1); // Restablecer espaciado
    setIsHighContrast(false); // Restablecer alto contraste
    setIsGrayScale(false); // Restablecer escala de grises
    setIsDyslexicFont(false); // Restablecer fuente disléxica
    setIsBigCursor(false); // Restablecer cursor grande
    setHighlightLinks(false); // Restablecer resaltado de enlaces
    console.log("Accessibility settings reset"); // Verificar que se restablecieron los ajustes
  };

  return (
    <div
      className={`accessibilityBar ${isHighContrast ? "high-contrast" : ""} ${
        isGrayScale ? "gray-scale" : ""
      } ${isDyslexicFont ? "font-dyslexic" : ""} ${
        isBigCursor ? "big-cursor" : ""
      }`}
      style={{ fontSize: `${fontSize}px`, letterSpacing: `${spacing * 0.5}px` }}
    >
      <figure
        className="accessibilityBar__figure"
        tabIndex="0"
        onClick={toggleMenu}
      >
        <img
          src="/Assets/images/logo.svg"
          alt="logo"
          className="accessibilityBar__logo"
          title="Accesibilidad"
        />
      </figure>
      {isMenuActive && (
        <div className="accessibilityBar__content" tabIndex="0">
          <h3 className="accessibilityBar__title">Accesibilidad</h3>
          <div className="accessibilityBar__options">
            {data.map((item) => (
              <button
                key={item.id}
                className="accessibilityBar__option"
                onClick={() => {
                  switch (item.id) {
                    case "moreSizeAc":
                      changeFontSize("more");
                      break;
                    case "lessSizeAc":
                      changeFontSize("less");
                      break;
                    case "restartAc":
                      resetAccessibilitySettings(); // Llamar a la función de reinicio
                      break;
                    case "moreSpacingAc":
                      changeSpacing("more");
                      break;
                    case "lessSpacingAc":
                      changeSpacing("less");
                      break;
                    case "contrastAc":
                      setIsHighContrast(!isHighContrast);
                      break;
                    case "grayAc":
                      setIsGrayScale(!isGrayScale);
                      break;
                    case "cursorAc":
                      setIsBigCursor(!isBigCursor);
                      break;
                    case "linksAc":
                      setHighlightLinks(!highlightLinks);
                      break;
                    case "dyslexicAc":
                      setIsDyslexicFont(!isDyslexicFont);
                      break;
                    default:
                      break;
                  }
                }}
              >
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
