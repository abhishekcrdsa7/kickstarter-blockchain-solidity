pragma solidity ^0.4.17;

contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(uint minimum) public {
        address newCampaign = new Campaign(minimum, msg.sender);
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (address[]){
        return deployedCampaigns;
    }
}

contract Campaign {
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    function Campaign(uint minimum, address creator) public {
        manager = creator;
        minimumContribution = minimum;
    }
    

    Request[] public requests;
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    address[] public apAddresses;
    uint public approversCount;
    bool public campaignCompleted;

    function contribute() public payable {
        require(msg.value > minimumContribution);
        approvers[msg.sender] = true;
        apAddresses.push(msg.sender);
        approversCount++;
    }


    function approveRequest(uint index) public {
        Request storage request = requests[index];
        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);
        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function createRequest(string description, uint  value, address recipient)
        public restricted {
        Request memory newRequest = Request({
            description: description,
            value: value,
            recipient: recipient,
            complete: false,
            approvalCount: 0
        });

        requests.push(newRequest);
    }

    function finalizeRequest(uint index) public restricted{
        Request storage request = requests[index];
        require(request.approvalCount > (approversCount/2));
        require(!request.complete);
        request.recipient.transfer(request.value);
        request.complete = true;
    }

    function getRequestsCount() public view returns(uint){
        return requests.length;
    }

    function setCampaignCompleted() public restricted returns(bool){
        campaignCompleted = true;
        return campaignCompleted;
    }

    function getApproversAddressArray() public view returns (address[]) {
        return apAddresses;
    }

    function payToContributers (uint amount, address rec) public restricted {
      rec.transfer(amount);
    }

    function getSummary() public view returns(uint, uint, uint, uint, address, bool){
        return (minimumContribution, this.balance, requests.length, approversCount, manager, campaignCompleted);
    }
}
