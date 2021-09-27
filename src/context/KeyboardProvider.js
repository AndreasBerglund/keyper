import React, { useEffect, useContext, createContext, useReducer } from "react";
import {
  buildKeyboardObject,
  buildSceneObject,
  loadModels,
  loadTextures,
} from "../helpers/resourceLoader";
import { StateSettingsContext } from "./SettingsProvider";

export const DispatchKeyboardContext = createContext();
export const StateKeyboardContext = createContext();

const initialState = {
  isError: false,
  case: {},
  keys: [],
  isLoading: false,
  modelsLoaded: false,
  texturesLoaded: false,
  printMapsLoaded: false,
  floor: {},
  resources: {
    models: [],
    textures: [],
  },
  toggler: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "init": {
      return {
        ...state,
        isLoading: true,
      };
    }
    case "set_key_and_case_objects": {
      const { keyboardObject, sceneObject } = action.payload;
      return {
        ...state,
        ...keyboardObject,
        ...sceneObject,
      };
    }
    case "set_models": {
      const models = action.payload;
      return {
        ...state,
        modelsLoaded: true,
        resources: { ...state.resources, models: models },
      };
    }
    case "set_textures": {
      const textures = action.payload;
      return {
        ...state,
        texturesLoaded: true,
        isLoading: false,
        resources: { ...state.resources, textures: textures },
      };
    }
    case "render_after_canvas_update": {
      //to rerender keys after all canvas textures has been updated
      console.log("render af canvas update");
      return {
        ...state,
        toggler: !state.toggler,
      };
    }
    case "init_print_maps" : {
      return {
        ...state,
        printMapsLoaded: false
      }
    }
    case "set_print_maps": {
      console.log("set print maps");
      const maps = action.payload;
      const newKeys = [...state.keys];
      newKeys.forEach((key) => {
        const resourceIndex = maps.findIndex((x) => x.id === key.key_id);
        key.printTexture = maps[resourceIndex].texture;
      });
      return {
        ...state,
        printMapsLoaded: true,
        keys: newKeys,
      };
    }
    case "toggle_select_key": {
      //toggle selected key by id
      const key_id_array = action.payload;
      const keys_new_state = [...state.keys].map((key) => {
        if (key_id_array.indexOf(key.key_id) > -1) {
          return {
            ...key,
            state: { ...key.state, selected: !key.state.selected },
          };
        } else {
          return key;
        }
      });
      return {
        ...state,
        keys: keys_new_state,
      };
    }
    case "apply_color": {
      const { colorId, selection, target } = action.payload;

      console.log(colorId, selection, target);

      const isAllKeys = selection === "all_keys";
      const isAlphaOrModifier =
        selection === "modifier" || selection === "alphanumeric";
      const isArray = Array.isArray(selection);

      const keys_new_state = [...state.keys].map((key) => {
        if (
          (isAlphaOrModifier && key.type === selection) ||
          isAllKeys ||
          (isArray && selection.indexOf(key.key_id) > -1)
        ) {
          if (target === "cap") {
            return { ...key, state: { ...key.state, capColorId: colorId } };
          } else if (target === "print") {
            return { ...key, state: { ...key.state, charColorId: colorId } };
          } else {
            return key;
          }
        } else {
          return key;
        }
      });

      return {
        ...state,
        keys: keys_new_state,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

const KeyboardProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const settings = useContext(StateSettingsContext);

  useEffect(() => {
    const mainLoader = async () => {
      dispatch({ type: "init" });
      //build the resource object from settings
      const keyboardObject = await buildKeyboardObject(settings);
      const sceneObject = await buildSceneObject(settings);

      dispatch({
        type: "set_key_and_case_objects",
        payload: { keyboardObject, sceneObject },
      });

      //load models
      const models = await loadModels({ ...keyboardObject, ...sceneObject });
      dispatch({ type: "set_models", payload: models });

      //load textures
      const textures = await loadTextures({
        ...keyboardObject,
        ...sceneObject,
      });
      dispatch({ type: "set_textures", payload: textures });
    };

    if (Object.keys(settings).length > 0) {
      mainLoader();
    }
  }, [settings]);

  return (
    <DispatchKeyboardContext.Provider value={dispatch}>
      <StateKeyboardContext.Provider value={state}>
        {children}
      </StateKeyboardContext.Provider>
    </DispatchKeyboardContext.Provider>
  );
};

export default KeyboardProvider;
