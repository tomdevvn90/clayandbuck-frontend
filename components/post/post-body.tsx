import { ParseHtmlToReact } from '../../utils/parse-html-to-react'
import styles from './post-body.module.css'

export default function PostBody({ content }) {
  return (
    <div className="post-content">
      {/* <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: content }}
      /> */}
      <div className={styles.content}>{ParseHtmlToReact(content)}</div>
    </div>
  )
}
