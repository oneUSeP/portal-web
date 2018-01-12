import Immutable from 'immutable'
export default function getData (module) {
  if (module) {
    var data = module.get('data')
  }

  return data
}

export function getDataToArray (module) {
  if (module) {
    var data = module.get('data')
  }

  return data
}
