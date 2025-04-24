export default function Button({ children, variant = 'primary', size = 'md', type = 'button', className = '', onClick, disabled = false }) {
  const baseClasses = 'inline-flex items-center justify-center border font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500';
  
  const variantClasses = {
    primary: 'border-transparent text-white bg-indigo-600 hover:bg-indigo-700',
    secondary: 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50',
    success: 'border-transparent text-white bg-green-600 hover:bg-green-700',
    danger: 'border-transparent text-white bg-red-600 hover:bg-red-700',
    ghost: 'border-transparent text-gray-700 bg-transparent hover:bg-gray-100'
  };
  
  const sizeClasses = {
    xs: 'px-2.5 py-1.5 text-xs',
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-3 text-base',
    xl: 'px-6 py-4 text-base'
  };
  
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';
  
  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`;
  
  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
