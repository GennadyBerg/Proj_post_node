const getQueryParam = (name, value, query = null) => {
      query = query ?? {};
      if (value)
            query[name] = value
      return query;
}
module.exports = { getQueryParam };
