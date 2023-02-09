import { MarkerData } from "@/mocks/types";
import { HeatmapLayerFactory } from "@vgrid/react-leaflet-heatmap-layer";
import React, { useCallback } from "react";
import { LayersControl } from "react-leaflet";
import ClusterGroup from "./ClusterGroup";
import { GeoJSON } from "react-leaflet";
const HeatmapLayer = React.memo(HeatmapLayerFactory<Point>());
import faultLines from "./fault_lines.json";

export type Point = [number, number, number];

type Props = {
  points: Point[];
  data: MarkerData[];
};

const LayerControl = ({ points, data }: Props) => {
  const longitudeExtractor = useCallback((p: Point) => p[1], []);
  const latitudeExtractor = useCallback((p: Point) => p[0], []);
  const intensityExtractor = useCallback((p: Point) => p[2], []);
  return (
    <LayersControl position="topleft">
      <LayersControl.Overlay checked name="Isı haritası">
        <HeatmapLayer
          fitBoundsOnUpdate
          radius={15}
          points={points}
          longitudeExtractor={longitudeExtractor}
          latitudeExtractor={latitudeExtractor}
          intensityExtractor={intensityExtractor}
          useLocalExtrema={false}
        />
      </LayersControl.Overlay>
      <LayersControl.Overlay checked name="Noktalar">
        <ClusterGroup data={data} />
      </LayersControl.Overlay>
      <LayersControl.Overlay checked name="Fay hatları">
        <GeoJSON
          style={{ color: "tomato", weight: 3, opacity: 1 }}
          attribution="&copy; https://github.com/fraxen/tectonicplates/blob/master/GeoJSON/PB2002_plates.json"
          data={faultLines as any}
        />
      </LayersControl.Overlay>
    </LayersControl>
  );
};

export default LayerControl;
