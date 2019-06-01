import React from "react"
import { Link } from "gatsby"

const Footer = () => {
  return (
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
      </a>{" "}
      &bull; <Link to="/photos">photos</Link>
      <p>
        © {new Date().getFullYear()}, Mis à disposition grâce à{` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </p>
    </footer>
  )
}

export default Footer
