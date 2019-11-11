import React, {Component} from "react";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const styles = {
  threadList: {
    display: "flex",
    flexDirection: "column",
  },
  header: {
    paddingTop: '10px',
    paddingBottom: '10px',
    height: '25px',
    display: 'flex',
    paddingLeft: '10px'
  },
  item: {
    display: 'block',
    paddingTop: '10px',
    paddingBottom: '10px'
  },
  image: {
    borderRadius: '50%',
    height: '25px',
    width: '25px',
    paddingRight: '10px'
  }
}

class Threads extends Component {

  renderThreads() {
    console.log(this.props.threads)
    return(
      <List>
        {this.props.threads && this.props.threads.map((thread, index) => (
          <div>
            <ListItem button onClick={() => this.props.onClick(thread.threadId)}>
              <img src={thread.users[0].profilePictureUrl} alt="avatar" style={styles.image} />
              <ListItemText primary={thread.users[0].fullname} key={index}/>
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    )
  }

  renderThreadsHeader() {
    return (
      <div>
        <div style={styles.header}>
          <Typography variant="h6" color="inherit" style={{ paddingTop: '1px' }}>
            Threads
          </Typography>
        </div>
        <Divider />
      </div>
    )
  }

  render() {
    return (
      <div style={styles.threadList}>
        {this.renderThreadsHeader()}
        {this.renderThreads()}
      </div>
    )
  }
}

export default Threads