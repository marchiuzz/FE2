import React from 'react';

class Genre extends React.Component {

    constructor(props) {
        super();

        this.state = {
            genreId: props.genreId,
        };
    }

    handleGenreChange = () => {
        this.props.onSelectGenre(this.props.genreId);
    };


    render() {
        return (
            <div className='genre' onClick={this.handleGenreChange}>
                {this.props.title}
            </div>
        )

    }
}

export default Genre;