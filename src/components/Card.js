import React from 'react';


class Card extends React.Component {

    constructor(props) {
        super();

        this.state = {
            isDescription: false,
        }
    }

    toggleDescription = () => {
        this.setState({
            isDescription: !this.state.isDescription,
        })
    };


    handleLike = () => {
        this.props.likeHandler(this.props.movieId);
        console.log(this.props.isLiked);
    };


    render() {

        const {title, date, backgroundImage, rating, votes} = this.props;

        return (
            <div className="card">
                <div className="card__image"
                     style={{backgroundImage: `url('${backgroundImage}')`}}/>

                <div className="card__title">
                    {title}
                </div>

                <div className="card__like">
                    <i className="fa fa-heart-o"/>
                </div>

                <div className="card__subtitle">
                    <span>{date}</span>
                    <span>{rating} ({votes})</span>
                </div>

                <div className="card-info">
                    <div className="card-info__header">Summary</div>

                    {console.log('is cardo: ' + this.props.isLiked)}
                    <button onClick={this.handleLike}>{(this.props.isLiked) ? "LIKED" : "NOT LIKED"}</button>

                    <button className="card-info__hideButton" onClick={this.toggleDescription}>Toggle Description
                    </button>
                    <div className="card-info__description">
                        {this.state.isDescription ? this.props.description : ""}
                    </div>
                </div>
            </div>
        );
    }
}

export default Card;