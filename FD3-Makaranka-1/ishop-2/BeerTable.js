let BeerTable = React.createClass({

    displayName: 'BeerTableComponent',

    propTypes: {
        tableClassName: React.PropTypes.string,
        name: React.PropTypes.string,
        items: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                name: React.PropTypes.string.isRequired,
                price: React.PropTypes.number.isRequired,
                url: React.PropTypes.string.isRequired,
                quantity: React.PropTypes.number.isRequired,
            })
        ),
    },

    getInitialState: function () {
        return {
            selectedItemCode: null,
            stuff: this.props.items,
        }
    },

    clicked: function (code) {
        this.setState({ selectedItemCode: code });
    },

    delete: function (code) {
        let newTableStuff = this.state.stuff.filter((el, i) => {
            if (i === code) return false;
            else return true;
        });
        this.setState({ stuff: newTableStuff, selectedItemCode: null });
    },

    deselect: function(EO) {
        this.setState({ selectedItemCode: null });
    },

    render: function () {
        let selectedClassName = 'highlight';
        let alignedClassName = 'tal';
        let tableCaption = this.props.name
            ? 'Список товаров магазина ' + this.props.name
            : 'Список товаров магазина ' + 'iShop';

        let keyCode = -1; // keyCode первого товара будет равен 0 И своему индексу в массиве stuff
        let tableHead = React.DOM.tr({ key: keyCode, onClick:this.deselect },
            // шапка таблицы
            React.DOM.th({ 'data-type': 'name' }, "Название Beer"),
            React.DOM.th({ 'data-type': 'cost' }, "Цена, USD"),
            React.DOM.th({ 'data-type': 'url' }, "Ссылка"),
            React.DOM.th({ 'data-type': 'count' }, "Кег в наличии"),
            React.DOM.th({ 'data-type': 'control' }, "Управление"),
        );
        let tableRows = this.state.stuff.map(v =>
            React.createElement(BeerRecord, {
                key: ++keyCode,
                code: keyCode,
                name: v.name,
                price: v.price,
                url: v.url,
                quantity: v.quantity,
                selectedClassName: selectedClassName,
                alignedClassName: alignedClassName,
                selectedItemCode: this.state.selectedItemCode,
                cbClicked: this.clicked,
                cbDelete: this.delete,
            },
            )
        );

        return React.DOM.table({ className: (this.props.tableClassName || null) },
            React.DOM.caption(null, tableCaption),
            React.DOM.tbody(null, tableHead, tableRows),
        );
    } // end of render

}); // end of BeerTable