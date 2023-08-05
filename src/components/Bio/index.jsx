import React from "react"
import styled from "styled-components"
import { useSelector } from 'react-redux';

import {
  FaGithub,
  FaKaggle,
  FaFacebook,
  FaLinkedin,
  FaInstagram,
  FaEnvelope,
} from "react-icons/fa"

import { siteUrl, description, author, links } from "../../../blog-config"

const BioWrapper = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    padding: 0 15px;
  }
`

const profileImageRoot =
  typeof window !== "undefined" && window.location.host === "localhost:8000"
    ? "http://localhost:8000"
    : siteUrl

const Profile = styled.div`
  flex: 0 0 auto;
  margin-right: 16px;
  width: 128px;
  height: 128px;
  border-radius: 999px;
  background-image: url(${profileImageRoot}/images/profile.jpeg);
  background-size: cover;
  background-position: center;
`

const Author = styled.div`
  margin-bottom: 4.8px;
  font-size: 24px;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
`

const Description = styled.div`
  margin-bottom: 11.2px;
  line-height: 1.5;
  font-size: 16px;
  color: ${props => props.theme.colors.secondaryText};
`

const LinksWrapper = styled.div`
  & a {
    margin-right: 9.6px;
  }

  & svg {
    width: 25.6px;
    height: 25.6px;
    cursor: pointer;
  }

  & svg path {
    fill: ${props => props.theme.colors.icon};
    transition: fill 0.3s;
  }

  & a:hover svg path {
    fill: ${props => props.theme.colors.text};
  }

  & img {
    width: 25.6px;
    height: 25.6px;
    vertical-align: top; // to align with FontAwesome icons
    cursor: pointer;
    opacity: 0.62;
  }

  & img:hover {
    opacity: 1.0;
  }
`

const Link = ({ link, children }) => {
  if (!link) return null
  return (
    <a href={link} target="_blank" rel="noreferrer">
      {children}
    </a>
  )
}

const Bio = () => {
  const theme = useSelector(state => state.theme.theme);
  console.log(theme);
  const { github, kaggle, instagram, facebook, linkedIn, email, gumroad, notion } = links

  return (
    <BioWrapper id="bio">
      <Profile />
      <div>
        <Author>@{author}</Author>
        <Description>{description}</Description>
        <LinksWrapper>
          <Link link={github}>
            <FaGithub />
          </Link>
          <Link link={kaggle}>
            <FaKaggle />
          </Link>
          <Link link={instagram}>
            <FaInstagram />
          </Link>
          <Link link={facebook}>
            <FaFacebook />
          </Link>
          <Link link={linkedIn}>
            <FaLinkedin />
          </Link>
          <Link link={email}>
            <FaEnvelope />
          </Link>
          <Link link={gumroad}>
            <img src="https://assets-global.website-files.com/6171b265e5c8aa59b42c3472/618f28a89e94524552a002cb_g-icon.svg" alt="Gumroad"></img>
          </Link>
          <Link link={notion}>
          {theme === 'light' ? (
            <img src="/images/notion-logo-block-mono-black.svg" alt="Notion" />
          ) : (
            <img src="/images/notion-logo-block-mono-white.svg" alt="Notion" />
          )}
        </Link>
        </LinksWrapper>
      </div>
    </BioWrapper>
  )
}

export default Bio
