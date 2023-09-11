import { ParseHtmlToReact } from "../../utils/parse-html-to-react";
import Container from "../container";
import Image from "next/image";

export default function TwoColumnTemp({ data }) {
  const ftImage = data.featuredImage?.node.sourceUrl ?? {};
  return (
    <div className="two-columns-template">
      <Container>
        <div className="banner">
          <Image className="banner-img" src={ftImage} alt={data?.title ?? {}} width={1148} height={274} />
        </div>
        <div className="content-wrap">
          <div className="title">
            <h1>{data?.title ?? {}}</h1>
          </div>
          <div className="two-columns-content">{ParseHtmlToReact(data?.content ?? {})}</div>
        </div>
      </Container>
    </div>
  );
}
