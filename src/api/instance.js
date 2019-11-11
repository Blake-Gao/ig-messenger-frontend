import Api from './index'

var __API__ = null

const getApiInstance = () => {
  if (__API__ === null) {
    __API__ = Api.create()
  }
  return __API__
}

export const ApiInstance = getApiInstance()
