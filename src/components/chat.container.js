import React, {useEffect} from 'react'
import { ChevronLeft } from '@material-ui/icons'
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { GiftedChat } from "react-web-gifted-chat";
import {sendMessage} from '../store/actions/main'
import {connect} from 'react-redux'


const Chat = ({activeThreadId, sendMessageAction, direct}) =>{

  const styles = {
    container: {
      flex: 1,
      display: "flex",
      flexDirection: "row",
      height: "100vh",
    },
    chat: {
      display: "flex",
      flex: 3,
      flexDirection: "column",
      borderWidth: "1px",
      borderColor: "#ccc",
      borderRightStyle: "solid",
      borderLeftStyle: "solid",
    },
    header: {
      paddingTop: '10px',
      paddingBottom: '10px',
      height: '25px',
      display: 'flex',
      paddingLeft: '10px'
    },
    image: {
      borderRadius: '50%',
      height: '25px',
      width: '25px',
      paddingRight: '10px'
    }
  }

  const placeholderImage = 'https://scontent-iad3-1.cdninstagram.com/vp/c06ce66e1775c3ddbbaf464d17a72685/5E3DFB83/t51.2885-19/s150x150/44556281_348738662341753_6177232208051306496_n.jpg?_nc_ht=scontent-iad3-1.cdninstagram.com'

  const onSendHandler = message =>{
    GiftedChat.append(getMessages(), message)
    sendMessageAction(activeThreadId, message[0].text)
  }

  const messages = direct && direct.find(thread => thread.thread_id === activeThreadId)

  const getMessages = () =>{
    
    return messages && messages.items.map(message=>({
      id: message.item_id,
      text: message.text,
      createdAt: new Date(Number(message.timestamp)),
      user: message.user_id !== 23556347556 &&{
        id: message.user_id
      } 
    }))
  }

  useEffect(()=>{
    // console.log('messages',direct.find(thread => thread.thread_id === activeThreadId));
    console.log('aaaa', messages);
    
  }, [activeThreadId, direct, messages])

  return (
    <div style={styles.chat}>
      <div>
        <div style={styles.header}>
          <ChevronLeft />
          <img src={placeholderImage} alt="avatar" style={styles.image} />
          <Typography variant="body2" color="inherit" style={{ paddingTop: '1px' }}>
            Default channel
          </Typography>
        </div>
        <Divider />
      </div>
      <GiftedChat
        messages={getMessages()}
        onSend={onSendHandler}
      />
    </div>
  )
}

const mapStateToProps = state =>({
  direct: state.direct.directInbox
})

const mapDispatchToProps = dispatch => ({
  sendMessageAction: (threadId, message)=>dispatch(sendMessage(threadId, message))
})

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
