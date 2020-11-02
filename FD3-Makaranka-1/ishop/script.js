"use strict";
var CatalogBlock = React.createClass({
  displayName: "CatalogBlock",

  render: function () {
    var tableCode = [];
    for (var a = 0; a < this.props.catalog.length; a++) {
      var product = this.props.catalog[a];
      var productCode = React.DOM.tr(
        { key: product.code, className: "product" },
        React.DOM.td({ className: "productName" }, product.name),
        React.DOM.td({ className: "productPrice" }, product.price),
        React.DOM.td(
          { className: "productImg" },
          React.DOM.img({ src: product.imgUrl, width: 100 })
        ),
        React.DOM.td({ className: "productAmount" }, product.amount)
      );
      tableCode.push(productCode);
    }
    return React.DOM.div(
      { className: "CatalogBlock" },
      React.DOM.h1({ className: "text" }, this.props.text),
      React.DOM.table(
        { className: "catalogTable" },
        React.DOM.tbody({}, tableCode)
      )
    );
  },
});