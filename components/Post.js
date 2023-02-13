import Link from 'next/link'
import Image from 'next/image'

export default function Post({ post }) {
  return (
    <div className='card'>
      <Image src={post.frontmatter.cover_image} alt='' width={160}
            height={70}
            className="p-2" />

      <div className='post-date'>Posted on {post.frontmatter.date}</div>

      <h3>{post.frontmatter.title}</h3>

      <p>{post.frontmatter.excerpt}</p>

      <Link href={`/${post.slug}`}>
        <div className='btn'>Read More</div>
      </Link>
    </div>
  )
}