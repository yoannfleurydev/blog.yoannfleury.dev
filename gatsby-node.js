const path = require(`path`);
const { createFilePath } = require("gatsby-source-filesystem");

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const pageCreation = await graphql(`
    {
      allFile(
        filter: {
          sourceInstanceName: { eq: "pages" }
          extension: { regex: "/mdx?/" }
        }
      ) {
        nodes {
          id
          childMdx {
            fields {
              slug
            }
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
        id: node.id,
      },
    });
  });

  const blogPost = path.resolve(`./src/templates/blog-post.js`);
  const blogPostResult = await graphql(
    `
      {
        allMdx(
          filter: { frontmatter: { published: { eq: true } } }
          sort: { fields: frontmatter___date, order: DESC }
        ) {
          nodes {
            id
            frontmatter {
              title
            }
            fields {
              slug
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
  const posts = blogPostResult.data.allMdx.nodes;

  posts.forEach((post, index) => {
    const previousPostId =
      index === posts.length - 1 ? undefined : posts[index + 1].id;
    const nextPostId = index === 0 ? undefined : posts[index - 1].id;

    createPage({
      path: post.fields.slug,
      component: blogPost,
      context: {
        id: post.id,
        previousPostId,
        nextPostId,
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
