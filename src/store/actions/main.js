import { ApiInstance } from "../../api/instance";
import {SET_DIRECT_INBOX} from './types'

const setDirectInbox = (directInbox) =>{
  return {
    type: SET_DIRECT_INBOX,
    directInbox
  }
}

export const getDirectInbox =  () => async dispatch =>{

  try{
    const res = await ApiInstance.getThreads()
    dispatch(setDirectInbox(res.data))
  }catch (e) {
    console.log(e)
  }

}

export const sendMessage =  (threadId, text) => async dispatch =>{
  try{
    
    await ApiInstance.sendMessage(threadId, text)
    const res = await ApiInstance.getThreads()
    dispatch(setDirectInbox(res.data.text))
  }catch (e) {
    console.log(e)
  }
}