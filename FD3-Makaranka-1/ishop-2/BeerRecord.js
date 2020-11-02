let BeerRecord = React.createClass({

    displayName: 'BeerRecordComponent',

    propTypes: {
        code: React.PropTypes.number.isRequired,
        name: React.PropTypes.string.isRequired,
        price: React.PropTypes.number.isRequired,
        url: React.PropTypes.string.isRequired,
        quantity: React.PropTypes.number.isRequired,
        selectedClassName: React.PropTypes.string,
        alignedClassName: React.PropTypes.string,
        selectedItemCode: React.PropTypes.number,
        cbClicked: React.PropTypes.func.isRequired,
        cbDelete: React.PropTypes.func.isRequired,
    },

    recordClicked: function (EO) {
        this.props.cbClicked(this.props.code);
    },

    recordDelete: function (EO) {
        EO.stopPropagation();
        if (confirm(`Удалить запись о товаре ${EO.target.parentNode.parentNode.firstChild.textContent || ''}?`))
            this.props.cbDelete(this.props.code);
        else
            return;
    },

    render: function () {
        let alignedClassName = (this.props.alignedClassName || 'tal');
        let selectedClassName = this.props.selectedItemCode === this.props.code
            ? (this.props.selectedClassName || "highlight") // highlight - умолчательный класс, выставляемый выделенному товару
            : null;
        return React.DOM.tr({
            className: selectedClassName,
            onClick: this.recordClicked,
        },
            React.DOM.td({ className: alignedClassName }, this.props.name),
            React.DOM.td(null, this.props.price),
            React.DOM.td({ className: alignedClassName }, this.props.url),
            React.DOM.td(null, this.props.quantity),
            React.DOM.td(null,
                React.DOM.input({ type: 'button', onClick: this.recordDelete, value: "Delete" })
            ),
        );
    },


});