'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = require('semantic-ui-react');

var _routes = require('../../../routes');

var _Layout = require('../../../components/Layout');

var _Layout2 = _interopRequireDefault(_Layout);

var _campaign = require('../../../ethereum/campaign');

var _campaign2 = _interopRequireDefault(_campaign);

var _RequestRow = require('../../../components/RequestRow');

var _RequestRow2 = _interopRequireDefault(_RequestRow);

var _web = require('../../../ethereum/web3');

var _web2 = _interopRequireDefault(_web);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = 'D:\\kickstarter\\kickstarter-blockchain-solidity\\pages\\campaigns\\requests\\index.js?entry';


var RequestIndex = function (_Component) {
  (0, _inherits3.default)(RequestIndex, _Component);

  function RequestIndex() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, RequestIndex);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = RequestIndex.__proto__ || (0, _getPrototypeOf2.default)(RequestIndex)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      loading: false,
      error: "",
      user: "",
      manager: "",
      success: "",
      value: 0
    }, _this.onSubmit = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var campaign, contributers, accounts, i;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              campaign = (0, _campaign2.default)(_this.props.address);

              _this.setState({ loading: true });
              _context.next = 4;
              return campaign.methods.getApproversAddressArray().call();

            case 4:
              contributers = _context.sent;
              _context.next = 7;
              return _web2.default.eth.getAccounts();

            case 7:
              accounts = _context.sent;
              i = 0;

            case 9:
              if (!(i < contributers.length)) {
                _context.next = 15;
                break;
              }

              _context.next = 12;
              return campaign.methods.payToContributers(_web2.default.utils.toWei(_this.state.value, 'ether'), contributers[i]).send({
                from: accounts[0]
              });

            case 12:
              i++;
              _context.next = 9;
              break;

            case 15:
              console.log("incentives sent!!");
              _this.setState({ loading: false, success: "Incentives have been successfully sent to the contributers." });

            case 17:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this2);
    })), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(RequestIndex, [{
    key: 'componentDidMount',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        var accounts, campaign, summary;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _web2.default.eth.getAccounts();

              case 2:
                accounts = _context2.sent;
                campaign = (0, _campaign2.default)(this.props.address);
                _context2.next = 6;
                return campaign.methods.getSummary().call();

              case 6:
                summary = _context2.sent;

                this.setState({ user: accounts[0], manager: summary[4] });

              case 8:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function componentDidMount() {
        return _ref3.apply(this, arguments);
      }

      return componentDidMount;
    }()
  }, {
    key: 'renderRows',
    value: function renderRows() {
      var _this3 = this;

      return this.props.requests.map(function (request, index) {
        return _react2.default.createElement(_RequestRow2.default, {
          key: index,
          request: request,
          address: _this3.props.address,
          id: index,
          approversCount: _this3.props.approversCount,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 62
          }
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var Header = _semanticUiReact.Table.Header,
          Row = _semanticUiReact.Table.Row,
          HeaderCell = _semanticUiReact.Table.HeaderCell,
          Body = _semanticUiReact.Table.Body;

      return _react2.default.createElement(_Layout2.default, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 76
        }
      }, _react2.default.createElement('h3', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 77
        }
      }, 'Requests'), this.props.campaignCompleted && this.state.manager === this.state.user ? _react2.default.createElement(_semanticUiReact.Form, { onSubmit: this.onSubmit, error: !!this.state.errorMessage, __source: {
          fileName: _jsxFileName,
          lineNumber: 80
        }
      }, _react2.default.createElement(_semanticUiReact.Form.Field, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 81
        }
      }, _react2.default.createElement('label', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 82
        }
      }, 'Send Incentives (No. of Ethers Per Contributer)'), _react2.default.createElement(_semanticUiReact.Input, { label: 'ether', value: this.state.value, onChange: function onChange(event) {
          _this4.setState({ value: event.target.value });
        }, labelPosition: 'right', __source: {
          fileName: _jsxFileName,
          lineNumber: 83
        }
      })), _react2.default.createElement(_semanticUiReact.Message, { error: true, header: 'Oops!', content: this.state.error, __source: {
          fileName: _jsxFileName,
          lineNumber: 85
        }
      }), _react2.default.createElement(_semanticUiReact.Message, { success: true, header: 'Success!', content: this.state.success, __source: {
          fileName: _jsxFileName,
          lineNumber: 86
        }
      }), _react2.default.createElement(_semanticUiReact.Button, { style: { marginBottom: 10 }, primary: true, floated: 'right', loading: this.state.loading, __source: {
          fileName: _jsxFileName,
          lineNumber: 87
        }
      }, 'Send Incentives')) : _react2.default.createElement(_routes.Link, { route: '/campaigns/' + this.props.address + '/requests/new', __source: {
          fileName: _jsxFileName,
          lineNumber: 91
        }
      }, _react2.default.createElement('a', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 92
        }
      }, _react2.default.createElement(_semanticUiReact.Button, { primary: true, floated: 'right', style: { marginBottom: 10 }, __source: {
          fileName: _jsxFileName,
          lineNumber: 93
        }
      }, 'Add Request'))), _react2.default.createElement(_semanticUiReact.Table, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 99
        }
      }, _react2.default.createElement(Header, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 100
        }
      }, _react2.default.createElement(Row, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 101
        }
      }, _react2.default.createElement(HeaderCell, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 102
        }
      }, 'ID'), _react2.default.createElement(HeaderCell, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 103
        }
      }, 'Description'), _react2.default.createElement(HeaderCell, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 104
        }
      }, 'Amount'), _react2.default.createElement(HeaderCell, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 105
        }
      }, 'Recipient'), _react2.default.createElement(HeaderCell, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 106
        }
      }, 'Approval Count'), _react2.default.createElement(HeaderCell, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 107
        }
      }, 'Approve'), _react2.default.createElement(HeaderCell, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 108
        }
      }, 'Finalize'))), _react2.default.createElement(Body, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 111
        }
      }, this.renderRows())), _react2.default.createElement('div', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 115
        }
      }, 'Found ', this.props.requestCount, ' requests.'));
    }
  }], [{
    key: 'getInitialProps',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(props) {
        var campaign, campaignCompleted, requestCount, approversCount, requests, i, temp;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                campaign = (0, _campaign2.default)(props.query.address);
                _context3.next = 3;
                return campaign.methods.campaignCompleted().call();

              case 3:
                campaignCompleted = _context3.sent;
                _context3.next = 6;
                return campaign.methods.getRequestsCount().call();

              case 6:
                requestCount = _context3.sent;
                _context3.next = 9;
                return campaign.methods.approversCount().call();

              case 9:
                approversCount = _context3.sent;
                requests = [];
                i = 0;

              case 12:
                if (!(i < requestCount)) {
                  _context3.next = 20;
                  break;
                }

                _context3.next = 15;
                return campaign.methods.requests(i).call();

              case 15:
                temp = _context3.sent;

                requests.push(temp);

              case 17:
                i++;
                _context3.next = 12;
                break;

              case 20:
                return _context3.abrupt('return', {
                  address: props.query.address,
                  requests: requests,
                  requestCount: requestCount,
                  approversCount: approversCount,
                  campaignCompleted: campaignCompleted
                });

              case 21:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getInitialProps(_x) {
        return _ref4.apply(this, arguments);
      }

      return getInitialProps;
    }()
  }]);

  return RequestIndex;
}(_react.Component);

exports.default = RequestIndex;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzXFxjYW1wYWlnbnNcXHJlcXVlc3RzXFxpbmRleC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIkNvbXBvbmVudCIsIkJ1dHRvbiIsIlRhYmxlIiwiRm9ybSIsIklucHV0IiwiTWVzc2FnZSIsIkxpbmsiLCJMYXlvdXQiLCJDYW1wYWlnbiIsIlJlcXVlc3RSb3ciLCJ3ZWIzIiwiUmVxdWVzdEluZGV4Iiwic3RhdGUiLCJsb2FkaW5nIiwiZXJyb3IiLCJ1c2VyIiwibWFuYWdlciIsInN1Y2Nlc3MiLCJ2YWx1ZSIsIm9uU3VibWl0IiwiY2FtcGFpZ24iLCJwcm9wcyIsImFkZHJlc3MiLCJzZXRTdGF0ZSIsIm1ldGhvZHMiLCJnZXRBcHByb3ZlcnNBZGRyZXNzQXJyYXkiLCJjYWxsIiwiY29udHJpYnV0ZXJzIiwiZXRoIiwiZ2V0QWNjb3VudHMiLCJhY2NvdW50cyIsImkiLCJsZW5ndGgiLCJwYXlUb0NvbnRyaWJ1dGVycyIsInV0aWxzIiwidG9XZWkiLCJzZW5kIiwiZnJvbSIsImNvbnNvbGUiLCJsb2ciLCJnZXRTdW1tYXJ5Iiwic3VtbWFyeSIsInJlcXVlc3RzIiwibWFwIiwicmVxdWVzdCIsImluZGV4IiwiYXBwcm92ZXJzQ291bnQiLCJIZWFkZXIiLCJSb3ciLCJIZWFkZXJDZWxsIiwiQm9keSIsImNhbXBhaWduQ29tcGxldGVkIiwiZXJyb3JNZXNzYWdlIiwiZXZlbnQiLCJ0YXJnZXQiLCJtYXJnaW5Cb3R0b20iLCJyZW5kZXJSb3dzIiwicmVxdWVzdENvdW50IiwicXVlcnkiLCJnZXRSZXF1ZXN0c0NvdW50IiwidGVtcCIsInB1c2giXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxBQUFPLEFBQVM7Ozs7QUFDaEIsQUFBUyxBQUFRLEFBQU8sQUFBTSxBQUFPOztBQUNyQyxBQUFTLEFBQVk7O0FBQ3JCLEFBQU8sQUFBWTs7OztBQUNuQixBQUFPLEFBQWM7Ozs7QUFDckIsQUFBTyxBQUFnQjs7OztBQUN2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QyxjQUFEOztvQkFBQTtzQkFBQSxBQUNBO0FBREE7QUFBQSx5QkFDQyxjQUFEOztvQkFBQTtzQkFBQTtBQUFBO0FBQUEsU0FEQSxBQUNBLEFBQ0EsdUJBQUMsY0FBRDs7b0JBQUE7c0JBQUE7QUFBQTtBQUFBLFNBRkEsQUFFQSxBQUNBLGdDQUFDLGNBQUQ7O29CQUFBO3NCQUFBO0FBQUE7QUFBQSxTQUhBLEFBR0EsQUFDQSwyQkFBQyxjQUFEOztvQkFBQTtzQkFBQTtBQUFBO0FBQUEsU0FKQSxBQUlBLEFBQ0EsOEJBQUMsY0FBRDs7b0JBQUE7c0JBQUE7QUFBQTtBQUFBLFNBTEEsQUFLQSxBQUNBLG1DQUFDLGNBQUQ7O29CQUFBO3NCQUFBO0FBQUE7QUFBQSxTQU5BLEFBTUEsQUFDQSw0QkFBQyxjQUFEOztvQkFBQTtzQkFBQTtBQUFBO0FBQUEsU0FUQSxBQUNBLEFBQ0EsQUFPQSxBQUdBLCtCQUFDLGNBQUQ7O29CQUFBO3NCQUFBLEFBQ0M7QUFERDtBQUFBLGNBbkNBLEFBdUJBLEFBWUEsQUFDQyxBQUFLLEFBR04sZ0NBQUEsY0FBQTs7b0JBQUE7c0JBQUE7QUFBQTtBQUFBLFNBQVksZUFBQSxBQUFLLE1BQWpCLEFBQXVCLGNBeEN6QixBQUNFLEFBdUNBLEFBR0g7Ozs7OzZHLEFBNUY0Qjs7Ozs7bUJBQ3ZCO0EsMkJBQVcsd0JBQVMsTUFBQSxBQUFNLE1BQWYsQUFBcUIsQTs7dUJBQ04sU0FBQSxBQUFTLFFBQVQsQUFBaUIsb0JBQWpCLEFBQXFDLEE7O21CQUEvRDtBOzt1QkFDcUIsU0FBQSxBQUFTLFFBQVQsQUFBaUIsbUJBQWpCLEEsQUFBb0M7O21CQUF6RDtBOzt1QkFDeUIsU0FBQSxBQUFTLFFBQVQsQUFBaUIsaUJBQWpCLEEsQUFBa0M7O21CQUF6RDtBLDJDQUNGO0EsMkJBQVcsQSxBQUNQO0Esb0IsQUFBRzs7O3NCQUFHLElBQUcsQTs7Ozs7O3VCQUNNLFNBQUEsQUFBUyxRQUFULEFBQWlCLFNBQWpCLEFBQTBCLEdBQTFCLEEsQUFBNkI7O21CQUExQztBLGlDQUNOOzt5QkFBQSxBQUFTLEtBQVQsQUFBYzs7bUJBRmE7QTs7Ozs7OzJCQUtwQixNQUFBLEFBQU0sTUFEVixBQUNnQixBQUNyQjs0QkFGSyxBQUdMO2dDQUhLLEFBSUw7a0NBSkssQUFLTDtxQyxBQUxLO0FBQUEsQUFDTDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTVCcUIsQSxBQWdIM0I7O2tCQUFBLEFBQWUiLCJmaWxlIjoiaW5kZXguanM/ZW50cnkiLCJzb3VyY2VSb290IjoiRDova2lja3N0YXJ0ZXIva2lja3N0YXJ0ZXItYmxvY2tjaGFpbi1zb2xpZGl0eSJ9