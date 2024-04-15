export interface Props {
  codigoCupom: string;
  descricao: string;
}

export default function Cupom({ codigoCupom, descricao }: Props) {
  return (
    <>
      <div class={`flex flex-col w-full bg-secondary py-10 gap-5`}>
        <h3 class={`text-center text-lg mx-5 text-primary`}>{descricao}</h3>
        <span
          class={`py-2 px-5 mx-auto lg:text-xl font-bold text-lg w-52 uppercase flex items-center justify-center lg:py-3 lg:px-6 border-2 border-dashed border-accent rounded-lg dashed`}
        >
          {codigoCupom}
        </span>
      </div>
    </>
  );
}
