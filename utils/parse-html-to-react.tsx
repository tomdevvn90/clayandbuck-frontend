import React from "react";
import Link from "next/link";
import { isExternalLink } from "./global-functions";

const HtmlToReact = require("html-to-react");
const HtmlToReactParser = require("html-to-react").Parser;

export const ParseHtmlToReact = (htmlContent) => {
  if (!htmlContent) return null;

  const processingInstructions = [
    {
      // Custom <a /> processing
      shouldProcessNode: (node) => {
        return node.name === "a" && node.attribs.href && !isExternalLink(node.attribs.href) && !node.attribs.target;
      },
      processNode: (node, children, index) => {
        return (
          <Link key={index} href={node.attribs.href} className={node.attribs.class} target={node.attribs.target}>
            {children[0]}
          </Link>
        );
      },
    },
    // {
    //     // Custom <img /> processing
    //     shouldProcessNode: (node) => {return  node.name === 'img';},
    //     processNode: (node,children,index) => {
    //        return <Image key={index} src={node.attribs.src} className={node.attribs.class} width={node.attribs.width} height={node.attribs.height}  alt={node.attribs.alt} title={node.attribs.title}/>;
    //     }
    // },
    {
      // Anything else
      shouldProcessNode: (node) => {
        return true;
      },
      processNode: new HtmlToReact.ProcessNodeDefinitions(React).processDefaultNode,
    },
  ];

  const elementsResult = new HtmlToReactParser().parseWithInstructions(
    htmlContent,
    () => {
      return true;
    },
    processingInstructions
  );

  return elementsResult;
};
