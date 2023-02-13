import { marked } from 'marked'
import md from 'markdown-it';
import Link from "next/link";

export default function server({pages}) {
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
            pages.map(gam => (
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


export const getServerSideProps = async (context)=>{
  const res = await fetch("https://ffec-191-113-3-147.sa.ngrok.io/api/nextjs/tutorials/data_json")
  const api = await res.json()

  const pages = api.pages.map(item =>{
    let result ={"title":item.title,
    "url":item.url,
    "content":md().render(item.content)}
    return result;
  })
  console.log(pages)
  return {
    
    props : {
      pages,
    }
  }
}
