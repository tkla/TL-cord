import React from 'react'
import { Link } from 'react-router-dom';
import Modal from '../modals/modal';

export default class Channel extends React.Component {
   constructor(props) {
      super(props)
      this.serverId = -1;
      this.firstChannelId = null;
      this.selectedChannelId = 0;
      this.leaveServer = this.leaveServer.bind(this);
      this.loadPosts = this.loadPosts.bind(this);
      this.clickChannel = this.clickChannel.bind(this);
      this.handleDestroy = this.handleDestroy.bind(this);
      this.handleChannelDelete = this.handleChannelDelete.bind(this);
      this.toggle = this.toggle.bind(this);
   
      this.state = {
         hideText: false,
         hideVoice: false
      }
   }

   toggle(bool) {
      this.setState({
         [bool]: !this.state[bool]
      })
   }

   componentDidMount() {
      this.serverId = parseInt(this.props.match.params.id);
      this.props.getChannelsIndex(this.serverId);
   }

   // On URL change check if we need to query for new channels into store.
   componentDidUpdate() {
      let newId = parseInt(this.props.match.params.id.substring(0, 10));
      if (this.serverId != newId) {
         this.serverId = newId;
         this.props.getChannelsIndex(this.serverId);
         this.setState({
            hideText: false,
            hideVoice: false
         })
      }
   }

   loadPosts(channelId) {
      this.props.getPostsIndex(channelId);
   }

   leaveServer() {
      this.props.getServerLeave(this.serverId).then(() => this.props.getUserShow(this.props.currentUser.id));
   }

   clickChannel(id) {
      this.selectedChannelId = id;
      if (this.props.channels[id].voice_channel) {
         // todo
      } else {
         this.loadPosts(id);
         let channelItem = document.getElementById(id);
         if (channelItem) channelItem.checked = true;
      }
   }

   handleDestroy(serverId) {
      this.props.getServerDestroy(serverId).then(() => {
         this.props.history.push('/channels/@me');
      });
   }

   // Update server state after channel deleted.
   // If we did not delete the currently selected channel, return.
   // Otherwise select the first text channel and switch to it.
   handleChannelDelete(e, channelId){
      e.stopPropagation();
      this.props.getChannelDestroy(channelId).then(() => {
         if (channelId !== this.selectedChannelId) return;              
         this.props.getServerShow(this.serverId)

         let channelsArray = Object.values(this.props.channels)
         for (let i = 0; i < channelsArray.length; i++){
            if (!channelsArray[i].voice_channel) return this.clickChannel(channelsArray[i].id);
         }
         // If after iterating through channels array there are no text channels left,
         // Load posts with an id of -1 to flag post component that there are no text channels.
      })
   }

   render() {
      let channels = this.props.channels;
      let server = this.props.servers[this.serverId];

      if (!server || !channels) {
         return (
            <div>
               <div className='channel-container' id='channels-list'> </div>
            </div>
         )
      }

      // Grab the posts from the first channel in the server. Don't grab posts again on rerender if we aren't changing servers.
      Object.keys(channels).some(id => {
         if (this.firstChannelId != id) {
            this.firstChannelId = id;
            if (!channels[this.selectedChannelId]){
               this.selectedChannelId = this.firstChannelId;
               this.props.getPostsIndex(id);
            }
         }
         return true;
      })

      let isAuthor;
      (this.props.currentUser.id === server.author_id) ? isAuthor = true : isAuthor = false;
      let isMember;
      (this.props.currentUser.allServers.includes(server.id)) ? isMember = true : isMember = false;

      let editButton = <div onClick={this.props.openServerEdit}> <p>Edit</p> <i className="far fa-edit"></i> </div>;
      let deleteButton =
         <div id='delete' onClick={() => this.handleDestroy(server.id)}>
            <p>Delete Server</p>
            <i className="fas fa-trash-alt" ></i>
         </div>;
      let leaveButton =
         <Link id='leave' to='/channels/@me' onClick={this.leaveServer} hidden={isAuthor}>
            <p>Leave Server</p>
            <i className="fas fa-backspace"></i>
         </Link>

      return (
         <div>
            {/* <Modal serverId={this.serverId} /> */}

            <div className='channel-container' id='channels-list'>
               <div className='dropdown'>
                  <h1 className='server-name-header'>{server.name} </h1>
                  <div className='dropdown-content'>
                     {isAuthor ? editButton : null}
                     {isAuthor ? deleteButton : null}
                     {isMember && !isAuthor ? leaveButton : null}
                  </div>
               </div>
               {/* Text Channels */}
               <div className='collapse' id='channels'>
                  <div id='channel-header' onClick={(e) => this.toggle('hideText')}>
                     <h2>Text Channels</h2>
                     <button id='create-channel' onClick={(e) => { e.stopPropagation(); return this.props.createTextChannel() }} hidden={!isAuthor}>
                        <i className="fas fa-plus"></i>
                     </button>
                  </div>

                  <ul className='channels-list' hidden={this.state.hideText}>{
                     Object.keys(channels).map(channelId => (channels[channelId].voice_channel ? null :
                        <li key={channels[channelId].name} onClick={() => this.clickChannel(channelId)}>
                           <input id={channelId} type='radio' name='channel-item' defaultChecked={this.selectedChannelId === channelId} />
                           <label htmlFor={channelId}>
                              {channels[channelId].name}
                              {isAuthor ?
                                 <button className='destroy' onClick={(e) => this.handleChannelDelete(e, channelId)}>
                                    <i className="fas fa-trash"></i>
                                 </button>
                                 : null}
                           </label>
                        </li>
                     ))
                  }</ul>
               </div>

               {/* Voice Channels */}
               {/* <div className='collapse' id='channels'>

                  <div id='channel-header' onClick={() => this.toggle('hideVoice')}>
                     <h2>Voice Channels</h2>
                     <button id='create-channel' onClick={() => this.props.createVoiceChannel()} hidden={!isAuthor}>
                        <i className="fas fa-plus"></i>
                     </button>
                  </div>

                  <ul className='channels-list' hidden={this.state.hideVoice}>{
                     Object.keys(channels).map(channelId => (!channels[channelId].voice_channel ? null :
                        <li key={channels[channelId].name} onClick={(e) => this.clickChannel(e, channelId)}>
                           <input id={channelId} type='radio' name='channel-item' />
                           <label htmlFor={channelId}>
                              {channels[channelId].name}
                              {isAuthor ?
                                 <button className='destroy' onClick={(e) => this.handleChannelDelete(e, channelId)}>
                                    <i className="fas fa-trash"></i>
                                 </button>
                                 : null}
                           </label>
                        </li>
                     ))
                  }</ul>
               </div> */}

            </div>
         </div>
      )
   }
}