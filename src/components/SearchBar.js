filterList = e => {
  let updatedList = this.state.leagues;
  updatedList = updatedList
    .filter(item => {
      return (
        item.key === 'soccer_epl' ||
        item.key === 'soccer_france_ligue_one' ||
        item.key === 'soccer_germany_bundesliga' ||
        item.key === 'soccer_italy_serie_a' ||
        item.key === 'soccer_spain_la_liga'
      );
    })
    .filter(item => {
      return item.key.toLowerCase().search(e.target.value.toLowerCase()) !== -1;
    });

  this.setState({ filtered: updatedList });
};
