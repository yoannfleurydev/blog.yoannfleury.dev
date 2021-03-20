import React from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import rangeParser from "parse-numeric-range";
import darcula from "prism-react-renderer/themes/dracula";
import { useTheme } from "@chakra-ui/system";

const calculateLinesToHighlight = (meta) => {
  const RE = /{([\d,-]+)}/;
  if (RE.test(meta)) {
    const strlineNumbers = RE.exec(meta)[1];
    const lineNumbers = rangeParser(strlineNumbers);
    return (index) => lineNumbers.includes(index + 1);
  } else {
    return () => false;
  }
};

export const CodeBlock = ({ children, className, metastring }) => {
  const theme = useTheme();

  // Pull the className
  const language = className?.replace(/language-/, "") || "";
  const shouldHighlightLine = calculateLinesToHighlight(metastring);

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
            if (shouldHighlightLine(index)) {
              lineProps.style = {
                ...lineProps.style,
                backgroundColor: theme.colors.darcula["700"],
                boxSizing: "border-box",
              };
            }

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
