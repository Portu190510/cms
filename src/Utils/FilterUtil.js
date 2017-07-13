var filterUtil = {
    setupSortParams: (target, filter, orderBy) => {
        filter.orderBy = orderBy;
        if (filter.sortOrder === 'asc') {
            filter.sortOrder = 'desc';
            target.innerHTML = target.innerHTML.slice(0, -1) + '  &uarr;';
        } else {
            filter.sortOrder = 'asc';
            target.innerHTML = target.innerHTML.slice(0, -1) + '  &darr;';
        }

        return filter;
    }
}

export default filterUtil;