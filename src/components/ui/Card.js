export default function Card({ children, className = '', padding = 'default' }) {
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    default: 'p-6',
    lg: 'p-8'
  };
  
  return (
    <div className={`bg-white shadow overflow-hidden rounded-lg ${paddingClasses[padding]} ${className}`}>
      {children}
    </div>
  );
}
