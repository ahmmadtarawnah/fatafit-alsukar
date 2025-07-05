import React from 'react';
import styled from 'styled-components';

const CardButton = ({ children, href, onClick, className }) => {
  const ButtonContent = (
    <StyledWrapper>
      <button onClick={onClick} className={className}>
        {children}
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
    position: relative;
    padding: 10px 24px;
    background: #ffffff;
    font-size: 15px;
    font-weight: 500;
    color: #1D3E79;
    border: 2px solid #E5E7EB;
    border-radius: 8px;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
  }

  button:hover {
    background: #F3F4F6;
    border-color: #1D3E79;
    color: #1D3E79;
    transform: translateY(-1px);
  }

  button:active {
    transform: translateY(0);
  }
`;

export default CardButton; 