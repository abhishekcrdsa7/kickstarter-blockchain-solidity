import React, { Component } from 'react';
import { Form, Input, Button, Message } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';
import { Router } from '../routes';

class ContributeForm extends Component {
  state = {
    value: '',
    errorMessage: '',
    loading: false,
    campaignCompleted: false,
    campaign: null
  }

  async componentDidMount() {
    let campaign = Campaign(this.props.address);
    this.setState({campaign});
    const summary = await campaign.methods.getSummary().call();
    this.setState({campaignCompleted: summary[5]});
  }

  onSubmit = async (event) => {
    event.preventDefault();
    this.setState({loading: true,errorMessage: ""});
    try {
      const accounts = await web3.eth.getAccounts();
      await this.state.campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.value, 'ether')
      });
      Router.replaceRoute(`/campaigns/${this.props.address}`);
    }catch (err) {
      console.log('in the error message');
      this.setState({errorMessage: err.message});
    }
    this.setState({loading: false, value: ''})
  }

  render() {
    return (
        this.state.campaignCompleted ? <h3>This campaign is over. You can contribute to some other awesome campaign!</h3> :
          <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
          <label>Amount to Contribute</label>
          <Input label="ether" value={this.state.value} onChange={event => {this.setState({value: event.target.value})}} labelPosition="right" />
          </Form.Field>
          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button primary loading={this.state.loading}>
          Contribute
          </Button>
          </Form>
    );
  }
}

export default ContributeForm;
