import { VectorLayer } from 'app/model/layers';

import { LayerActionTypes, LayerActions } from './actions';

export interface State {
  readonly vectorLayer: VectorLayer;
  readonly selectedLayerIds: ReadonlySet<string>;
  readonly hoveredLayerId: string;
  readonly collapsedLayerIds: ReadonlySet<string>;
  readonly hiddenLayerIds: ReadonlySet<string>;
}

export function buildInitialState(): State {
  return {
    vectorLayer: new VectorLayer(),
    selectedLayerIds: new Set<string>(),
    hoveredLayerId: undefined as string,
    collapsedLayerIds: new Set<string>(),
    hiddenLayerIds: new Set<string>(),
  };
}

export function reducer(state = buildInitialState(), action: LayerActions): State {
  switch (action.type) {
    case LayerActionTypes.SetVectorLayer:
      return { ...state, vectorLayer: action.payload.vectorLayer };
    case LayerActionTypes.SetSelectedLayers:
      return { ...state, selectedLayerIds: new Set<string>(action.payload.layerIds) };
    case LayerActionTypes.SetHoveredLayer:
      return { ...state, hoveredLayerId: action.payload.layerId };
    case LayerActionTypes.SetHiddenLayers:
      return { ...state, hiddenLayerIds: new Set<string>(action.payload.layerIds) };
    case LayerActionTypes.SetCollapsedLayers:
      return { ...state, collapsedLayerIds: new Set<string>(action.payload.layerIds) };
  }
  return state;
}
