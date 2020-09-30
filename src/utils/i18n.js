import  pkg  from 'i18n'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const { I18n} = pkg
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const i18n = new I18n({
  locales: ['en', 'rw', 'fr'],
  directory: path.join(__dirname, '../..', 'locales/')
})

export default i18n