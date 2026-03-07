interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'info';
}

export function Button({ variant = 'primary', className = '', children, ...props }: ButtonProps) {
    const variants = {
        primary:   'bg-red-600 text-white hover:bg-red-700',
        secondary: 'bg-gray-200 text-gray-700 hover:bg-gray-300',
        danger:    'bg-red-50 text-red-600 hover:bg-red-100',
        ghost:     'bg-white text-red-600 border border-red-600 hover:bg-red-50',
        info:      'bg-blue-50 text-blue-600 hover:bg-blue-100',
    };

    return (
        <button
            className={`px-4 py-2 rounded-md transition text-sm font-medium ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
