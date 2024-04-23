import type { Product } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { formatPrice } from "deco-sites/pandeirocamp/sdk/format.ts";
import { useOffer } from "deco-sites/pandeirocamp/sdk/useOffer.ts";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import AddToCartButtonVTEX from "deco-sites/pandeirocamp/islands/AddToCartButton/vtex.tsx";
import { asset } from "$fresh/runtime.ts";
import BtnProductVote from "deco-sites/pandeirocamp/islands/BtnProductVote.tsx";

export interface Props {
  product?: Product;
  animateImage?: boolean;
  preload?: boolean;
  index?: number;
}
const WIDTH = 300;
const HEIGHT = 300;

export function ErrorFallback({ error }: { error?: Error }) {
  return (
    <div class="flex flex-col mx-auto max-w-96 py-4 gap-2">
      <img
        src={asset("/image/acaraje.png")}
        class="object-cover"
        alt={"Acarajé"}
        height={400}
        width={400}
      />
      <h2 class="text-xl py-4">Acarajé</h2>
      <p class="">
        O acarajé é uma iguaria icônica da culinária baiana, repleta de sabores
        e tradição. Feito com uma massa especial de feijão-fradinho temperada e
        frita em azeite de dendê, o acarajé tem uma crosta crocante por fora e
        um interior macio e saboroso. Geralmente servido com vatapá, camarão
        seco, salada e pimenta, é uma explosão de sabores que encanta os
        paladares e faz parte da cultura vibrante da Bahia. Experimente essa
        delícia e embarque numa viagem gastronômica única!
      </p>
      <a href="/cultura" class="btn btn-accent btn-outline">
        Saiba mais sobre
      </a>
    </div>
  );
}

export function LoadingFallback() {
  <div class="container flex justify-center py-4">
    <div class="flex max-sm:flex-col gap-4">
      <div class="skeleton h-52 w-52 shrink-0"></div>
      <div class="px-2 flex flex-col gap-1 self-stretch shrink-0 w-64">
        <div class="skeleton h-4"></div>
        <div class="skeleton h-4 w-full mb-auto"></div>
        <div class="skeleton h-4 w-14"></div>
        <div class="skeleton h-4 w-18 mb-4"></div>
        <div class="skeleton h-12 w-full"></div>
      </div>
    </div>
  </div>;
}

export default function HorizontalProductCard(
  { product, preload, animateImage }: Props,
) {
  if (!product) {
    return null;
  }
  const { url, productID, name, image: images, offers, isVariantOf } = product;
  const description = product.description || isVariantOf?.description;
  const productGroupID = isVariantOf?.productGroupID;
  const [front, back] = images ?? [];
  const eventParams = {
    items: [{ item_url: url, quantity: 1, item_name: name! }],
  };
  const { listPrice, price, seller = "1" } = useOffer(offers);
  return (
    <div class="w-full h-auto lg:px-2">
      <div class="w-full flex p-3 lg:p-5 relative border rounded-2xl border-gray-300">
      <BtnProductVote productId={productID} />
        <a href={url} class={`overflow-hidden lg:w-[30%]`}>
          <Image
            src={front.url!}
            alt={front.alternateName}
            width={WIDTH}
            height={HEIGHT}
            class={`w-full max-w-44 duration-100 transition-scale scale-100 ${
              animateImage && "lg:hover:scale-125"
            } mx-auto`}
            preload={preload}
            loading={preload ? "eager" : "lazy"}
            decoding="async"
          />
        </a>
        <div class="flex flex-col w-1/2 lg:w-[70%] gap-2">
          <div class="flex flex-col gap-2">
            <h2
              class="text-sm truncate lg:text-xl font-semibold"
              dangerouslySetInnerHTML={{ __html: name ?? "" }}
            >
            </h2>
            <span
              class={`text-xs truncate lg:text-sm`}
              dangerouslySetInnerHTML={{ __html: description ?? "" }}
            >
            </span>
          </div>
          <div class="flex flex-col gap-2">
            <span class="text-xs lg:text-sm line-through">
              {formatPrice(listPrice, offers?.priceCurrency)}
            </span>
            <span>{formatPrice(price, offers?.priceCurrency)}</span>
            <div class={`xl:w-1/2`}>
              <AddToCartButtonVTEX
                eventParams={eventParams}
                productID={productID}
                seller={seller}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
