import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as PlayerActions from '../../actions/player';

export class SmallPlayerCard extends Component {
  handleClick() {
    this.props.add(this.props.player);
  }

  render() {
    const player = this.props.player;
    let imgsrc;
    if (player.specialImages && player.specialImages.medTOTWImgUrl) {
      imgsrc = player.specialImages.medTOTWImgUrl;
    } else {
      imgsrc = player.headshot.medImgUrl;
    }
    const cardStyle = `ut-item ut-item--small ut-item--small-bg-${player.color} ut-item--player
      ut-item--grid-view ut-item--small-active`;
    return (
      <div className={cardStyle} onClick={this.handleClick.bind(this)}>
        <div className="ut-item_meta ut-item_meta--active">
          <span className="ut-item_stat ut-item_stat--num ut-item_rating">{player.rating}</span>
          <span className="ut-item_stat ut-item_stat--label ut-item_position">{player.position}</span>
          <img alt="Item crest" className="ut-item_crest" src={player.club.imageUrls.normal.medium} />
          <img alt="Item flag" className="ut-item_flag" src={player.nation.imageUrls.medium} />
        </div>
        <img alt="Item Headshot" className="ut-item_headshot ut-item_headshot--active" src={imgsrc} />
        <h2 className="ut-item_heading ut-item_heading--main" style={{ textIndent: '0px' }}>{player.name}</h2>
        <div className="ut-item_view ut-item_view0 ut-item_view--summary">
          <table className="ut-item_attr-data">
            <tbody>
              <tr className="ut-item_attr-data-row">
                <td className="ut-item_attr-data-cell ut-item_stat ut-item_attr-data-cell ut-item_stat--num">
                  {player.attributes[0].value}
                </td>
                <td className="ut-item_attr-data-cell ut-item_stat ut-item_attr-data-cell ut-item_stat--label">
                  {player.attributes[0].name.replace(/fut\.attribute\./, '')}
                </td>
                <td className="ut-item_attr-data-cell ut-item_stat ut-item_attr-data-cell ut-item_stat--num">
                  {player.attributes[3].value}
                </td>
                <td className="ut-item_attr-data-cell ut-item_stat ut-item_attr-data-cell ut-item_stat--label">
                  {player.attributes[3].name.replace(/fut\.attribute\./, '')}
                </td>
              </tr>
              <tr className="ut-item_attr-data-row">
                <td className="ut-item_attr-data-cell ut-item_stat ut-item_attr-data-cell ut-item_stat--num">
                  {player.attributes[1].value}
                </td>
                <td className="ut-item_attr-data-cell ut-item_stat ut-item_attr-data-cell ut-item_stat--label">
                  {player.attributes[1].name.replace(/fut\.attribute\./, '')}
                </td>
                <td className="ut-item_attr-data-cell ut-item_stat ut-item_attr-data-cell ut-item_stat--num">
                  {player.attributes[4].value}
                </td>
                <td className="ut-item_attr-data-cell ut-item_stat ut-item_attr-data-cell ut-item_stat--label">
                  {player.attributes[4].name.replace(/fut\.attribute\./, '')}
                </td>
              </tr>
              <tr className="ut-item_attr-data-row">
                <td className="ut-item_attr-data-cell ut-item_stat ut-item_attr-data-cell ut-item_stat--num">
                  {player.attributes[2].value}
                </td>
                <td className="ut-item_attr-data-cell ut-item_stat ut-item_attr-data-cell ut-item_stat--label">
                  {player.attributes[2].name.replace(/fut\.attribute\./, '')}
                </td>
                <td className="ut-item_attr-data-cell ut-item_stat ut-item_attr-data-cell ut-item_stat--num">
                  {player.attributes[5].value}
                </td>
                <td className="ut-item_attr-data-cell ut-item_stat ut-item_attr-data-cell ut-item_stat--label">
                  {player.attributes[5].name.replace(/fut\.attribute\./, '')}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

SmallPlayerCard.propTypes = {
  player: PropTypes.shape({}),
  add: PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(PlayerActions, dispatch);
}

export default connect(() => ({}), mapDispatchToProps)(SmallPlayerCard);
