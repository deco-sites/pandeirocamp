import { MatchContext } from "deco/blocks/matcher.ts";

export interface Props {
  campaignName: string;
}

interface QueryParams {
  [key: string]: string;
}

function extractQueryParameters(url: string): QueryParams {
  const searchParams = new URLSearchParams(url.split("?")[1]);
  const queryParams: QueryParams = {};
  for (const param of searchParams.entries()) {
    queryParams[param[0]] = param[1];
  }
  return queryParams;
}

export default function Utm(props: Props, ctx: MatchContext): boolean {
  const parameters = extractQueryParameters(ctx.request.url);

  // Verifica se utmcampaign está presente nos parâmetros e é igual ao campaignName
  return !!parameters?.utmcampaign && parameters.utmcampaign === props.campaignName;
}
