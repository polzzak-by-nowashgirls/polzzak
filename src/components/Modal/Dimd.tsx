import React from 'react';

interface DimdProps {
  children: React.ReactNode;
}

function Dimd({ children }: DimdProps) {
  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 z-[99] h-screen w-screen bg-black/45">
      {/* <div onClick={(e) => e.stopPropagation()}>{children}</div> */}
      {children}
    </div>
  );
}

export default Dimd;
