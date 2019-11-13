import React, { Component } from 'react';
import { Button, Table, Form, Input, Message } from 'semantic-ui-react';
import { Link } from '../../../routes';
import Layout from '../../../components/Layout';
import Campaign from '../../../ethereum/campaign';
import RequestRow from '../../../components/RequestRow';
import web3 from '../../../ethereum/web3';

class RequestIndex extends Component {
  state = {
    loading: false,
    error: "",
    user: "",
    manager: "",
    success: "",
    value: 0
  }

  async componentDidMount() {
    const accounts = await web3.eth.getAccounts();
    let campaign = Campaign(this.props.address);
    const summary = await campaign.methods.getSummary().call();
    this.setState({user: accounts[0], manager: summary[4]});
  }

  static async getInitialProps(props) {
    let campaign = Campaign(props.query.address);
    let campaignCompleted = await campaign.methods.campaignCompleted().call();
    let requestCount = await campaign.methods.getRequestsCount().call();
    const approversCount = await campaign.methods.approversCount().call();
    let requests = [];
    for(let i =0; i< requestCount; i++) {
        const temp = await campaign.methods.requests(i).call();
        requests.push(temp);
    }
    return {
      address: props.query.address,
      requests,
      requestCount,
      approversCount,
      campaignCompleted
    };
  }

  onSubmit = async () => {
    let campaign = Campaign(this.props.address);
    this.setState({loading: true});
    const contributers = await campaign.methods.getApproversAddressArray().call();
    const accounts = await web3.eth.getAccounts();
    for(let i =0; i< contributers.length;i++){
      await campaign.methods.payToContributers(web3.utils.toWei(this.state.value, 'ether'), contributers[i]).send({
        from: accounts[0]
      });
    }
    console.log("incentives sent!!");
    this.setState({loading: false, success: "Incentives have been successfully sent to the contributers."});
  }

  renderRows() {
    return this.props.requests.map((request, index) => {
      return (
        <RequestRow
        key={index}
        request={request}
        address={this.props.address}
        id={index}
        approversCount={this.props.approversCount}
        />
      )
    })
  }

  render() {
    const { Header, Row, HeaderCell, Body } = Table;
    return (
      <Layout>
      <h3>Requests</h3>
      {
        this.props.campaignCompleted &&  this.state.manager === this.state.user ?
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
        <Form.Field>
        <label>Send Incentives (No. of Ethers Per Contributer)</label>
        <Input label="ether" value={this.state.value} onChange={event => {this.setState({value: event.target.value})}} labelPosition="right" />
        </Form.Field>
        <Message error header="Oops!" content={this.state.error} />
        <Message success header="Success!" content={this.state.success} />
        <Button style={{marginBottom: 10}} primary floated="right" loading={this.state.loading}>
        Send Incentives
        </Button>
        </Form> :
        <Link route={`/campaigns/${this.props.address}/requests/new`}>
        <a>
        <Button primary floated="right" style={{marginBottom: 10}}>
        Add Request
        </Button>
        </a>
      </Link>
      }
      <Table>
      <Header>
      <Row>
      <HeaderCell>ID</HeaderCell>
      <HeaderCell>Description</HeaderCell>
      <HeaderCell>Amount</HeaderCell>
      <HeaderCell>Recipient</HeaderCell>
      <HeaderCell>Approval Count</HeaderCell>
      <HeaderCell>Approve</HeaderCell>
      <HeaderCell>Finalize</HeaderCell>
      </Row>
      </Header>
      <Body>
      {this.renderRows()}
      </Body>
      </Table>
      <div>Found {this.props.requestCount} requests.</div>
      </Layout>
    );
  }
}

export default RequestIndex;
