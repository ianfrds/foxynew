import { LogoLoop } from './ui/LogoLoop/LogoLoop'

export default function LogoScroller() {
  return (
    <section className="py-8 md:py-12 logo-scroller">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Mobile */}
        <div className="sm:hidden">
          <LogoLoop
            logos={[
              { src: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Shopee.svg', alt: 'Shopee' },
              { src: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/Tokopedia.svg', alt: 'Tokopedia' },
              { src: 'https://jagoketik.com/wp-content/uploads/2023/02/tiktok_shop-logo_brandlogos.net_5ewfz-edited.webp', alt: 'TikTok Shop' },
            ]}
            speed={50}
            direction="left"
            logoHeight={24}
            gap={36}
            pauseOnHover
          />
        </div>
        {/* Desktop */}
        <div className="hidden sm:block">
          <LogoLoop
            logos={[
              { src: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Shopee.svg', alt: 'Shopee' },
              { src: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/Tokopedia.svg', alt: 'Tokopedia' },
              { src: 'https://jagoketik.com/wp-content/uploads/2023/02/tiktok_shop-logo_brandlogos.net_5ewfz-edited.webp', alt: 'TikTok Shop' },
            ]}
            speed={50}
            direction="left"
            logoHeight={36}
            gap={64}
            pauseOnHover
          />
        </div>
      </div>
    </section>
  )
}
