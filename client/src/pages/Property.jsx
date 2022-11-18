import React, { Component } from 'react';
import withRouter from '../components/withRouter';
const queryString = require('query-string');

class Property extends Component {

    state = {
        // all information
        cards: [
            {
                id: 0,
                img: ["https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png"],
                location: {
                    communityName: 'xxx park',
                    street: 'xxx street',
                    city: 'portland',
                    state: 'maine',
                    zipCode: '041111'
                },
                entity: {
                    type: 'apartment',
                    price: 3000,
                    beds: 3,
                    baths: 1,
                    area: 900,
                    postDate: '11/16/2022',
                    yearBuilt: 1999
                },
                utilities: {
                    pet: true,
                    heating: true,
                    cooling: true,
                    parking: '',
                    laundry: true,
                    furinshied: true
                },
                requirements: {
                    deposite: '3000',
                    securityFee: '1000',
                    leaseDuration: 12
                },
                contact: {
                    name: 'xxx',
                    phone: 'xxx',
                    email: 'xxx'
                },
                source: {
                    inNetwork: true
                }
            }
        ]
    }

    componentDidMount() {
        const { search } = this.props.router.location;
        const params = queryString.parse(search);
        console.log(params.id)
    }

  render() {


    

    return (
      <div>1</div>
    )
  }
}

export default withRouter(Property);