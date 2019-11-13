import React, { Component } from 'react';
import { Card, Grid, Button, GridColumn } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';
import { Link } from '../../routes';
import { Router } from '../../routes';

class CampaignShow extends Component {
  state = {
    campaignCompleted: false,
    loading: false
  }

  static async getInitialProps(props){
    const campaign = Campaign(props.query.address);
    const summary = await campaign.methods.getSummary().call();
    const accounts = await web3.eth.getAccounts();
    return {
      address: props.query.address,
      minimumContribution: summary[0],
      balance: summary[1],
      requestsCount: summary[2],
      approversCount: summary[3],
      manager: summary[4],
      user: accounts[0],
      campaignCompleted: summary[5],
      campaign
    };
  }

  componentDidMount() {
    this.setState({campaignCompleted: this.props.campaignCompleted})
  }

  renderCards() {
    const {
      minimumContribution,
      balance,
      requestsCount,
      approversCount,
      manager
    } = this.props;

    const items = [
      {
        header: manager,
        meta: 'Address of Manager',
        description: 'The manager created this campaign and can withdraw money.',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: minimumContribution,
        meta: 'Minimum Contribution',
        description: 'You must contribute at least this much wei to become an approver.'
      },
      {
        header: requestsCount,
        meta: 'Number of Requests',
        description: 'A request tries to withdraw money form the contract. Request must be approved by approvers.'
      },
      {
        header: approversCount,
        meta: 'Number of Approvers',
        description: 'Number of people who approved the request.'
      },
      {
        header: web3.utils.fromWei(balance, 'ether'),
        meta: 'Campaign Balance (ether)',
        description: 'The balance is how much money this campaign has left to spend.'
      }
    ];
    return <Card.Group items={items} />
  }

  completeCampaign = async () => {
    this.setState({loading: true});
    await this.props.campaign.methods.setCampaignCompleted().send({
      from: this.props.user
    });
    this.setState({campaignCompleted: true, loading: false});
  }

  render() {
    return (
      <Layout>
      <Grid>
      <Grid.Row>
      <Grid.Column width={10}>
        {this.renderCards()}
      </Grid.Column>
      <Grid.Column width={6}>
        <ContributeForm address={this.props.address} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
      <Grid.Column width={3}>
      <Link route={`/campaigns/${this.props.address}/requests`}>
        <Button primary>
          View Requests
        </Button>
      </Link>
      </Grid.Column>
      {
        this.props.user === this.props.manager && !this.state.campaignCompleted ? <Button loading={this.state.loading} onClick={this.completeCampaign} primary>Campaign Over</Button> : ""
      }
      </Grid.Row>
      </Grid>
      </Layout>
    );
  }
}

export default CampaignShow;
