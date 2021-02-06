import React from 'react';
import classes from '@components/search/search.module.scss';
import Grid from '@ui/grid/grid';

export const Search: React.FC = () => {
  return (
    <Grid alignItems="center" className={classes['search']}>
      <input type="text" placeholder="Search..." />
    </Grid>
  );
};

export default Search;
