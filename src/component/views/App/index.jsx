import React, {Component} from 'react';
import PropTypes from 'prop-types';
import request from 'axios';
import {isEmpty} from 'lodash';
import Modal from "../../Modal";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            movies: [],
            modal: {
                show: false,
                entry: {}
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.getCast = this.getCast.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal(entry) {
        console.log('entr y', entry);

        this.setState(prevState => {
            return {
                modal: {
                    show: !prevState.modal.show,
                    entry: isEmpty(entry) ? {} : entry
                }
            };
        });
    }

    handleChange(event) {
        event.persist();
        this.setState(prevState => {
            return {search: event.target.value};
        });
    }

    handleSearch() {
        const {search} = this.state;
        return request.get(`http://api.tvmaze.com/search/shows?q=${search}`).then((res) => {
            this.setState(() => ({movies: res.data}));
        });
    }

    getCast() {
        const {entry} = this.state;
        return request.get(`http://api.tvmaze.com/shows/${entry.show.id}/cast`).then((res) => {
            return res.data;
            // this.setState(() => );
        });
    }

    renderEntry(entry) {
        if (isEmpty(entry)) {
            return null;
        }
        const genres = entry.show.genres.join(' ');
            // .then(res => {
            //     entry.show.cast = res;
                return (<div>

                    <div>Score: {entry.score}</div>
                    <div>Name: {entry.show.name}</div>
                    <div>Genres: {genres}</div>
                    <div>Cast: {}</div>

                </div>);
            // });

    }

    render() {


        const {modal, movies} = this.state;
        const {show, entry} = modal;
        return (
            <div className="container-fluid">
                <Modal onClose={this.toggleModal} show={show} children={this.renderEntry(entry)}/>

                <input type="text" name="search" defaultValue={this.state.search} onChange={this.handleChange}/>
                <button onClick={this.handleSearch}>search</button>
                <div className={'row'}>
                    {movies.map(v => {
                        return (<div key={v.show.id} onClick={this.toggleModal.bind(this, v)} className={'col-sm-4'}>
                            <div>{v.show.name}</div>
                            <img src={v.show.image.medium} alt="image"/>
                        </div>);
                    })}
                </div>
            </div>
        );
    }
}

App.propTypes = {
    userAgent: PropTypes.string.isRequired,
};

// export default App;
