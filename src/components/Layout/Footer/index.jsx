import React from "react"
import styled from "styled-components"

import { author } from "../../../../blog-config"

const FooterWrapper = styled.footer`
  margin-top: 32px;
  padding: 40px 0;
  border-top: 1px solid ${props => props.theme.colors.divider};
  text-align: center;
  font-size: 11pt;
  font-weight: lighter;
  color: ${props => props.theme.colors.secondaryText};

  & > a {
    color: ${props => props.theme.colors.text};
  }
`

const Footer = () => {
  return (
    <FooterWrapper>
      &middot;
      {` `}
      {author}
      {` `}© {new Date().getFullYear()} &middot;
    </FooterWrapper>
  )
}

export default Footer
