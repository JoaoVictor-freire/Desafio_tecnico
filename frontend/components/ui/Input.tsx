interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

export function Input({ label, id, ...props }: InputProps) {
    const inputId = id || label.toLowerCase().replace(/\s/g, '-');
    return (
        <div>
            <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <input
                id={inputId}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500"
                {...props}
            />
        </div>
    );
}
