'use client'


import Link from 'next/link'
import { usePathname } from 'next/navigation'


export default function LanguageSwitcher() {
const pathname = usePathname() || '/'
return (
<div className="flex items-center gap-2 text-xs md:text-sm">
<Link href={pathname} locale="en" className="hover:underline aria-[current=true]:font-semibold" aria-current="true">EN</Link>
<span aria-hidden>•</span>
<Link href={pathname} locale="fr" className="hover:underline">FR</Link>
</div>
)
}