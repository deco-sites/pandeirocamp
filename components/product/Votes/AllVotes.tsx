import Icon from "deco-sites/pandeirocamp/components/ui/Icon.tsx";
import { allVotes } from "deco-sites/pandeirocamp/sdk/useVotes.ts";
import { effect, useSignal, useSignalEffect } from "@preact/signals";
import { invoke } from "deco-sites/pandeirocamp/runtime.ts";

const getTotalVotes = async () => {
  const votes = await invoke["deco-sites/pandeirocamp"].loaders.getAllVotes();
  allVotes.value = votes?.total || 0;
};

effect(() => {
  const asyncFunction = async () => {
    await getTotalVotes();
    setInterval(async () => {
      await getTotalVotes();
    }, 30000);
  };
  asyncFunction();
  allVotes.value = allVotes.peek();
});

export default function AllVotes() {
  return (
    <div class="flex flex-row gap-2">
      <Icon id="Friends" size={24} />
      <span>{allVotes.value}</span>
    </div>
  );
}
