import React from "react"
import { Link } from "gatsby"

import { rhythm, scale } from "../utils/typography"

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      header = (
        <h1
          style={{
            ...scale(1.5),
            marginBottom: rhythm(1.5),
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h1>
      )
    } else {
      header = (
        <h3
          style={{
            fontFamily: `Montserrat, sans-serif`,
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h3>
      )
    }
    return (
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <header>{header}</header>
        <main>{children}</main>
        <footer>
          <div style={{ float: "right" }}>
            <a href="/rss.xml" target="_blank" rel="noopener noreferrer">
              rss
            </a>
          </div>
          <a
            href="https://github.com/yoannfleurydev"
            rel="noopener noreferrer"
            target="_blank"
            title="Lien vers la page github de Yoann Fleury"
          >
            github
          </a>{" "}
          &bull;{" "}
          <a
            href="https://mobile.twitter.com/yoannfleurydev"
            rel="noopener noreferrer"
            target="_blank"
            title="Lien vers la page twitter de Yoann Fleury"
          >
            twitter
          </a>
          <p>
            © {new Date().getFullYear()}, Mis à disposition grâce à{` `}
            <a href="https://www.gatsbyjs.org">Gatsby</a>
          </p>
        </footer>
      </div>
    )
  }
}

export default Layout
