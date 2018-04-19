import moment from 'moment';

export const dateFilters = {
    formatDate: (value: any, format: string = 'YYYY-MM-DD hh:ss') => moment(value, 'x').format(format)
};