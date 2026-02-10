import { env } from "app/lib/env_client";
import type { LayerConfigTemplate } from "app/lib/default_layers";
import csvText from "../../data/mabox_styles.csv?raw";

export interface FarmLayer {
  name: string;
  groupId: string;
  styleUrl: string;
}

function parseFarmCSV(raw: string): FarmLayer[] {
  const lines = raw.trim().split("\n");
  // Skip header: Finca,GroupId,Survey,2025,MapboxStyle
  return lines
    .slice(1)
    .map((line) => {
      const [name, groupId, , , styleUrl] = line.split(",");
      return { name: name.trim(), groupId: groupId.trim(), styleUrl: (styleUrl || "").trim() };
    })
    .filter((farm) => farm.styleUrl.startsWith("mapbox://"));
}

export const FARM_LAYERS: FarmLayer[] = parseFarmCSV(csvText);

export function farmToLayerConfig(farm: FarmLayer): LayerConfigTemplate {
  return {
    name: farm.name,
    url: farm.styleUrl,
    type: "MAPBOX",
    token: env.MAPBOX_TOKEN,
  };
}
