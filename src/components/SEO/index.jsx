import React from "react"
import { Helmet } from "react-helmet"
import { title, siteUrl } from "../../../blog-config"

const SEO = ({ subtitle, description, url }) => {
  return (
    <Helmet
      link={
        url
          ? [{ rel: 'canonical', key: url, href: url }]
          : []
      }
      title={subtitle}
      titleTemplate={subtitle ? `%s` : `%s | ${title}`}
    >
      <title>{subtitle}</title>
      <meta property="og:url" content={url} />
      <meta property="og:title" content={subtitle} />
      <meta property="og:image" content={`${siteUrl}/og-image.png`} />
      {description && <meta name="description" content={description} />}
      {description && <meta property="og:description" content={description} />}
    </Helmet>
  )
}

export default SEO
