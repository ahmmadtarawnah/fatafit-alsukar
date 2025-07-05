import React from 'react';
import styled from 'styled-components';

const AnimatedButton = ({ children, href, onClick, className }) => {
  const ButtonContent = (
    <StyledWrapper>
      <button onClick={onClick} className={className}>
        {children}
        <div className="star-1">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={25} height={25}>
            <path fill="#4A90E2" d="M427.313,88.686c-47.803-47.803-125.213-47.803-173.016,0l-17.087,17.087l-17.087-17.087
          c-47.803-47.803-125.213-47.803-173.016,0c-47.803,47.803-47.803,125.213,0,173.016l190.103,190.103
          c4.88,4.88,11.316,7.322,17.752,7.322c6.435,0,13.871-2.442,18.751-7.322l190.103-190.103
          C475.116,213.899,475.116,136.489,427.313,88.686z" />
          </svg>
        </div>
        <div className="star-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={20} height={20}>
            <path fill="#4A90E2" d="M427.313,88.686c-47.803-47.803-125.213-47.803-173.016,0l-17.087,17.087l-17.087-17.087
          c-47.803-47.803-125.213-47.803-173.016,0c-47.803,47.803-47.803,125.213,0,173.016l190.103,190.103
          c4.88,4.88,11.316,7.322,17.752,7.322c6.435,0,13.871-2.442,18.751-7.322l190.103-190.103
          C475.116,213.899,475.116,136.489,427.313,88.686z" />
          </svg>
        </div>
        <div className="star-3">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={9} height={9}>
            <path fill="#4A90E2" d="M427.313,88.686c-47.803-47.803-125.213-47.803-173.016,0l-17.087,17.087l-17.087-17.087
          c-47.803-47.803-125.213-47.803-173.016,0c-47.803,47.803-47.803,125.213,0,173.016l190.103,190.103
          c4.88,4.88,11.316,7.322,17.752,7.322c6.435,0,13.871-2.442,18.751-7.322l190.103-190.103
          C475.116,213.899,475.116,136.489,427.313,88.686z" />
          </svg>
        </div>
        <div className="star-4">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={10} height={10}>
            <path fill="#4A90E2" d="M427.313,88.686c-47.803-47.803-125.213-47.803-173.016,0l-17.087,17.087l-17.087-17.087
          c-47.803-47.803-125.213-47.803-173.016,0c-47.803,47.803-47.803,125.213,0,173.016l190.103,190.103
          c4.88,4.88,11.316,7.322,17.752,7.322c6.435,0,13.871-2.442,18.751-7.322l190.103-190.103
          C475.116,213.899,475.116,136.489,427.313,88.686z" />
          </svg>
        </div>
        <div className="star-5">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={20} height={20}>
            <path fill="#4A90E2" d="M427.313,88.686c-47.803-47.803-125.213-47.803-173.016,0l-17.087,17.087l-17.087-17.087
          c-47.803-47.803-125.213-47.803-173.016,0c-47.803,47.803-47.803,125.213,0,173.016l190.103,190.103
          c4.88,4.88,11.316,7.322,17.752,7.322c6.435,0,13.871-2.442,18.751-7.322l190.103-190.103
          C475.116,213.899,475.116,136.489,427.313,88.686z" />
          </svg>
        </div>
        <div className="star-6">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={7} height={7}>
            <path fill="#4A90E2" d="M427.313,88.686c-47.803-47.803-125.213-47.803-173.016,0l-17.087,17.087l-17.087-17.087
          c-47.803-47.803-125.213-47.803-173.016,0c-47.803,47.803-47.803,125.213,0,173.016l190.103,190.103
          c4.88,4.88,11.316,7.322,17.752,7.322c6.435,0,13.871-2.442,18.751-7.322l190.103-190.103
          C475.116,213.899,475.116,136.489,427.313,88.686z" />
          </svg>
        </div>
      </button>
    </StyledWrapper>
  );

  if (href) {
    return <a href={href}>{ButtonContent}</a>;
  }

  return ButtonContent;
};

const StyledWrapper = styled.div`
  button {
    background: linear-gradient(to right, #4A90E2, #1D3E79);
    position: relative;
    padding: 12px 35px;
    font-size: 17px;
    font-weight: 500;
    color: white;
    border: 3px solid transparent;
    border-radius: 8px;
    box-shadow: 0 0 0 rgba(74, 144, 226, 0.3);
    transition: all 0.3s ease-in-out;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .star-1 {
    position: absolute;
    top: 20%;
    left: 20%;
    width: 25px;
    height: auto;
    filter: drop-shadow(0 0 0 #4A90E2);
    z-index: -5;
    transition: all 1s cubic-bezier(0.05, 0.83, 0.43, 0.96);
  }

  .star-2 {
    position: absolute;
    top: 45%;
    left: 45%;
    width: 15px;
    height: auto;
    filter: drop-shadow(0 0 0 #4A90E2);
    z-index: -5;
    transition: all 1s cubic-bezier(0, 0.4, 0, 1.01);
  }

  .star-3 {
    position: absolute;
    top: 40%;
    left: 40%;
    width: 5px;
    height: auto;
    filter: drop-shadow(0 0 0 #4A90E2);
    z-index: -5;
    transition: all 1s cubic-bezier(0, 0.4, 0, 1.01);
  }

  .star-4 {
    position: absolute;
    top: 20%;
    left: 40%;
    width: 8px;
    height: auto;
    filter: drop-shadow(0 0 0 #4A90E2);
    z-index: -5;
    transition: all 0.8s cubic-bezier(0, 0.4, 0, 1.01);
  }

  .star-5 {
    position: absolute;
    top: 25%;
    left: 45%;
    width: 15px;
    height: auto;
    filter: drop-shadow(0 0 0 #4A90E2);
    z-index: -5;
    transition: all 0.6s cubic-bezier(0, 0.4, 0, 1.01);
  }

  .star-6 {
    position: absolute;
    top: 5%;
    left: 50%;
    width: 5px;
    height: auto;
    filter: drop-shadow(0 0 0 #4A90E2);
    z-index: -5;
    transition: all 0.8s ease;
  }

  button:hover {
    background: transparent;
    color: #1D3E79;
    border-color: #1D3E79;
    box-shadow: 0 0 25px rgba(29, 62, 121, 0.3);
  }

  button:hover .star-1 {
    position: absolute;
    top: -80%;
    left: -30%;
    width: 25px;
    height: auto;
    filter: drop-shadow(0 0 10px #4A90E2);
    z-index: 2;
  }

  button:hover .star-2 {
    position: absolute;
    top: -25%;
    left: 10%;
    width: 15px;
    height: auto;
    filter: drop-shadow(0 0 10px #4A90E2);
    z-index: 2;
  }

  button:hover .star-3 {
    position: absolute;
    top: 55%;
    left: 25%;
    width: 5px;
    height: auto;
    filter: drop-shadow(0 0 10px #4A90E2);
    z-index: 2;
  }

  button:hover .star-4 {
    position: absolute;
    top: 30%;
    left: 80%;
    width: 8px;
    height: auto;
    filter: drop-shadow(0 0 10px #4A90E2);
    z-index: 2;
  }

  button:hover .star-5 {
    position: absolute;
    top: 25%;
    left: 115%;
    width: 15px;
    height: auto;
    filter: drop-shadow(0 0 10px #4A90E2);
    z-index: 2;
  }

  button:hover .star-6 {
    position: absolute;
    top: 5%;
    left: 60%;
    width: 5px;
    height: auto;
    filter: drop-shadow(0 0 10px #4A90E2);
    z-index: 2;
  }

  .fil0 {
    fill: #4A90E2;
  }
`;

export default AnimatedButton; 