const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const pageCreation = await graphql(`
    query {
      allMarkdownRemark(filter: { fields: { type: { eq: "pages" } } }) {
        edges {
          node {
            fields {
              slug
              type
            }
          }
        }
      }
    }
  `);

  pageCreation.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/pages.js`),
      context: {
        slug: node.fields.slug,
      },
    });
  });

  const blogPost = path.resolve(`./src/templates/blog-post.js`);
  const blogPostResult = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
          filter: { frontmatter: { published: { eq: true } } }
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
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
  const posts = blogPostResult.data.allMarkdownRemark.edges;

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node;
    const next = index === 0 ? null : posts[index - 1].node;

    createPage({
      path: post.node.fields.slug,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    });
  });

  return null;
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
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
