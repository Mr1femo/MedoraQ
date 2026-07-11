import type { ReactNode } from "react";
import { useRef, useState } from "react";

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

export interface FileUploadValue {
  name: string;
  type: string;
  size: number;
  dataUrl: string;
}

interface FileUploadProps {
  files: FileUploadValue[];
  onChange: (files: FileUploadValue[]) => void;
  accept?: string;
  multiple?: boolean;
  maxSizeMb?: number;
  hint?: string;
}

function readFileAsDataUrl(file: File): Promise<FileUploadValue> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve({
        name: file.name,
        type: file.type || "application/octet-stream",
        size: file.size,
        dataUrl: String(reader.result),
      });
    };
    reader.onerror = () => reject(new Error(`Failed to read ${file.name}`));
    reader.readAsDataURL(file);
  });
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function FileUpload({
  files,
  onChange,
  accept = ".png,.jpg,.jpeg,.pdf,.ai,.psd,.svg,.webp",
  multiple = true,
  maxSizeMb = 8,
  hint,
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = async (list: FileList | null) => {
    if (!list || list.length === 0) return;
    setError(null);

    const selected = Array.from(list);
    const maxBytes = maxSizeMb * 1024 * 1024;
    const tooLarge = selected.find((f) => f.size > maxBytes);
    if (tooLarge) {
      setError(`"${tooLarge.name}" exceeds ${maxSizeMb} MB. Please upload a smaller file.`);
      return;
    }

    try {
      const uploaded = await Promise.all(selected.map(readFileAsDataUrl));
      onChange(multiple ? [...files, ...uploaded] : uploaded.slice(0, 1));
    } catch {
      setError("Could not read one or more files. Please try again.");
    }
  };

  const removeAt = (index: number) => {
    onChange(files.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-black/15 bg-black/[0.02] px-4 py-8 text-sm text-black/60 transition-all hover:border-brand/50 hover:bg-brand/5 hover:text-black"
      >
        <svg className="h-8 w-8 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
          />
        </svg>
        <span className="font-medium text-black">Click to upload{multiple ? " files" : " a file"}</span>
        <span className="text-xs text-black/40">
          {hint || `PNG, JPG, PDF, AI, PSD · max ${maxSizeMb} MB each`}
        </span>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={(e) => {
          void handleFiles(e.target.files);
          e.target.value = "";
        }}
      />

      {error && (
        <p className="text-xs text-red-600">{error}</p>
      )}

      {files.length > 0 && (
        <ul className="space-y-2">
          {files.map((file, index) => (
            <li
              key={`${file.name}-${index}`}
              className="flex items-center justify-between gap-3 rounded-xl border border-black/10 bg-white px-4 py-3 text-sm"
            >
              <div className="min-w-0">
                <p className="truncate font-medium text-black">{file.name}</p>
                <p className="text-xs text-black/40">{formatFileSize(file.size)}</p>
              </div>
              <button
                type="button"
                onClick={() => removeAt(index)}
                className="shrink-0 rounded-lg px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-50"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
