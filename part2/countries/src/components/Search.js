import React from 'react';

const Search = ({query, handleQueryInput}) => {

    return (
        <form>
            find countries <input value={query} onChange={handleQueryInput} />
        </form>
    );
};

export default Search;