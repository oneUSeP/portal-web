import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Grade extends Component {


  componentWillMount() {
    let termId = this.props.params.termId
    let user = this.props.auth.get('user')
    let { ayterms, extraDetails } = nextProps
    if(ayterms && extraDetails && user) {
      this.props.getGrades(user.get('username'), termId, extraDetails.get('ProgClass'))
    }
  }


  componentWillReceiveProps(nextProps) {
    if(this.props.params.termId != nextProps.params.termId) {
      let termId = nextProps.params.termId
      let user = this.props.auth.get('user')
      let { ayterms, fetchingAyTermsSuccess, extraDetails, fetchingGradesSuccess } = nextProps
      if(ayterms && extraDetails && user) {
        console.log('DAPAL')
        this.props.getGrades(user.get('username'), termId, extraDetails.get('ProgClass'))
      }
    }
  }

  render() {
    return (
      <div>
        wew
      </div>
    );
  }
}

Grade.propTypes = {

};

export default Grade;
