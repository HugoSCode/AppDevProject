//Handles pagination and sorting for the getAll operations
function queryOptions(query) {
  const paginationDefault = { amount: 25, page: 1 };

  const sortBy = query.sortBy || "id";
  const sortOrder = query.sortOrder === "desc" ? "desc" : "asc";

  const amount = Number(query.amount) || paginationDefault.amount;
  const page = Number(query.page) || paginationDefault.page;

  return {
    take: amount,
    skip: (page - 1) * amount,
    orderBy: {
      [sortBy]: sortOrder,
    },
  };
}

export { queryOptions };

