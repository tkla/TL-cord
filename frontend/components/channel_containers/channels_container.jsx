import Channels from './channels'
import {connect} from 'react-redux'
import { getChannelDestroy, getChannelsIndex } from '../../actions/channel_actions';
import { getServerLeave, getUserServers, getServerDestroy } from '../../actions/server_actions';
import { getPostsIndex } from '../../actions/post_actions';
import { openModal } from '../../actions/modal_actions';
const mapState = (state) => ({
   currentUser: state.entities.users[state.session.currentUserId],
   channels: state.entities.channels,
   servers: state.entities.servers
})

const mapDispatch = (dispatch) => ({
   getChannelsIndex: (serverId) => dispatch(getChannelsIndex(serverId)),
   getServerLeave: serverId => dispatch(getServerLeave(serverId)),
   getServerDestroy: serverId => dispatch(getServerDestroy(serverId)),
   getUserServers: () => dispatch(getUserServers()),
   getPostsIndex: channelId => dispatch(getPostsIndex(channelId)),
   getChannelDestroy: channelId => dispatch(getChannelDestroy(channelId)),
   openNewChannel: () => dispatch(openModal('createChannel')),
   openServerEdit: (id, formServer) => dispatch(openModal('editServer')),
})

export default connect(mapState, mapDispatch)(Channels);