var Filter = React.createClass({

    displayName: 'filter',
  
    getDefaultProps: function() {
      return { color: [] }
    },
  
    getInitialState: function() {
      return { colorToShow:this.props.color.map(function (val) { return val; }),
               isSorting:false,
               textFilter:'',
               }
    },
  
    filterColor: function(EO) {
      var textFilter;
      var isSorting;
      switch (EO.target.type) {
        case 'text':
          textFilter = EO.target.value;
          isSorting = this.state.isSorting;
          this.setState( {textFilter:textFilter} );
          break;
        case 'checkbox':
          isSorting = EO.target.checked;
          textFilter = this.state.textFilter;
          this.setState( {isSorting:isSorting} );
          break;
        default:
      }
  
      var filteredArr = isSorting ? this.props.color.map(function (val) { return val; }).sort(function(a,b) { return a.text.toLowerCase()>b.text.toLowerCase()? 1:a.text.toLowerCase()<b.text.toLowerCase()?-1:0; }) : this.props.color.map(function (val) { return val; });
      filteredArr = filteredArr.filter(function(val) { return val.text.toLowerCase().indexOf(textFilter.toLowerCase()) > -1; });
      this.setState( {colorToShow:filteredArr} );
    },
  
    resetColor: function(EO) {
      this.setState( {textFilter:''} );
      this.setState( {isSorting:false} );
      var filteredArr = this.props.color.map(function (val) { return val; });
      this.setState( {colorToShow:filteredArr} );
    },
  
    render: function() {
  
      var filterPanel=   
        React.DOM.div({className:'Filter__panel'},
          React.DOM.input({className:'Filter__sort',type:'checkbox',checked:this.state.isSorting,onClick:this.filterColor}),  
          React.DOM.input({className:'Filter__search',type:'text',value:this.state.textFilter,onChange:this.filterColor}),
          React.DOM.button({className:'Filter__button',onClick:this.resetColor},'сброс'),
        );
  
        var colorCode=[];
  
        this.state.colorToShow.forEach(element => {
          var optionCode=        
            React.DOM.option({key:element.code,className:'Filter__color'},element.text);
          colorCode.push(optionCode);
        });
    
      var filterResult=
        React.DOM.select({className:'Filter__select',size:'10'},colorCode);
  
      return React.DOM.div( {className:'Filter'},filterPanel,filterResult);
    },
  });