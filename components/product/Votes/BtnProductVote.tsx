import { useSignal, useSignalEffect } from "@preact/signals";
import Icon from "deco-sites/pandeirocamp/components/ui/Icon.tsx";
import { allVotes } from "deco-sites/pandeirocamp/sdk/useVotes.ts";
import { invoke } from "deco-sites/pandeirocamp/runtime.ts";
import { sendScoreEvent } from "deco-sites/pandeirocamp/sdk/analytics.tsx";
import { Bounce, toast, ToastContainer } from "react-toastify";
import ToastCss from "deco-sites/pandeirocamp/components/ui/ToastStyle.tsx";
export interface Props {
  productId: string;
}

export default function BtnProductVote({ productId }: Props) {
  const votes = useSignal<number>(0);
  const clicked = useSignal(false);
  //deno-lint-ignore no-explicit-any
  const ToastContainerComponent = ToastContainer as any;

  useSignalEffect(() => {
    async function addVote() {
      const response = await invoke["deco-sites/pandeirocamp"].actions.postVote(
        {
          productId: productId,
        },
      );
      allVotes.value++;
      if (response) {
        votes.value = response.product;
      }
      toast.success("Voto contabilizado! Obrigado!", {
        toastId: `btn-vote-${productId}`,
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        icon: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });

      sendScoreEvent({
        name: "post_score",
        params: {
          score: Number(response?.total),
        },
      });
    }

    async function getVotes() {
      const result = await invoke["deco-sites/pandeirocamp"].loaders.getVotes({
        productId: productId,
      });
      votes.value = result?.product ?? 0;
    }
    setInterval(() => {
      getVotes();
    }, 30000);

    if (clicked.value) {
      addVote();
    } else {
      getVotes();
    }
  });

  return (
    <div
      onClick={() => clicked.value = true}
      id={`btn-vote-${productId}`}
      class="cursor-pointer flex flex-row gap-2 items-center absolute bottom-2 lg:bottom-auto lg:top-3 left-3 z-10 bg-secondary px-1 py-1 rounded"
    >
      {!clicked.value
        ? <Icon id="moodSmile" size={24} />
        : <Icon id="moodCheck" size={24} />}
      <span class="font-bold text-sm">{votes.value} Votos</span>
      <ToastContainerComponent />
      <ToastCss />
    </div>
  );
}
