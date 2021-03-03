const path = require(`path`);
const { createFilePath } = require("gatsby-source-filesystem");

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const pageCreation = await graphql(`
    query {
      allFile(filter: { sourceInstanceName: { eq: "pages" } }) {
        nodes {
          childMdx {
            frontmatter {
              title
            }
            fields {
              slug
            }
            body
          }
        }
      }
    }
  `);

  pageCreation.data.allFile.nodes.forEach((node) => {
    createPage({
      path: node.childMdx.fields.slug,
      component: path.resolve(`./src/templates/pages.js`),
      context: {
        post: node.childMdx,
      },
    });
  });

  const blogPost = path.resolve(`./src/templates/blog-post.js`);
  const blogPostResult = await graphql(
    `
      {
        allFile(
          filter: {
            sourceInstanceName: { eq: "blog" }
            extension: { eq: "mdx" }
            childMdx: { frontmatter: { published: { eq: true } } }
          }
          sort: { fields: childMdx___frontmatter___date, order: DESC }
        ) {
          nodes {
            childMdx {
              frontmatter {
                title
                date(formatString: "DD/MM/YYYY")
                datetime: date
                ogImage {
                  childImageSharp {
                    original {
                      src
                    }
                  }
                }
              }
              body
              fields {
                slug
              }
            }
          }
        }
      }
    `
  );

  if (blogPostResult.errors) {
    throw blogPostResult.errors;
  }

  // Create blog posts pages.
  const posts = blogPostResult.data.allFile.nodes;

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? undefined : posts[index + 1];
    const next = index === 0 ? undefined : posts[index - 1];

    createPage({
      path: post.childMdx.fields.slug,
      component: blogPost,
      context: {
        post,
        previous,
        next,
      },
    });
  });

  return null;
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode });

    createNodeField({
      name: `slug`,
      node,
      value,
    });

    const fileNode = getNode(node.parent);
    if (fileNode.sourceInstanceName === "pages") {
      createNodeField({
        name: `type`,
        node,
        value: `pages`,
      });
    }
  }
};
