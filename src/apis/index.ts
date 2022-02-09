const files = require.context('.', false, /\.ts$/)
const modules:any = {}

function getCamelCaseName (name: string) {
    if (name.indexOf('-')) {
        const _tempName = name.toLowerCase().split('-')
        for (let i = 1; i < _tempName.length; i++) {
            _tempName[i] = _tempName[i].substring(0, 1).toUpperCase() +
                _tempName[i].substring(1)
        }
        return _tempName.join('')
    } else {
        return name
    }
}

files.keys().forEach((key: string) => {
    if (key === './index.ts') return
    const tmpKey = key.replace(/(\.\/|\.ts)/g, '')
    const camelCaseName:string = getCamelCaseName(tmpKey)
    modules[camelCaseName] = files(key)
})

export default modules
