import Image from 'next/image'
import Link from 'next/link'
import { isExternalLink } from '../../utils/global-functions'

interface Props {
  title: string
  coverImage: {
    node: {
      sourceUrl: string
    }
  }
  featureImageUrl: string
  featureImageTab: string
  ftVideosPost?: string
}

export default function CoverImage({ title, coverImage, featureImageUrl, featureImageTab, ftVideosPost }: Props) {
  const image = (
    <Image
      width={0}
      height={0}
      alt={`Cover Image for ${title}`}
      src={coverImage?.node.sourceUrl}
      sizes="100vw"
      style={{ width: '100%', height: 'auto', border: '5px solid #b28e2a' }}
    />
  )
  let ftImage = image
  if (!isExternalLink(featureImageUrl) && featureImageTab != '_blank') {
    ftImage = (
        <Link href={featureImageUrl}>
          {image}
        </Link>
    )
  } else {
    ftImage = (
        <a href={featureImageUrl} target={featureImageTab}>
          {image}
        </a>
    )
  }

  return (
    <div>
      {ftVideosPost ? (
        <iframe src={ftVideosPost} width="720" height="400" frameBorder="0" allowFullScreen={true}></iframe>
      ) 
      : featureImageUrl ?  ( ftImage ) : ( image )
     }
    </div>
  )
}
