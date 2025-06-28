/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';
import { useEffect, useRef } from 'react';

const rotateSphere = keyframes`
  from {
    transform: rotateY(0deg) rotateZ(0deg);
  }
  to {
    transform: rotateY(360deg) rotateZ(360deg);
  }
`;

const bodyStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  background-color: #000;
`;

const sphereContainerStyle = css`
  position: relative;
  width: 200px;
  height: 200px;
  perspective: 800px;

  @media (max-width: 1000px) {
    zoom: 0.68;
  }

  &:hover .layer {
    background-image: 
      repeating-conic-gradient(
        from 0deg at 0% 0%, 
        springgreen 0deg 1deg, 
        orange 1.1deg 2deg
      ),
      repeating-conic-gradient(
        from 0deg at 100% 100%, 
        springgreen 0deg 1deg, 
        orange 1.1deg 2deg
      );
  }
`;

const sphereStyle = css`
  position: absolute;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  animation: ${rotateSphere} 5s infinite linear;
`;

const layerStyle = css`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #ff45001a;
  border: 1px solid #ff45004d;
  background-image: 
    repeating-conic-gradient(
      from 0deg at 0% 0%, 
      blue 0deg 1deg, 
      red 1.1deg 2deg
    ),
    repeating-conic-gradient(
      from 0deg at 100% 100%, 
      blue 0deg 1deg, 
      red 1.1deg 2deg
    );
`;

const topBottomStyle = css`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  transform-origin: center;
`;

const topStyle = css`
  ${topBottomStyle};
  transform: rotateX(90deg) translateZ(100px);
`;

const bottomStyle = css`
  ${topBottomStyle};
  transform: rotateX(-90deg) translateZ(100px);
`;

export default function App() {
  const sphereRef = useRef(null);
  const numLayers = 20;

  useEffect(() => {
    if (!sphereRef.current) return;

    const sphere = sphereRef.current;
    // Limpiar cualquier capa anterior (por si se re-renderiza)
    while (sphere.firstChild && sphere.firstChild.classList.contains('layer')) {
      sphere.removeChild(sphere.firstChild);
    }

    for (let i = 0; i < numLayers; i++) {
      const angle = i * (360 / numLayers);
      const layer = document.createElement('div');
      layer.className = 'layer';
      layer.style.transform = `rotateY(${angle}deg) translateZ(100px)`;
      layer.style.position = 'absolute';
      layer.style.width = '100%';
      layer.style.height = '100%';
      layer.style.borderRadius = '50%';
      layer.style.backgroundColor = '#ff45001a';
      layer.style.border = '1px solid #ff45004d';
      layer.style.backgroundImage = `
        repeating-conic-gradient(
          from 0deg at 0% 0%, 
          blue 0deg 1deg, 
          red 1.1deg 2deg
        ),
        repeating-conic-gradient(
          from 0deg at 100% 100%, 
          blue 0deg 1deg, 
          red 1.1deg 2deg
        )
      `;

      sphere.appendChild(layer);
    }
  }, []);

  return (
    <div css={bodyStyle}>
      <div css={sphereContainerStyle}>
        <div css={sphereStyle} ref={sphereRef} id="sphere">
          <div css={topStyle} />
          <div css={bottomStyle} />
        </div>
      </div>
    </div>
  );
}
