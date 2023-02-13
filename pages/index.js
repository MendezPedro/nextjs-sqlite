import Link from "next/link";
import fsPromises from 'fs/promises';
import path from 'path'

export default function Home(props) {
  const items = props.pages

  return (
    <>

      <main>
        <div>
          <p>
            Get started by editing&nbsp;
            <code>pages/index.js</code>
          </p>
          {items.map(({title, id, array, content, img}) => (
          <div key={title}>
            <ul>
              <li>
                <Link href={`unidades/${title}`}>
                  {title}
                </Link>
              </li>
            </ul>
          </div>
          ))}
        </div>

      </main>
    </>
  )
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'json/data.json');
  const jsonData = await fsPromises.readFile(filePath);
  const objectData = JSON.parse(jsonData);
  

  return {
    props: objectData
  }
}

