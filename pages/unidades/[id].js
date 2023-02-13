import Link from 'next/link'
import fsPromises from 'fs/promises';
import path from 'path'

export default function PostPage({data}) {

  const item = data[0]
  
  return (
    <>
      <Link href='/'>
        <div className='btn btn-back'>Go Back</div>
      </Link>
      <div>1{item.content}</div>
      {/* <>
      {items.map(({title, id, array, content, img}) => (
          <div key={id}>
            <h3>{title}</h3>
          </div>
        ))}
      </> */}
    </>
  )
}

export async function getStaticPaths() {
  const filePath = path.join(process.cwd(), "json/data.json");
  const jsonData = await fsPromises.readFile(filePath);
  const objectData = JSON.parse(jsonData);
  const objectDataArray = objectData.pages;
  const paths = objectDataArray.map((element) => ({
    params: { id: element.title },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), "json/data.json");
  const jsonData = await fsPromises.readFile(filePath);
  const objectData = JSON.parse(jsonData);
  const objectDataArray = objectData.pages;
  const data = objectDataArray.filter(
    (element) => element.title == params.id
  );

  return {
    props: {
      data,
    },
  };
}
