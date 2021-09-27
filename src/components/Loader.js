import React, { useState, useEffect } from 'react';
// import Spinner from 'react-spinner-material';
import { useProgress } from '@react-three/drei';
import styled from 'styled-components';
import { Logo } from './Panel';

const Loader = ({zIndex, ready}) => {
    const { active, progress, errors, item, loaded, total } = useProgress()
    console.log(active, progress, item, loaded, errors, total)

    const [loaderText, setLoaderText] = useState("Loading 3d models");
    useEffect(() => {
        if (item.includes('textures')) {
            setLoaderText("Loading textures")
        }
    }, [item])


    return (
        <StyledLoader>
            <Logo pulse>
                <span>Tasty caps</span>
            </Logo>
            {/* <Spinner radius={60} color={"#ccc"} stroke={5} visible={ready} /> */}
            {/* <h2>{ Math.round(progress) } % </h2> */}
            <p>{loaderText}</p>

        </StyledLoader>
    )
}

export default Loader

const StyledLoader = styled.div`
    width :100%;
    height: 100%;
    background-color: #232323;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #efefef;
    ${Logo} { 
        span { color: #fff }
        span:first-child { font-size: 56px;}
        margin-bottom: 0;
    }
`;