import React, { Component } from 'react';
class ResultsShow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardsToPreview: this.props.cardsToPreview,
            currentCard: this.props.cardsToPreview[this.props.cardsToPreview.length - 1],
            cardInfo: {}
        }
    }
    componentDidMount() {
        this.getCurrentCardInfo();
    }
    getCurrentCardInfo = () => {
        const cc = this.state.currentCard
        const cardInfo = {
            displayLink: cc.displayLink,
            title: cc.title,
            link: cc.link,
            search_query: cc.search_query,
            snippet: cc.snippet,
            image_url: cc.pagemap.metatags[0]["og:image"],
            image_height: cc.pagemap.metatags[0]["og:image:height"],
            image_width: cc.pagemap.metatags[0]["og:image:width"],
            image_desc: cc.pagemap.metatags[0]["og:description"],
        }
        this.setState({
            cardInfo: cardInfo
        })
    }
    openLink = (e) => {
        e.preventDefault()
    }
    render() {
        const cc = this.state.cardInfo

        return (
            <div className="Results-show-card">
                <div className="Results-show-card-table">
                    <div className="Results-Col">
                        <div className="Results-show-title">{cc.title}</div>
                        <div><hr /></div>
                        {cc.image_url ?
                            <div Results-show-image-wrapper>
                                <div><img className="Results-show-image" src={cc.image_url} alt={cc.image_desc} /></div>
                                <div className="Results-show-image-desc">{cc.image_desc}</div>
                            </div> : null}
                    </div>
                    <div className=".Results-show-article-desc">
                        <label><a className="Results-show-getArticle-button" href={cc.link} target="_blank">Go to Article</a></label>
                    </div>
                </div>
                <span></span>
                <button className="Results-show-close-button" onClick={this.props.closeCardDisplay}>Close Preview</button>
            </div>
        );
    }
}

export default ResultsShow;