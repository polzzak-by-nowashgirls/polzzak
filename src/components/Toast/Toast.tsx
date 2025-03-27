import { useToastStore } from '@/store/useToastStore';

function Toast() {
  const message = useToastStore((state) => state.message);
  if (!message) return null;

  return (
    <div className="fixed top-[64px] left-1/2 z-10 flex -translate-x-[50%] items-center gap-4 rounded-md bg-black/75 px-4 py-2">
      <p className="font-regular fs-14 whitespace-nowrap text-white">
        {message}
      </p>
    </div>
  );
}

export default Toast;
