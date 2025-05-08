import Image from 'next/image';

export default function LoadingComponent() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-[9999]">
      <div className="relative w-32 h-32 flex items-center justify-center">
        <Image
          src="/loading.gif"
          alt="Loading..."
          width={100}
          height={100}
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
}
