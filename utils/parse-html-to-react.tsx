import React from "react";
import Link from "next/link";
import Image from "next/image";
import { isExternalLink } from "./global-functions";
import Script from "next/script";

const HtmlToReact = require("html-to-react");
const HtmlToReactParser = require("html-to-react").Parser;

export const ParseHtmlToReact = (htmlContent, includeImg = false) => {
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
    {
      // Custom <img /> processing
      shouldProcessNode: (node) => {
        return node.name === "img" && includeImg;
      },
      processNode: (node, children, index) => {
        return (
          <Image
            key={index}
            src={node.attribs.src}
            className={node.attribs.class}
            width={node.attribs.width}
            height={node.attribs.height}
            alt={node.attribs.alt}
            title={node.attribs.title}
          />
        );
      },
    },
    {
      // Custom <script /> processing
      shouldProcessNode: (node) => {
        return node.name === "script";
      },
      processNode: (node, children, index) => {
        return (
          <Script key={index} src={node.attribs.src} className={node.attribs.class} strategy="beforeInteractive">
            {children[0]}
          </Script>
        );
      },
    },
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
