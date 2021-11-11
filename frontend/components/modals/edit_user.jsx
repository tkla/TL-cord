import { connect } from 'react-redux';
import React from 'react'
import { closeModal } from '../../actions/modal_actions';
import { clearErrors } from '../../actions/session_actions';
import { getUserEdit } from '../../actions/user_actions';

class EditUser extends React.Component {
   constructor(props) {
      super(props)
      this.handleInput = this.handleInput.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleFile = this.handleFile.bind(this);

      this.state = {
         username: this.props.currentUser.username,
         avatar_url: this.props.currentUser.avatar,
         avatar: '',
         submit: false,
      }
   }

   handleSubmit(e) {
      e.preventDefault();
      this.props.clearErrors();
      const formData = new FormData();

      formData.append('user[username]', this.state.username);

      if (this.state.avatar) {
         formData.append('user[avatar]', this.state.avatar);
      }

      this.props.getUserEdit(this.props.currentUser.id, formData);

      this.setState({
         submit: true,
      })
   }

   componentDidUpdate(prevProps) {
      if (this.state.submit && prevProps.currentUser !== this.props.currentUser) this.props.closeModal();
   }

   handleInput(input) {
      return (e) => {
         this.setState({
            [input]: e.currentTarget.value,
         })
      }
   }

   handleFile(e) {
      const reader = new FileReader();
      const file = e.currentTarget.files[0];

      reader.onloadend = () => {
         this.setState({ 
            avatar_url: reader.result, 
            avatar: file 
         });
      }

      if (file) {
         reader.readAsDataURL(file);
      } else {
         this.setState({ avatar_url: "", avatar: null });
      }
   }

   render() {
      let errors = '';
      let errMsg = '';
      if (this.props.errors.length) {
         errors = 'error'
         errMsg = " - " + this.props.errors.join(' ')
      }
      return (
         <div className='base-modal'>
            <div className='registerForm'>
               <h2>Edit</h2>

               <form onSubmit={this.handleSubmit}>
                  <img src={this.state.avatar_url} alt={this.state.avatar_url} className='profile-picture' />
                  <label className={errors}>Username
                     <span className='errorMessage'>{errMsg}</span>
                     <input type='text'
                        value={this.state.username}
                        onChange={this.handleInput('username')} />
                  </label>

                  <label className={errors}>Profile Picture
                     <span className='errorMessage'>{errMsg}</span>
                     <input type='file'
                        value=''
                        onChange={this.handleFile} />
                  </label>

                  <input className='submit' type='submit' value='Save' />
               </form>
            </div>
         </div>
      )
   }
}

const mapStateToProps = state => ({
   currentUser: state.entities.users[state.session.currentUserId],
   errors: state.errors.session,

})

const mapDispatchToProps = dispatch => ({
   closeModal: () => dispatch(closeModal),
   clearErrors: () => dispatch(clearErrors()),
   getUserEdit: (userId, formUser) => dispatch(getUserEdit(userId, formUser)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);