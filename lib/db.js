const sqlite = require('better-sqlite3')

export default function getDistros() {
    const db = sqlite('database/db.sqlite')
    const statement = db.prepare("SELECT * FROM distro")
    const distros = statement.all()
    return distros
}