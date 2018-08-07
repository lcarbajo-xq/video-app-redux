import React, { Component } from 'react';
import HomeLayout from '../components/home-layout';
import Categories from '../../categories/components/categories';
import ModalContainer from '../../widgets/containers/modal-container';
import Related from '../components/related';
import Modal from '../../widgets/components/modal';
import HandleError from '../../error/containers/handle-error';
import VideoPlayer from '../../player/containers/video-player';
import { connect } from 'react-redux';
import { List as list} from 'immutable';


class Home extends Component {
	// state = {
	// 	modalVisible: false,
	// }
	handleOpenModal = (media) => {
	// 	this.setState({
	// 		modalVisible: true,
	// 		media:  media
	// 	})
	// }
    this.props.dispatch({
      type: 'OPEN_MODAL',
      payload: {
        mediaId: id
      }
    })
	}
	handleCloseModal = (event) => {
		this.props.dispatch({
      type: 'CLOSE_MODAL'
    })
  }

	render() {
			return (
				<HandleError>
						<HomeLayout>
							<Related />
							<Categories
								categories={this.props.categories}
								handleOpenModal={this.handleOpenModal}
								search={this.props.search}/>
							{
								this.props.modal.get('visibility') &&
								<ModalContainer>
									<Modal handleClick={this.handleCloseModal}>
										<VideoPlayer
											autoPlay
											id={this.props.modal.get('mediaId')}
											// src={this.state.media.src}
											// title={this.state.media.title}
											/>
									</Modal>
								</ModalContainer>
							}
						</HomeLayout>
					</HandleError>
			)
		}
	}
// function mapStateToProps(state, props) {
// 	const categories = state.data.categories.map((categoryId) => {
// 		return state.data.entities.categories[categoryId];
// 	})
// 	return {
// 		categories: categories,
// 		search: state.data.search
// 	}
// }
// export default connect(mapStateToProps)(Home)


function mapStateToProps(state, props) {
	const categories = state.get('data').get('categories').map((categoryId) => {
  	return state.get('data').get('entities').get('categories').get(categoryId)
	})
	let searchResults = list()
	const search = state.get('data').get('search')
	if (search) {
		const mediaList = state.get('data').get('entities').get('media')
		searchResults = mediaList.filter((item) => {
			return item.get('author').toLowerCase().includes(search.toLowerCase())
		}).toList();
	}
  return {
    categories,
    search: searchResults,
		modal: state.get('modal')
  }
}

export default connect(mapStateToProps)(Home)
