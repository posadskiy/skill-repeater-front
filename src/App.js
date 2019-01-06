import React, { Component } from 'react';

import { Container } from 'semantic-ui-react';
import Center from './component/Center';
import Footer from './component/Footer';

class App extends Component {
  render() {
    return (
      <Container style={{paddingTop: 14}}>
        <Center />
        <Footer />
      </Container>
    );
  }
}

export default App;
