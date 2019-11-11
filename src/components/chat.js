import React, { Component } from "react";
import { GiftedChat } from "react-web-gifted-chat";
import {connect} from 'react-redux'
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { ChevronLeft } from '@material-ui/icons'
import { ApiInstance } from '../api/instance'
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {getDirectInbox} from '../store/actions/main'
import ChatContainer from './chat.container'

import Threads from "./read-list.component";

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
  channelList: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    width: '200px'
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

class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      threads: null,
      activeThreadId: '340282366841710300949128354720543384254'
    }
    this.setActiveThread = this.setActiveThread.bind(this)
  }

  componentDidMount() {
    this.props.getDirectInboxAction()
  }

  setActiveThread(activeThreadId) {
    this.setState({activeThreadId})
  }


  getThreads() {
    const threads = []
    this.props.direct.directInbox && this.props.direct.directInbox.forEach(thread => {
      threads.push({
        threadId: thread.thread_id,
        users: thread.users.map(user => ({
          username: user.username,
          fullname: user.full_name,
          profilePictureUrl: user.profile_pic_url
        }))
      })
    })

    this.setState({ threads: threads })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!this.state.threads) {
      this.getThreads()
    }
  }

  onSend(message) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, message),
    }));

    ApiInstance.sendMessage(this.state.threadId, message).then(({status, data}) => {

    })
  }

  onReceive(messages) {
    messages = messages.map(msg => ({
      text: msg,
      createdAt: new Date(),
      user: {
        id: 2,
      }
    }))

    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, ...messages),
    }))
  }

  renderChat() {
    return (
      <GiftedChat
        messages={this.state.messages.slice()}
        onSend={messages => this.onSend(messages)}
      />
    )
  }

  renderChatHeader() {
    return (
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
    )
  }

  render() {
    return (
      <div style={styles.container}>
        <Threads threads={this.state.threads} onClick={this.setActiveThread}/>
        <ChatContainer activeThreadId={this.state.activeThreadId}/>
      </div>
    )
  }
}
const mapStateToProps = state =>({
  direct: state.direct
})

const mapDispatchToProps = dispatch =>({
  getDirectInboxAction: ()=> dispatch(getDirectInbox())
})

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
