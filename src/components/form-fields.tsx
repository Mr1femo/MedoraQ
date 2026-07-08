import type { ReactNode } from "react";
import { useRef } from "react";

interface FormFieldProps {
  label: string;
  required?: boolean;
  hint?: string;
  children: ReactNode;
}

export function FormField({ label, required, hint, children }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-black">
        {label}
        {required && <span className="ml-1 text-brand">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-black/50">{hint}</p>}
    </div>
  );
}

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}

export function TextInput({
  value,
  onChange,
  placeholder,
  type = "text",
  required,
}: TextInputProps) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
      className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-black outline-none transition-all placeholder:text-black/30 focus:border-brand focus:ring-2 focus:ring-brand/20"
    />
  );
}

interface TextAreaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  required?: boolean;
}

export function TextArea({
  value,
  onChange,
  placeholder,
  rows = 4,
  required,
}: TextAreaProps) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      required={required}
      className="w-full resize-y rounded-xl border border-black/10 bg-white px-4 py-3 text-black outline-none transition-all placeholder:text-black/30 focus:border-brand focus:ring-2 focus:ring-brand/20"
    />
  );
}

interface RadioGroupProps {
  name: string;
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
}

export function RadioGroup({ name, options, value, onChange }: RadioGroupProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {options.map((option) => (
        <label
          key={option}
          className={`cursor-pointer rounded-xl border px-4 py-2.5 text-sm font-medium transition-all ${
            value === option
              ? "border-brand bg-brand/10 text-black"
              : "border-black/10 bg-white text-black/70 hover:border-brand/40"
          }`}
        >
          <input
            type="radio"
            name={name}
            value={option}
            checked={value === option}
            onChange={() => onChange(option)}
            className="sr-only"
          />
          {option}
        </label>
      ))}
    </div>
  );
}

interface CheckboxGroupProps {
  options: readonly string[];
  values: string[];
  onChange: (values: string[]) => void;
}

export function CheckboxGroup({ options, values, onChange }: CheckboxGroupProps) {
  const valuesRef = useRef(values);
  valuesRef.current = values;

  const toggle = (option: string) => {
    const current = valuesRef.current;
    onChange(
      current.includes(option)
        ? current.filter((v) => v !== option)
        : [...current, option]
    );
  };

  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {options.map((option) => (
        <label
          key={option}
          className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition-all ${
            values.includes(option)
              ? "border-brand bg-brand/10 text-black"
              : "border-black/10 bg-white text-black/70 hover:border-brand/40"
          }`}
        >
          <input
            type="checkbox"
            checked={values.includes(option)}
            onChange={() => toggle(option)}
            className="h-4 w-4 accent-brand"
          />
          {option}
        </label>
      ))}
    </div>
  );
}

interface MultiSelectPillsProps {
  options: readonly string[];
  values: string[];
  onChange: (values: string[]) => void;
}

export function MultiSelectPills({ options, values, onChange }: MultiSelectPillsProps) {
  const valuesRef = useRef(values);
  valuesRef.current = values;

  const toggle = (option: string) => {
    const current = valuesRef.current;
    onChange(
      current.includes(option)
        ? current.filter((v) => v !== option)
        : [...current, option]
    );
  };

  return (
    <div className="flex flex-wrap gap-3">
      {options.map((option) => {
        const selected = values.includes(option);
        return (
          <button
            key={option}
            type="button"
            aria-pressed={selected}
            onClick={() => toggle(option)}
            className={`rounded-xl border px-4 py-2.5 text-sm font-medium transition-all ${
              selected
                ? "border-brand bg-brand/10 text-black ring-1 ring-brand/30"
                : "border-black/10 bg-white text-black/70 hover:border-brand/40"
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

interface ScaleInputProps {
  min: number;
  max: number;
  value: string;
  onChange: (value: string) => void;
  lowLabel?: string;
  highLabel?: string;
}

export function ScaleInput({
  min,
  max,
  value,
  onChange,
  lowLabel,
  highLabel,
}: ScaleInputProps) {
  const options = Array.from({ length: max - min + 1 }, (_, i) => String(min + i));

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`flex h-11 w-11 items-center justify-center rounded-xl border text-sm font-semibold transition-all ${
              value === option
                ? "border-brand bg-brand text-white"
                : "border-black/10 bg-white text-black/70 hover:border-brand/40"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      {(lowLabel || highLabel) && (
        <div className="flex justify-between text-xs text-black/50">
          <span>{lowLabel}</span>
          <span>{highLabel}</span>
        </div>
      )}
    </div>
  );
}

interface SelectInputProps {
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  placeholder?: string;
  required?: boolean;
}

export function SelectInput({
  value,
  onChange,
  options,
  placeholder = "Choose",
  required,
}: SelectInputProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-black outline-none transition-all focus:border-brand focus:ring-2 focus:ring-brand/20"
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
