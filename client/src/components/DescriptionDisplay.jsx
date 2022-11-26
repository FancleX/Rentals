import React, { Component } from 'react';
import FeaturedPlayListOutlinedIcon from '@mui/icons-material/FeaturedPlayListOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import PropsType from 'prop-types';
import Divider from '@mui/material/Divider';

export default class DescriptionDisplay extends Component {

    static propsType = {
        description: PropsType.string.isRequired,
        policies: {
            deposit: PropsType.number.isRequired,
            securityFee: PropsType.number.isRequired,
            leaseTerm: PropsType.number.isRequired,
            startDate: PropsType.number.isRequired,
            endDate: PropsType.number.isRequired
        }
    };

    state = {
        policy: []
    };

    renderPolicies = () => {
        const { policies } = this.props;

        const policyArr = [];

        Object.entries(policies).forEach((element) => {
            const key = element[0], value = element[1];
            let label = '', content = '';
            label = this.splitAndUppercaseFirstLetter(key);
            if (key === 'deposit' || key === 'securityFee') {
                content = value ? `$${value}` : 'contact onwer';
            } else if (key === 'leaseTerm') {
                content = value ? `${value} month` : 'contact onwer';
            } else {
                content = value ? value : 'contact onwer';
            }

            policyArr.push(
                <Typography key={key} variant='body1' sx={{ overflowWrap: 'break-word' }} gutterBottom>{`${label}: ${content}`}</Typography>
            );
        });

        this.setState({ policy: [...policyArr] });
    };

    splitAndUppercaseFirstLetter = (string) => {
        let split = [];
        split = string.split(/(?=[A-Z])/);
        for (let i = 0; i < split.length; i++) {
            if (i === 0) {
                split[i] = split[i].charAt(0).toUpperCase() + split[i].slice(1);
            } else {
                split[i] = split[i].charAt(0).toLowerCase() + split[i].slice(1);
            }
        }
        return split.join(' ');
    };

    componentDidMount() {
        this.renderPolicies();
    };

    render() {

        const { description } = this.props;
        const { policy } = this.state;

        return (
            <Grid container pt='10px' width='100%' spacing={2}>
                {/* discription */}
                <Grid item xs={1}><FeaturedPlayListOutlinedIcon /></Grid>
                <Grid item xs={11} pl='0px !important' pt='13px !important'>
                    <Typography variant='h6' gutterBottom>Onwer Description</Typography>
                    <Typography variant='body1' sx={{ overflowWrap: 'break-word' }} gutterBottom>{description || 'The onwer does not leave a description, please contact the onwer for more details.'}</Typography>
                </Grid>

                <Grid item xs={12}>
                    <Divider variant="middle" sx={{ pt: '10px' }} />
                </Grid>

                {/* policies */}
                <Grid item xs={1}><InventoryOutlinedIcon /></Grid>
                <Grid item xs={11} pl='0px !important' pt='13px !important'>
                    <Typography variant='h6' gutterBottom>Policies</Typography>
                    {policy}
                </Grid>
            </Grid>
        )
    }
}
