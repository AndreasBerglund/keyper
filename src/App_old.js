import { useState, useRef, useEffect, useReducer } from 'react'


import initialSettings from './data/settings.json'

import ResourceBuilder from './helpers/ResourceBuilder.js'

const resourceReducer = (state, action) => {
  switch (action.type) {
    case 'SCENE_UPDATE_DATA':
      return {
        ...state,
        data: action.payload
      }
    case 'SCENE_LOAD_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false
      }
    case 'SCENE_LOADED_MODELS':
      return {
        ...state,
        isLoading: true, //Loads models first and textures last
        isError: false,
        models: action.payload
      }
    case 'SCENE_LOADED_TEXTURES':  
      return {
        ...state,
        isLoading: false, //Wait for dynamic textures
        isError: false,
        textures: action.payload
      }
    case 'SCENE_LOADED_DYNAMIC_TEXTURES':
      return {
        ...state,
        isLoading: false,
        isError : false,
        dynamicTexturesLoaded: true,
        dynTextures: action.payload
      }
    case 'SCENE_LOAD_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true
      }
    default:
      throw new Error()
  }
}




const App = () => {


  const changeSomething = () => {
    console.log('change something')
    console.log({...keyboard})
    setKeyboard({...keyboard, design: 'pineapple'})
  }

  const afterDynamicTexturesLoaded = ( texture ) => {
    console.log('dyno loaded')
    dispatchResources({ type: 'SCENE_LOADED_DYNAMIC_TEXTURES', payload: texture })
  }

  const appStyle = { width: '100%', height: '100vh', backgroundColor: '#ccc' }
  const [resources, dispatchResources] = useReducer(
    resourceReducer,
    { models: [], textures: [], dynamicTexturesLoaded: false, isLoading: false, isError: false }
  )

  const [keyboard, setKeyboard] = useState(initialSettings)
  const [settings, setSettings] = useState(initialSettings)

  
  useEffect(() => {
  
    console.log('reload/start')
    dispatchResources({ type: 'SCENE_LOAD_INIT' })

    //GET MODELS AND TEXTURES
    // getModels(keyboard)
    //   .then( result => {
    //     dispatchResources({ type: 'SCENE_LOADED_MODELS', payload: result })
    //     getTextures(keyboard)
    //       .then(result => { dispatchResources({ type: 'SCENE_LOADED_TEXTURES', payload: result }) })
    //       .catch(err => {
    //         dispatchResources({ type: 'SCENE_LOAD_FAILURE' })
    //       });
    // }).catch(err => {
    //   dispatchResources({ type: 'SCENE_LOAD_FAILURE' })
    // });



  }, [keyboard])

  return (
    <div className="App" style={appStyle} >
      {/* <Logo /> */}
      <ResourceBuilder settings={settings} />
      {/* <button onClick={changeSomething} >Change a thing</button>
      <DynamicTextureLoader afterDynamicTexturesLoaded={afterDynamicTexturesLoaded}/>
      {resources.isError && <p>Something went wrong...</p>}
      {resources.isLoading ? (
        <p style={{position:'fixed', top:'50%', left:'50%', zIndex: 200}}>Loading...</p>
      ) : (
          <ThreeContainer keyboard={keyboard} resources={resources} />
      )} */}

    </div>
  );
}

const Logo = () => {
  return (
    <div style={{ position: 'fixed', left: '20px', zIndex: 1 }}>
      <h1 style={{ color: '#fff', fontFamily: 'Helvetica', letterSpacing: '2px' }} >KEYPRESS</h1>
    </div>
  )
}

export default App;

