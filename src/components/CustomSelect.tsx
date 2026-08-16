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
  size?: "default" | "sm";
}

export default function CustomSelect({
  options,
  value,
  onChange,
  placeholder = "Select an option...",
  className = "",
  disabled = false,
  size = "default",
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

  return (
    <div ref={dropdownRef} className={`relative w-full ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-full flex items-center justify-between transition-all duration-200 cursor-pointer ${
          isSmall
            ? "bg-[#0d1314] border border-white/10 rounded-full px-4 py-2 text-xs text-white hover:border-[#98C4C5]/50"
            : "bg-[#0d1314] border border-white/10 rounded-2xl px-4 py-3 text-sm text-white hover:border-[#98C4C5]/50"
        } ${
          isOpen
            ? "border-[#98C4C5] ring-1 ring-[#98C4C5] shadow-lg shadow-[#98C4C5]/10"
            : ""
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2 truncate">
          {selectedOption ? (
            <>
              {selectedOption.icon && <span className="shrink-0">{selectedOption.icon}</span>}
              <span className="font-medium text-white truncate">{selectedOption.name}</span>
            </>
          ) : (
            <span className="text-zinc-500 font-normal">{placeholder}</span>
          )}
        </div>

        <ChevronDown
          className={`shrink-0 transition-transform duration-200 ${
            isSmall ? "w-3.5 h-3.5 ml-2" : "w-4 h-4 ml-2"
          } ${isOpen ? "rotate-180 text-[#98C4C5]" : "text-zinc-400"}`}
        />
      </button>

      {/* Popover Menu Options */}
      {isOpen && (
        <div
          className={`absolute left-0 right-0 mt-2 z-50 bg-[#121c1d]/95 backdrop-blur-xl border border-white/15 rounded-2xl shadow-2xl p-1.5 animate-in fade-in zoom-in-95 duration-150 max-h-72 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${
            isSmall ? "min-w-[180px]" : "w-full"
          }`}
          role="listbox"
        >
          {options.length === 0 ? (
            <div className="px-3 py-2 text-xs text-zinc-500 text-center">
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
                    isSmall ? "text-xs" : "text-sm"
                  } ${
                    isSelected
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
                    <Check className="w-4 h-4 text-[#98C4C5] shrink-0 ml-2 animate-in zoom-in" />
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
