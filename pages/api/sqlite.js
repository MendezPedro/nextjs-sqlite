import getDistros from "/lib/db.js"

export default function Distros(props, res) {
    const { distros } = props
    // console.log(distros)
    return (
        <>
            <h1>Distribuciones GNU/Linux</h1>
            <p>El siguiente listado se obtiene de una base de datos SQLite:</p>
            <ul>
                {
                    distros.map(
                        (item) => <li key={item.id}>
                            {item.name} {item.version}
                        </li>
                    )
                }
            </ul>
            {/* {res.status(200).json(objeto)} */}
        </>
    )
}

export async function getStaticProps() {
    const distros = getDistros()
    return {
        props: {
            distros
        }
    }
}