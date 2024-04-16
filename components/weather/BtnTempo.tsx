import type { Temperature } from "apps/weather/loaders/temperature.ts";

export interface Props {
  temperature: Temperature | null;
}

export default function ButttonTemperature({ temperature }: Props) {
  if (!temperature?.celsius) {
    return null;
  }

  return (
    <div class="fixed right-5 bg-secondary rounded-full bottom-10 py-3 px-6 w-fit font-bold">
      {temperature?.celsius + "ºC"}
    </div>
  );
}