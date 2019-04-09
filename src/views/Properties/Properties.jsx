import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import MediaCard from '@material-ui/core/CardMedia';

import PropertyItem from '../../components/PropertyItem'
import { bugs, website, server } from "variables/general.jsx";

import {pullFromFirebase} from '../../reference/firebase'
import { debug } from 'util';

const styles = {

}

class Properties extends React.Component {
    state = {
        listings: []
    }

    listProperties = () => {
        pullFromFirebase("listings", (snapshot)=>{
            let listings = this.state.listings;
            snapshot.forEach((item) => {
                listings = listings.concat(item.val());
            });
            this.setState({listings: listings});
        });
    }

    componentDidMount() {
        this.listProperties();
    }

    render() {
        const { classes } = this.props;
        const {listings} = this.state;
        return (
            <div>
            {listings.map((listing, key) => 
                (<PropertyItem 
                    key={key}
                    imagePath={'img/homes/home1.jpg'}
                    address={"Home One"}
                    description={listing.desc}
                    styles={styles}
                    classes={classes} />)
            )}
            </div>
        );
    }
}

// MediaCard.propTypes = {
//     classes: PropTypes.object.isRequired,
// };

export default withStyles(styles)(Properties);