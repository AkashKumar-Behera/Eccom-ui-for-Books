"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

export interface SelectOption {
  id: string;
  name: string;
  icon?: React.ReactNode;
}

interface CustomSelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  size?: "default" | "sm" | "md";
  variant?: "admin" | "store";
}

export default function CustomSelect({
  options,
  value,
  onChange,
  placeholder = "Select an option...",
  className = "",
  disabled = false,
  size = "default",
  variant = "admin",
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.id === value);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (optionId: string) => {
    onChange(optionId);
    setIsOpen(false);
  };

  const isSmall = size === "sm";
  const isStore = variant === "store";

  return (
    <div ref={dropdownRef} className={`relative w-full ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-full flex items-center justify-between transition-all duration-200 cursor-pointer ${
          isStore
            ? isSmall
              ? "bg-[var(--card-bg)] border border-[var(--border-color)] rounded-full px-3.5 py-1.5 text-xs text-[var(--text-primary)] hover:border-[var(--btn-shop)] shadow-2xs font-semibold"
              : "bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-[var(--text-primary)] hover:border-[var(--btn-shop)] shadow-2xs font-semibold"
            : isSmall
            ? "bg-[#0d1314] border border-white/10 rounded-full px-4 py-2 text-xs text-white hover:border-[#98C4C5]/50"
            : "bg-[#0d1314] border border-white/10 rounded-2xl px-4 py-3 text-sm text-white hover:border-[#98C4C5]/50"
        } ${
          isOpen
            ? isStore
              ? "border-[var(--btn-shop)] ring-1 ring-[var(--btn-shop)] shadow-md"
              : "border-[#98C4C5] ring-1 ring-[#98C4C5] shadow-lg shadow-[#98C4C5]/10"
            : ""
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2 truncate">
          {selectedOption ? (
            <>
              {selectedOption.icon && <span className="shrink-0">{selectedOption.icon}</span>}
              <span className={`truncate font-sans ${isStore ? "text-[var(--text-primary)]" : "text-white"}`}>
                {selectedOption.name}
              </span>
            </>
          ) : (
            <span className={`font-normal ${isStore ? "text-[var(--text-secondary)]" : "text-zinc-500"}`}>
              {placeholder}
            </span>
          )}
        </div>

        <ChevronDown
          className={`shrink-0 transition-transform duration-200 ${
            isSmall ? "w-3.5 h-3.5 ml-2" : "w-4 h-4 ml-2"
          } ${
            isOpen
              ? isStore
                ? "rotate-180 text-[var(--text-brand)]"
                : "rotate-180 text-[#98C4C5]"
              : isStore
              ? "text-[var(--text-secondary)]"
              : "text-zinc-400"
          }`}
        />
      </button>

      {/* Popover Menu Options */}
      {isOpen && (
        <div
          className={`absolute left-0 right-0 mt-2 z-50 rounded-2xl shadow-2xl p-1.5 animate-in fade-in zoom-in-95 duration-150 max-h-72 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${
            isStore
              ? "bg-[var(--card-bg)] border border-[var(--border-color)] text-[var(--text-primary)] backdrop-blur-md"
              : "bg-[#121c1d]/95 backdrop-blur-xl border border-white/15 text-white"
          } ${isSmall ? "min-w-[190px]" : "w-full"}`}
          role="listbox"
        >
          {options.length === 0 ? (
            <div
              className={`px-3 py-2 text-xs text-center ${
                isStore ? "text-[var(--text-secondary)]" : "text-zinc-500"
              }`}
            >
              No options available
            </div>
          ) : (
            options.map((option) => {
              const isSelected = option.id === value;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleSelect(option.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left transition-all duration-150 cursor-pointer ${
                    isSmall ? "text-xs" : "text-xs sm:text-sm"
                  } ${
                    isStore
                      ? isSelected
                        ? "bg-[var(--btn-shop)]/15 text-[var(--text-brand)] font-bold font-moresugar"
                        : "text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]"
                      : isSelected
                      ? "bg-[#98C4C5]/15 text-[#98C4C5] font-semibold"
                      : "text-zinc-300 hover:bg-white/5 hover:text-white"
                  }`}
                  role="option"
                  aria-selected={isSelected}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    {option.icon && <span className="shrink-0">{option.icon}</span>}
                    <span className="truncate">{option.name}</span>
                  </div>

                  {isSelected && (
                    <Check
                      className={`w-4 h-4 shrink-0 ml-2 animate-in zoom-in ${
                        isStore ? "text-[var(--text-brand)]" : "text-[#98C4C5]"
                      }`}
                    />
                  )}
                </button>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
