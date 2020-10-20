import titleCase from 'title-case'
import allModeColors from '@primer/primitives/dist/js/colors'

// XXX we don't necessarily define them in this order in primer-colors,
// so we define an array here just to be safe
const gradientHues = ['gray', 'blue', 'green', 'purple', 'yellow', 'orange', 'red', 'pink']

const colors = allModeColors.light.scale

const colorModes = Object.keys(allModeColors).sort((a, b) => {
  if (a.startsWith('light') && !b.startsWith('light')) return -1
  if (!a.startsWith('light') && b.startsWith('light')) return 1
  else return a.localeCompare(b)
})

const palettes = gradientHues.map(name => {
  return {
    name,
    title: titleCase(name),
    value: colors[name][5],
    values: colors[name].map((value, index) => ({
      value,
      values: colorModes.reduce((acc, mode) => {
        acc[mode] = allModeColors[mode].scale[name][index]
        return acc
      }, {}),
      index,
      variable: `--color-scale-${name}-${index}`,
      slug: `color-scale-${name}-${index}`,
      aliases: {}
    }))
  }
})

export {colors, colorModes, gradientHues, palettes, getPaletteByName}

export const flattened = colorModes.reduce((acc, mode) => {
  acc[mode] = flattenVars(allModeColors[mode])
  return acc
}, {})

export const functionalVarNames = Object.keys(flattened.light).filter(
  v => !v.startsWith('scale-') && !v.startsWith('auto-')
)

export const allColors = palettes.reduce((all, {values}) => all.concat(values), [])

// TODO: fix the borders code
//
// export const borders = Object.keys(variables)
//   .filter(key => key.startsWith('border-') && !variables[key].includes('$'))
//   .sort()
//   .map(key => ({
//     variable: key,
//     value: variables[key],
//     slug: key,
//     aliases: {border: key}
//   }))

function getPaletteByName(name) {
  return palettes.find(palette => palette.name === name)
}

function flattenVars(tree, prefix = []) {
  let output = {}

  for (const key of Object.keys(tree)) {
    const val = tree[key]
    const varName = [...prefix, key].join('-')
    if (Array.isArray(val) && !varName.includes('shadow')) {
      for (const i in val) {
        const arrayVarName = `${varName}-${i}`
        output[arrayVarName] = val[i]
      }
    } else if (Array.isArray(val)) {
      output[varName] = val.join(' ')
    } else if (typeof val === 'object') {
      const obj = flattenVars(val, [...prefix, key])
      output = {...output, ...obj}
    } else {
      output[varName] = val
    }
  }

  return output
}
