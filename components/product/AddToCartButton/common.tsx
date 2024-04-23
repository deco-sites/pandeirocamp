import { AddToCartParams } from "apps/commerce/types.ts";
import { useState } from "preact/hooks";
import Button from "../../../components/ui/Button.tsx";
import { sendEvent } from "../../../sdk/analytics.tsx";
import { useUI } from "../../../sdk/useUI.ts";
import { Bounce, toast, ToastContainer } from "react-toastify";
import ToastStyle from "deco-sites/pandeirocamp/components/ui/ToastStyle.tsx";

// deno-lint-ignore no-explicit-any
const Toast = ToastContainer as any;

export interface Props {
  /** @description: sku name */
  eventParams: AddToCartParams;
  onAddItem: () => Promise<void>;
}

const useAddToCart = ({ eventParams, onAddItem }: Props) => {
  const [loading, setLoading] = useState(false);
  const { displayCart } = useUI();

  const onClick = async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setLoading(true);

      await onAddItem();

      sendEvent({
        name: "add_to_cart",
        params: eventParams,
      });

      displayCart.value = true;
    } finally {
      setLoading(false);
      toast.success("Produto adicionado a sacola!", {
        position: "top-left",
        autoClose: 3000,
        draggable: false,
        icon: false,
        theme: "colored",
        transition: Bounce,
      });
    }
  };

  return { onClick, loading, "data-deco": "add-to-cart" };
};

export default function AddToCartButton(props: Props) {
  const btnProps = useAddToCart(props);

  return (
    <>
      <Button
        {...btnProps}
        class="btn-accent btn-outline hover:btn-accent w-full min-h-8 h-8"
      >
        Comprar
      </Button>
      <ToastStyle />
      <Toast />
    </>
  );
}
