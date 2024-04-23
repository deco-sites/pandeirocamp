import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { usePartialSection } from "deco/hooks/usePartialSection.ts";

interface itemImage {
  image: ImageWidget;
  alt: string;
  href?: string;
}

export interface Props {
  title: string;
  /**
   * @minItems 3
   * @title Lista de imagens
   * @description Cadastre, pelo menos, 3 imagens
   */
  listImages: itemImage[];
  count: number;
}

export default function PartialImageGallery(
  { title, listImages, count }: Props,
) {
  return (
    <div class="w-full lg:container px-4 mx-auto pt-8 lg:pt-10 pb-28 flex flex-col items-center gap-6 relative">
      <h2 class="text-2xl font-light leading-8 lg:leading-10 text-base-content lg:text-4xl text-center">
        {title}
      </h2>

      <div class="flex w-full flex-wrap gap-2 md:gap-8 justify-center">
        {listImages.map(({ image, alt, href }, index) => {
          if (index < count) {
            return (
              <a
                href={href}
                class="w-1/2 md:w-1/4 h-24 max-h-24 duration-300 hover:scale-110 md:h-64 md:max-h-64 flex justify-center items-center overflow-hidden rounded md:rounded-xl"
              >
                <Image
                  width={96}
                  height={160}
                  sizes="(max-width: 304px) 100vw, 30vw"
                  src={image}
                  alt={alt}
                  class="object-cover h-full w-full"
                  decoding="async"
                  loading="lazy"
                />
              </a>
            );
          }
        })}
      </div>

      {listImages?.length > count && (
        <div class="max-w-48 w-48 absolute bottom-10 left-1/2 -translate-x-2/4">
          <button
            class="btn btn-block btn-secondary hover:btn-primary"
            {...usePartialSection({
              mode: "replace",
              props: { listImages, count: count + 1 },
            })}
          >
            Carregar mais
          </button>
        </div>
      )}
    </div>
  );
}
