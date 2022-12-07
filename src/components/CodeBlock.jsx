import React from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import darcula from "prism-react-renderer/themes/dracula";

export const CodeBlock = ({ children, className }) => {
  // Pull the className
  const language = className?.replace(/language-/gm, "") ?? "";

  return (
    <Highlight
      {...defaultProps}
      code={children}
      language={language}
      theme={darcula}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={className}
          style={{
            ...style,
            backgroundColor: "transparent",
            float: "left",
            minWidth: "100%",
            padding: "1rem",
          }}
        >
          {tokens.map((line, index) => {
            if (index === tokens.length - 1) return null;

            const lineProps = getLineProps({ line, key: index });
            // if (shouldHighlightLine(index)) {
            //   lineProps.style = {
            //     ...lineProps.style,
            //     backgroundColor: theme.colors.darcula["700"],
            //     boxSizing: "border-box",
            //   };
            // }

            return (
              <div key={index} {...lineProps}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            );
          })}
        </pre>
      )}
    </Highlight>
  );
};
