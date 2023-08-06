import React, { useState, useEffect } from "react"
import styled from "styled-components"
import _ from "lodash"

import { Link } from "gatsby"

import Title from "components/Title"
import TagList from "components/TagList"

const StyledLink = styled(Link)`
  text-decoration: none;
`

const PostListWrapper = styled.div`
  @media (max-width: 768px) {
    padding: 0 10px;
  }
`

const PostWrapper = styled.div`
  position: relative;
  top: 0;
  transition: all 0.5s;
  background-color: ${props =>
    props.theme.colors.hoveredTagBackground}; // Add this line
  border-radius: 10px; // Add this line if you want rounded corners
  padding: 20px; // Add this line to give some space around the content
  margin-bottom: 16px; // Adjust the margin for smaller screens if needed
  &:hover {
    background-color: ${props =>
      props.theme.colors
        .background}; // Add this line to change the background color on hover
  }

  @media (max-width: 768px) {
    padding: 0 10px;
    margin-bottom: 10px; // Adjust the margin for smaller screens if needed
  }
`

const Date = styled.p`
  margin-bottom: 16px;
  font-size: 14.4px;
  color: ${props => props.theme.colors.tertiaryText};
`

const Excerpt = styled.p`
  margin-bottom: 32px;
  line-height: 1.7;
  font-size: 16px;
  color: ${props => props.theme.colors.secondaryText};
  word-break: normal;
`

const checkIsScrollAtBottom = () => {
  return (
    document.documentElement.scrollHeight -
      document.documentElement.scrollTop <=
    document.documentElement.clientHeight + 100
  )
}

const PostList = ({ postList }) => {
  const [postCount, setPostCount] = useState(10)

  const handleMoreLoad = _.throttle(() => {
    if (checkIsScrollAtBottom() && postCount < postList.length) {
      setTimeout(() => setPostCount(postCount + 10), 300)
    }
  }, 250)

  useEffect(() => {
    window.addEventListener("scroll", handleMoreLoad)

    return () => {
      window.removeEventListener("scroll", handleMoreLoad)
    }
  }, [postCount, postList])

  useEffect(() => {
    setPostCount(10)
  }, [postList])

  return (
    <PostListWrapper>
      {postList.slice(0, postCount).map((post) => {
        const { title, description, date, tags } = post.frontmatter
        const { excerpt } = post
        const { slug } = post.fields

        return (
          <>
            <PostWrapper>
              <StyledLink to={slug}>
                <Title size="bg">{title}</Title>
                <Date>{date}</Date>
                {description ? (
                  <Excerpt>{description}</Excerpt>
                ) : (
                  <Excerpt>{excerpt}</Excerpt>
                )}
              </StyledLink>
              <TagList tagList={tags} />
            </PostWrapper>
          </>
        )
      })}
    </PostListWrapper>
  )
}

export default PostList
