interface ValidationProps {
  status: boolean;
  message: string;
  className?: string;
}

function Validation({ status, message, className }: ValidationProps) {
  return (
    <p
      className={`text-13 mx-0.5 mt-1 px-2 ${status ? 'text-success' : 'text-error'} ${className}`}
    >
      {message}
    </p>
  );
}

export default Validation;
