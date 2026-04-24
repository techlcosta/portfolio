import Image from 'next/image'

interface ProfileProps {
  imageAlt: string
}

export function Profile({ imageAlt }: ProfileProps) {
  return (
    <div className="animate-float border-primary rounded-full border-[5px] p-2 shadow-[0_0_0_1px_rgba(39,223,183,0.2),0_30px_60px_-24px_rgba(39,223,183,0.32)]">
      <div className="relative h-56 w-56 overflow-hidden rounded-full bg-[#d6d7d8] sm:h-60 sm:w-60 md:h-72 md:w-72">
        <Image src="/my_profile.png" alt={imageAlt} fill priority className="object-cover" sizes="(min-width: 768px) 340px, 300px" />
      </div>
    </div>
  )
}
