import styled from "styled-components";

export const StyleDragArea = styled.div`  
  .file-upload-input {
    position: absolute;
    margin: 0;
    padding: 0;
    width: 50%;
    height: 50%;
    outline: none;
    opacity: 0;
    z-index: 1;
    cursor: pointer;
  }

  .image-upload-wrap {
    position: relative;
    height: 180px;
    border: 4px solid #c4c4c4;
    margin-left: 10px;
    margin-right: 10px;
  }

  .image-upload-wrap:hover {
    background-color: transparent;
    border: 4px dashed #c4c4c4;
  }
  .text-information {
    margin-top: 30px;
    text-align: center;
  }
`;



export const Salir = () => (
  <svg
    version="1.0"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 512.000000 512.000000"
    preserveAspectRatio="xMidYMid meet"
  >
    <g
      transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
      fill="#F68A20"
      stroke="none"
    >
      <path
        d="M980 5109 c-160 -31 -299 -173 -330 -339 -14 -73 -14 -4347 0 -4420
                    32 -170 170 -308 339 -340 74 -14 3069 -14 3141 0 170 32 308 170 340 339 6
                    35 10 628 10 1665 l0 1611 -748 748 -747 747 -980 -1 c-539 -1 -1000 -5 -1025
                    -10z m1580 -963 c0 -323 4 -565 10 -596 32 -170 170 -308 339 -340 32 -6 275
                    -10 597 -10 l544 0 0 -1385 0 -1385 -1490 0 -1490 0 0 2130 0 2130 745 0 745
                    0 0 -544z m875 -76 l440 -440 -443 0 -442 0 0 440 c0 242 1 440 3 440 1 0 200
                    -198 442 -440z"
      />
      <path
        d="M2348 2348 l-3 -213 -212 -3 -213 -2 0 -210 0 -210 213 -2 212 -3 3
                    -212 2 -213 210 0 210 0 2 213 3 212 213 3 212 2 0 210 0 210 -212 2 -213 3
                    -3 213 -2 212 -210 0 -210 0 -2 -212z"
      />
    </g>
  </svg>
);
