import { marked } from 'marked'
import md from 'markdown-it';
import Link from "next/link";


export default function PostPage({pages,data}) {

  return (
    <div className='main-container'>
      <div className='menu'>
          {
            pages.map(gam => (
              <div  key={gam.id}>
                <h1 dangerouslySetInnerHTML={{ __html: marked(gam.title) }}></h1>
        
                <ul>
                  <li>
                    <Link href={`/${gam.url}`}>
                      {gam.url}
                    </Link>
                  </li>
        
                </ul>
              </div>
            ))
          }
        </div>
    <div className='content'>
    {
                data.map(gam => (
                  <div className='' key={gam.id}>
                    <h1 dangerouslySetInnerHTML={{ __html: marked(gam.title) }}></h1>
                    <div dangerouslySetInnerHTML={{ __html: marked(gam.content) }}></div>

                  </div>
                ))
              }
              
          </div>

        </div>
      )
    }

export const getServerSideProps = async (context) => {
  const res = await fetch("https://nextjs.desafiolab.com/api/tutorials/")
  const api = await res.json()

  const { req } = context
  const url = req.url.split("?").pop().split("=").pop().replace("/", "");

  const pages = api.map(item => {
    let result = { "title": item.title,
      "url": item.url,
      "content": md().render(item.content) }
    return result;
  })

  const data = pages.filter(
    (element) => element.url == url
  );
  console.log(url)
  return {
    props: {
      pages,
      data,
    }
  }
}
    
