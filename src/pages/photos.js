import React from "react";
import SEO from "../components/seo";
import Layout from "../components/layout";
import { graphql } from "gatsby";
import mediumZoom from "medium-zoom";

class ImageZoom extends React.Component {
  // Leave this part so I can add a calculated color later.
  // Calculated color will be like Twitter, the most present color in the image.
  zoom = this.props.zoom.clone({
    background: this.props.color,
  });

  attachZoom = (image) => {
    this.zoom.attach(image);
  };

  render() {
    return (
      <img
        src={this.props.src}
        alt={this.props.alt}
        ref={this.attachZoom}
        data-zoom-src={this.props.zoomSrc}
      />
    );
  }
}

const Photos = ({ data, location }) => {
  const [renderedImages, setRenderedImages] = React.useState(<div />);
  const images = data.allFile.edges;

  React.useEffect(() => {
    setRenderedImages(
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        {images.map(({ node }) => (
          <ImageZoom
            alt={node.name}
            key={node.id}
            src={node.childImageSharp.fixed.src}
            srcSet={node.childImageSharp.fixed.srcSet}
            style={{ objectFit: "cover", width: "120px", height: "120px" }}
            zoom={mediumZoom({ margin: 24 })}
            zoomSrc={node.publicURL}
          />
        ))}
      </div>
    );
  }, [images]);

  return (
    <Layout location={location} title={data.site.siteMetadata.title}>
      <SEO title="Photos" />
      <h1>Mes photos</h1>
      <p>
        Ces images sont en qualités réduites, vous pouvez les voir en haute
        qualité en cliquant dessus. Elles peuvent mettre un certain délais à
        zoomer en fonction de votre connexion.
      </p>
      {renderedImages}
    </Layout>
  );
};

export default Photos;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allFile(
      filter: { sourceInstanceName: { eq: "media" } }
      sort: { fields: name, order: DESC }
    ) {
      edges {
        node {
          id
          publicURL
          name
          childImageSharp {
            id
            fixed(width: 200) {
              src
              srcSet
            }
          }
        }
      }
    }
  }
`;
