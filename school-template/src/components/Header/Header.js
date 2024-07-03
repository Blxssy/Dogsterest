import React from "react";
import styled from "styled-components";
import Container from "../Container/Container";

const Header = () => {
  return (
    <Container>
      <HeaderWrapper>
        <span>asdasd</span>
        <span>asdasd</span>
        <span>asdasd</span>
      </HeaderWrapper>
    </Container>
  );
};

const HeaderWrapper = styled("div")`
  padding-block: 20px;
  background: blue;
  padding-inline: 20px;
  color: white;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default Header;
