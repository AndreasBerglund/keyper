import { useState, useRef, useEffect, useReducer } from 'react'
import initialSettings from './data/settings.json'

import { getCaseData, getKeyData, getKeyLayout } from "./dataLoader"
import { getGeometry, getKeys, getMaterialTextures } from "./resourceLoader"

const resourceReducer = (state, action) => {
    switch (action.type) {
        case 'CASE_DATA_SET':
            return {
                ...state,
                case: { ...state.case, data: action.payload }
            }
        case 'CASE_MODEL_LOADED':
            return {
                ...state,
                case: { ...state.case, geometry: action.payload }
            }
        case 'CASE_TEXTURES_LOADED':
            return {
                ...state,
                case: { ...state.case, textures: action.payload }
            }
        case 'KEY_MODELS_LOADED':
            return {
                ...state,
                keys: action.payload
            }

        default:
            throw new Error()
    }
}

