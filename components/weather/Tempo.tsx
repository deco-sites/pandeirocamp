import type { HTMLWidget, ImageWidget } from "apps/admin/widgets.ts";
import type { Temperature } from "apps/weather/loaders/temperature.ts";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  title: string;
  content: HTMLWidget;
  weather?: Temperature | null;
  imageHeat: ImageWidget;
  altHeat: string;
}

export default function Tempo(
  { title, content, weather, imageHeat, altHeat }: Props,
) {
  return (
    <div class="w-11/12 lg:w-1/2 mx-auto rounded-2xl mt-10 h-auto bg-secondary py-6 lg:py-12">
      <div class="flex mx-5 lg:mx-0 flex-col items-center justify-center gap-4">
        <h2 class="font-bold text-2xl">{title}</h2>
        <span
          class="text-base lg:text-lg"
          dangerouslySetInnerHTML={{ __html: content }}
        >
        </span>
        <div class="flex flex-row gap-4 items-center">
          <p class="text-5xl font-bold">{weather?.celsius + "ºC"}</p>
          <Image
            src={imageHeat}
            alt={altHeat}
            width={100}
            height={100}
            preload={true}
            loading={"eager"}
            decoding="async"
          />
        </div>
      </div>
    </div>
  );
}
